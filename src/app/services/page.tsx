'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import { Auth } from '@/lib/api/auth'
import { useState } from 'react'
import { SERVICE_COLORS, services } from '@/lib/constent/services'

export default function ServicesPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  const handleLogout = async () => {
    try {
      setIsLoading(true)
      await Auth.logout()
      router.push('/')
    } catch (error) {
      console.error('Logout failed:', error)
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 relative overflow-x-hidden">
      <div className="absolute inset-0 z-0 animate-gradient-move bg-gradient-to-br from-blue-200 via-indigo-200 to-purple-200 dark:from-gray-900 dark:via-indigo-900 dark:to-blue-900 opacity-60"></div>
      <div className="absolute inset-0 pointer-events-none z-10">
        <div className="w-full h-full bg-[url('/sparkle.svg')] opacity-10"></div>
      </div>
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 z-20">
        <div className="text-center mb-16 animate-fade-in">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg border-4 border-white dark:border-gray-800">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Welcome back, {user?.name}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {user?.email}
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              disabled={isLoading}
              className="group px-6 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full hover:from-red-600 hover:to-red-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging out...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </>
              )}
            </button>
          </div>
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full text-sm font-semibold shadow-md">
              ✨ AI Services Dashboard
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 mb-4 drop-shadow-lg">
            Your AI Services
          </h1>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto italic mb-2 animate-fade-in-slow">
            "Empower your creativity and productivity with the magic of AI."
          </p>
          <p className="text-base text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-2 animate-fade-in-slow">
            Explore and utilize our suite of AI-powered services designed to enhance your productivity and creativity.
          </p>
        </div>
        <div className="w-full overflow-hidden -mb-2">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-8">
            <path fill="currentColor" d="M0,32L48,37.3C96,43,192,53,288,53.3C384,53,480,43,576,37.3C672,32,768,32,864,37.3C960,43,1056,53,1152,53.3C1248,53,1344,43,1392,37.3L1440,32L1440,60L1392,60C1344,60,1248,60,1152,60C1056,60,960,60,864,60C768,60,672,60,576,60C480,60,384,60,288,60C192,60,96,60,48,60L0,60Z" className="text-blue-200 dark:text-indigo-900" />
          </svg>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-8">
          {services.map((service, idx) => (
            <Link
              key={service.id}
              href={
                service.id === 'translation'
                  ? '/services/translate'
                  : service.id === 'resume-parser'
                  ? '/services/resume-parser'
                  : service.id === 'ai-assistant'
                  ? '/services/assistant'
                  : '#'
              }
              className={`group relative bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg rounded-3xl p-8 shadow-2xl transition-all duration-300 hover:shadow-3xl hover:-translate-y-2 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-blue-100 dark:border-indigo-900 glass-card animate-slide-up opacity-0`}
              style={{ animationDelay: `${idx * 120}ms` }}
              tabIndex={0}
            >
              <div className="relative flex flex-col items-start">
                <div
                  className={`w-14 h-14 bg-gradient-to-br ${SERVICE_COLORS[idx % SERVICE_COLORS.length]} rounded-xl flex items-center justify-center mb-6 text-white text-3xl shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 group-hover:shadow-xl animate-pulse-slow`}
                >
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white drop-shadow-sm">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {service.description}
                </p>
                <ul className="space-y-3 mb-4">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-600 dark:text-gray-300 transform hover:translate-x-2 transition-transform duration-300">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex items-center text-blue-600 dark:text-blue-400 group-hover:translate-x-2 transition-transform animate-bounce-x cursor-pointer font-semibold text-lg">
                  Try it now
                  <svg className="w-5 h-5 ml-2 animate-bounce-x group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <style jsx global>{`
        @keyframes gradient-move {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-move {
          background-size: 200% 200%;
          animation: gradient-move 12s ease-in-out infinite;
        }
        @keyframes fade-in-slow {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: none; }
        }
        .animate-fade-in-slow {
          animation: fade-in-slow 1.2s cubic-bezier(0.4,0,0.2,1) both;
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: none; }
        }
        .animate-slide-up {
          animation: slide-up 0.9s cubic-bezier(0.4,0,0.2,1) both;
        }
        @keyframes bounce-x {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(6px); }
        }
        .animate-bounce-x {
          animation: bounce-x 1.2s infinite;
        }
        @keyframes pulse-slow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(59,130,246,0.3); }
          50% { box-shadow: 0 0 16px 4px rgba(59,130,246,0.15); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 2.5s infinite;
        }
        .glass-card {
          backdrop-filter: blur(16px) saturate(180%);
          -webkit-backdrop-filter: blur(16px) saturate(180%);
        }
      `}</style>
    </div>
  )
} 