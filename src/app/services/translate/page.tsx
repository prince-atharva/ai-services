'use client'

import { useState, useEffect, useRef } from 'react'
import { Translate } from '@/lib/api/translate'
import ServicesBackground from '@/app/components/ServicesBackground'
import UserHeader from '@/app/components/UserHeader'
import AIServicesHeader from '@/app/components/AIServicesHeader'
import { languages } from '@/lib/constent/languages'
import { FiCopy, FiTrash2, FiCheck, FiX, FiGlobe, FiClock, FiChevronRight } from 'react-icons/fi'
import { RiTranslate2 } from 'react-icons/ri'

type TranslationHistoryItem = {
  id: string;
  originalText: string;
  translatedText: string;
  targetLanguage: string;
  createdAt: string;
};

export default function TranslatePage() {
  const [inputText, setInputText] = useState('');
  const [targetLang, setTargetLang] = useState('hi');
  const [translatedText, setTranslatedText] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [error, setError] = useState('');
  const [history, setHistory] = useState<TranslationHistoryItem[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [historyError, setHistoryError] = useState('');
  const [copied, setCopied] = useState(false);
  const translatedRef = useRef<HTMLDivElement>(null);
  const [sidebarTab, setSidebarTab] = useState<'history' | 'tips'>('history');

  useEffect(() => {
    let isMounted = true;
    const fetchHistory = async () => {
      setIsLoadingHistory(true);
      setHistoryError('');
      try {
        const res = await Translate.getTranslations();
        if (isMounted) setHistory(res.translations);
      } catch (err) {
        console.error("Translation history error:", err);
        if (isMounted) setHistoryError('Failed to load translation history');
      } finally {
        if (isMounted) setIsLoadingHistory(false);
      }
    };
    fetchHistory();
    return () => { isMounted = false; };
  }, []);

  useEffect(() => {
    if (translatedText && translatedRef.current) {
      translatedRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [translatedText]);

  const handleTranslate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    setIsTranslating(true);
    setError('');
    setTranslatedText('');
    setCopied(false);
    try {
      const response = await Translate.translate(inputText, targetLang);
      setTranslatedText(response.translation.translatedText);
      setHistory((prev) => [
        response.translation,
        ...prev,
      ]);
    } catch (err) {
      console.error("Translation error:", err);
      setError('Failed to translate text');
    } finally {
      setIsTranslating(false);
    }
  };

  const getLanguageName = (code: string) => {
    return languages.find(lang => lang.code === code)?.name || code;
  };

  const handleCopy = () => {
    if (translatedText) {
      navigator.clipboard.writeText(translatedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <ServicesBackground>
      <UserHeader />

      <AIServicesHeader
        subtitle="🌍 AI Translation Service"
        title="Text Translator"
        tagline="Break language barriers with AI-powered translations"
        description="Instantly translate your text into 25+ languages with our powerful AI translator."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2 space-y-6">
            {error && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900 rounded-xl flex items-center gap-3">
                <div className="flex-shrink-0 text-red-500">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="text-sm text-red-700 dark:text-red-300">{error}</div>
              </div>
            )}

            <div className="bg-white dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-2xl">
              <form onSubmit={handleTranslate} className="space-y-4 p-6">
                <div className="space-y-3">
                  <label htmlFor="inputText" className="text-lg font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
                    <RiTranslate2 className="text-blue-500" />
                    Text to Translate
                  </label>
                  <div className="relative">
                    <textarea
                      id="inputText"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm resize-none"
                      placeholder="Type or paste your text here..."
                      rows={5}
                      spellCheck={true}
                      autoFocus
                      maxLength={500}
                    />
                    {inputText && (
                      <button
                        type="button"
                        onClick={() => setInputText('')}
                        className="absolute right-3 top-3 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-full bg-gray-100 dark:bg-gray-700"
                      >
                        <FiX className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                    <span>{inputText.length}/500 characters</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 items-end">
                  <div className="flex-1 w-full">
                    <label htmlFor="targetLang" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Target Language
                    </label>
                    <select
                      id="targetLang"
                      value={targetLang}
                      onChange={(e) => setTargetLang(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm"
                    >
                      {languages.map((lang) => (
                        <option key={lang.code} value={lang.code}>
                          {lang.icon} {lang.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    type="submit"
                    disabled={isTranslating || !inputText.trim()}
                    className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-lg shadow-md transition-all duration-300 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isTranslating ? (
                      <>
                        <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                        </svg>
                        Translating...
                      </>
                    ) : (
                      <>
                        <RiTranslate2 className="w-5 h-5" />
                        Translate
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {translatedText && (
              <div
                ref={translatedRef}
                className="bg-white dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-300 animate-fade-in"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                        <FiGlobe className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">Translation</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {getLanguageName(targetLang)}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={handleCopy}
                        className={`p-2 rounded-lg transition-colors duration-200 ${copied
                            ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                          }`}
                        title={copied ? "Copied!" : "Copy to clipboard"}
                      >
                        {copied ? <FiCheck className="w-5 h-5" /> : <FiCopy className="w-5 h-5" />}
                      </button>
                      <button
                        onClick={() => setTranslatedText('')}
                        className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
                        title="Clear translation"
                      >
                        <FiTrash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                    <p className="text-gray-800 dark:text-gray-200 whitespace-pre-line">
                      {translatedText}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="lg:sticky lg:top-8 h-fit">
            <div className="bg-white dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700 flex flex-col">
              <div className="flex border-b border-gray-200 dark:border-gray-700">
                <button
                  className={`flex-1 py-3 text-center font-medium transition-colors duration-200 ${sidebarTab === 'history' ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400 bg-gray-50 dark:bg-gray-700/30' : 'text-gray-500 dark:text-gray-300 hover:text-blue-600 hover:bg-gray-50 dark:hover:bg-gray-700/30'}`}
                  onClick={() => setSidebarTab('history')}
                >
                  History
                </button>
                <button
                  className={`flex-1 py-3 text-center font-medium transition-colors duration-200 ${sidebarTab === 'tips' ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400 bg-gray-50 dark:bg-gray-700/30' : 'text-gray-500 dark:text-gray-300 hover:text-blue-600 hover:bg-gray-50 dark:hover:bg-gray-700/30'}`}
                  onClick={() => setSidebarTab('tips')}
                >
                  Tips
                </button>
              </div>
              <div className="p-6 flex-1 flex flex-col min-h-[350px]" style={{ minHeight: '350px', maxHeight: '480px' }}>
                {sidebarTab === 'history' ? (
                  <>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                        <FiClock className="text-blue-500" />
                        Translation History
                      </h2>
                      {history.length > 0 && (
                        <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full">
                          {history.length} items
                        </span>
                      )}
                    </div>
                    {isLoadingHistory ? (
                      <div className="flex flex-col items-center justify-center py-8 flex-1">
                        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">Loading history...</p>
                      </div>
                    ) : historyError ? (
                      <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900 rounded-xl flex items-center gap-3 flex-1">
                        <div className="flex-shrink-0 text-red-500">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div className="text-sm text-red-700 dark:text-red-300">{historyError}</div>
                      </div>
                    ) : history.length === 0 ? (
                      <div className="text-center py-8 flex-1">
                        <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                          <RiTranslate2 className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No translations yet</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Your translation history will appear here
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4 overflow-y-auto pr-2" style={{ maxHeight: '260px' }}>
                        {history.map((item) => (
                          <div
                            key={item.id}
                            className="group p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors duration-200 cursor-pointer"
                            onClick={() => {
                              setInputText(item.originalText);
                              setTargetLang(item.targetLanguage);
                              setTranslatedText(item.translatedText);
                            }}
                          >
                            <div className="flex items-start gap-3">
                              <div className="flex-shrink-0 p-2 bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg">
                                {languages.find(lang => lang.code === item.targetLanguage)?.icon || <FiGlobe />}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                  <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                    {getLanguageName(item.targetLanguage)}
                                  </h4>
                                  <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap ml-2">
                                    {formatDate(item.createdAt)}
                                  </span>
                                </div>
                                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                                  {item.originalText}
                                </p>
                                <div className="mt-2 flex items-center text-xs text-blue-600 dark:text-blue-400">
                                  <span className="truncate">{item.translatedText}</span>
                                  <FiChevronRight className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Translation Tips
                    </h3>
                    <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                      <li className="flex items-start gap-2">
                        <span className="mt-0.5 flex-shrink-0 text-blue-500">•</span>
                        <span>Keep sentences clear and concise for best results</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-0.5 flex-shrink-0 text-blue-500">•</span>
                        <span>Avoid slang and idioms when possible</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-0.5 flex-shrink-0 text-blue-500">•</span>
                        <span>For long texts, break into smaller paragraphs</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-0.5 flex-shrink-0 text-blue-500">•</span>
                        <span>Check history for previous translations</span>
                      </li>
                    </ul>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ServicesBackground>
  );
}