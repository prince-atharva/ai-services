import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";
import { env } from "@/lib/env";
import { prisma } from "@/lib/prisma";
import { authMiddleware, AuthenticatedRequest } from "@/lib/middleware/auth";

const ai = new GoogleGenAI({ apiKey: env.GOOGLE_AI_API_KEY });
const GEMINI_MODEL = "gemini-2.0-flash";

const ERROR_MESSAGES = {
  TEXT_REQUIRED: "Text is required",
  TARGET_LANG_REQUIRED: "Target language is required for translation",
  TRANSLATION_FAILED: "Translation failed",
  PROCESS_FAILED: "Failed to process text",
  FETCH_FAILED: "Failed to fetch translations",
};

async function handleAuth(request: AuthenticatedRequest) {
  const authError = await authMiddleware(request);
  if (authError) return authError;
  return null;
}

async function generateAIContent(prompt: string): Promise<string> {
  const result = await ai.models.generateContent({
    model: GEMINI_MODEL,
    contents: prompt,
  });
  if (!result?.text || typeof result.text !== "string") {
    throw new Error(ERROR_MESSAGES.TRANSLATION_FAILED);
  }
  return result.text.trim();
}

export async function POST(request: AuthenticatedRequest) {
  try {
    const authError = await handleAuth(request);
    if (authError) return authError;

    const body = await request.json();
    const { text, targetLanguage } = body || {};

    if (
      !text ||
      typeof text !== "string" ||
      !text.trim() ||
      text.length > 500
    ) {
      return NextResponse.json(
        { error: text && text.length > 500 ? "Text must be 500 characters or less" : ERROR_MESSAGES.TEXT_REQUIRED },
        { status: 400 }
      );
    }

    let prompt: string;
    let translatedText: string;
    let finalTargetLanguage: string;

    if (targetLanguage === "correct-english") {
      prompt = `Correct any spelling and grammar mistakes in the following English text. Only provide the corrected text without any additional text or explanation: ${text}`;
      finalTargetLanguage = "en";
    } else {
      if (!targetLanguage || typeof targetLanguage !== "string" || !targetLanguage.trim()) {
        return NextResponse.json({ error: ERROR_MESSAGES.TARGET_LANG_REQUIRED }, { status: 400 });
      }
      prompt = `Translate the following text to ${targetLanguage}. Only provide the translation without any additional text or explanation: ${text}`;
      finalTargetLanguage = targetLanguage;
    }

    try {
      translatedText = await generateAIContent(prompt);
    } catch (err) {
      return NextResponse.json({ error: ERROR_MESSAGES.TRANSLATION_FAILED }, { status: 500 });
    }

    const translation = await prisma.translation.create({
      data: {
        originalText: text,
        translatedText,
        targetLanguage: finalTargetLanguage,
        userId: request.user!.userId,
      },
    });

    return NextResponse.json({ translation });
  } catch (error) {
    console.error("Translation error:", error);
    return NextResponse.json({ error: ERROR_MESSAGES.PROCESS_FAILED }, { status: 500 });
  }
}

export async function GET(request: AuthenticatedRequest) {
  try {
    const authError = await handleAuth(request);
    if (authError) return authError;

    const userId = request.user?.userId;
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const translations = await prisma.translation.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ translations });
  } catch (error) {
    console.error("Error fetching translations:", error);
    return NextResponse.json({ error: ERROR_MESSAGES.FETCH_FAILED }, { status: 500 });
  }
}
