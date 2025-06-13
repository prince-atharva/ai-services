import { api } from '../axios'

interface TranslateResponse {
  translation: {
    id: string
    originalText: string
    translatedText: string
    targetLanguage: string
    createdAt: string
  }
}

interface GrammarCorrectionResponse {
  correctedText: string
}

interface GetTranslationsResponse {
  translations: {
    id: string
    originalText: string
    translatedText: string
    targetLanguage: string
    createdAt: string
  }[]
}

export const Translate = {
  translate: async (text: string, targetLanguage: string): Promise<TranslateResponse> => {
    return api.post<TranslateResponse>('/services/translate', { text, targetLanguage })
  },

  correctGrammar: async (text: string): Promise<GrammarCorrectionResponse> => {
    return api.post<GrammarCorrectionResponse>('/services/translate/correct-grammar', { text })
  },

  getTranslations: async (): Promise<GetTranslationsResponse> => {
    return api.get<GetTranslationsResponse>('/services/translate')
  },
}