'use client'

import React from 'react'

const Loading = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
      <div className="text-center flex flex-col items-center">
        <div className="relative flex items-center justify-center mb-6">
          <div className="absolute animate-spin-slow">
            <svg className="w-24 h-24 text-indigo-400 opacity-30" fill="none" viewBox="0 0 96 96">
              <circle cx="48" cy="48" r="44" stroke="url(#grad1)" strokeWidth="8" />
              <defs>
                <linearGradient id="grad1" x1="0" y1="0" x2="96" y2="96">
                  <stop stopColor="#6366f1" />
                  <stop offset="1" stopColor="#3b82f6" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="relative z-10">
            <svg className="w-16 h-16 text-blue-600 animate-bounce" fill="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" className="opacity-20" />
              <path d="M12 6v6l4 2" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-indigo-700 dark:text-indigo-300 mb-2 animate-fade-in">
          Welcome to Service Portal
        </h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-300 animate-pulse">
          Loading your experience...
        </p>
        <div className="mt-6 flex justify-center space-x-2">
          <span className="w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
          <span className="w-3 h-3 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
          <span className="w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
        </div>
        <style jsx global>{`
        @keyframes spin-slow {
          0% { transform: rotate(0deg);}
          100% { transform: rotate(360deg);}
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(10px);}
          100% { opacity: 1; transform: translateY(0);}
        }
        .animate-fade-in {
          animation: fade-in 1s ease-in;
        }
      `}</style>
      </div>
    </div>
  )
}

export default Loading