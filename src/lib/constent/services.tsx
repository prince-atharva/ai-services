import React from 'react';

export const SERVICE_COLORS = [
  'from-blue-600 to-indigo-600',
  'from-green-500 to-teal-500',
  'from-purple-600 to-pink-500',
  'from-yellow-500 to-orange-500',
  'from-cyan-500 to-blue-500',
  'from-pink-500 to-red-500',
  'from-indigo-500 to-purple-500',
  'from-emerald-500 to-lime-500',
  'from-fuchsia-500 to-rose-500',
]

export type Service = {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  path: string;
};

export const services: Service[] = [
  {
    id: 'translation',
    title: 'AI Translation',
    description: 'Break language barriers with our advanced translation service. Support for multiple languages and contexts.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
      </svg>
    ),
    features: [
      'Multiple language support',
      'Context-aware translation',
      'Document translation',
      'Real-time translation'
    ],
    path: '/services/translate'
  },
  {
    id: 'resume-parser',
    title: 'Resume Parser',
    description: 'Extract and analyze information from resumes automatically. Get structured data for better candidate screening.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    features: [
      'Extract contact information',
      'Identify skills and experience',
      'Parse education history',
      'Generate structured data'
    ],
    path: '/services/resume-parser'
  },
  {
    id: 'ai-assistant',
    title: 'AI Assistant',
    description: "Get intelligent assistance for your tasks. From content generation to data analysis, we've got you covered.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    features: [
      'Content generation',
      'Data analysis',
      'Task automation',
      'Smart recommendations'
    ],
    path: '/services/assistant'
  },
  {
    id: 'text-analysis',
    title: 'Text Analysis',
    description: 'Analyze text for sentiment, key phrases, and entities. Get insights from your content automatically.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    features: [
      'Sentiment analysis',
      'Entity recognition',
      'Key phrase extraction',
      'Topic modeling'
    ],
    path: '/services/text-analysis'
  },
  {
    id: 'image-generation',
    title: 'Image Generation',
    description: 'Create stunning images from text descriptions using advanced AI image generation technology.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    features: [
      'Text-to-image generation',
      'Style transfer',
      'Image editing',
      'Custom art creation'
    ],
    path: '/services/image-generation'
  },
  {
    id: 'code-assistant',
    title: 'Code Assistant',
    description: 'Get AI-powered help with coding tasks, from code generation to debugging and optimization.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    features: [
      'Code generation',
      'Bug detection',
      'Code optimization',
      'Documentation generation'
    ],
    path: '/services/code-assistant'
  }
];