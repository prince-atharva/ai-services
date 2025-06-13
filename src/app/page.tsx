'use client'

import { useRouter } from 'next/navigation'
import { services } from '@/lib/constent/services'
import AIServicesHeader from './components/AIServicesHeader'
import ServicesBackground from './components/ServicesBackground'
import ServiceCard from './components/ServiceCard'

export default function HomePage() {
  const router = useRouter()

  return (
    <ServicesBackground>
      <section className="relative pt-10 pb-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AIServicesHeader
            subtitle="✨ AI-Powered Solutions"
            title="Transform Your Workflow"
            tagline="Experience the future of AI with our cutting-edge services."
            description="From resume parsing to real-time translation, we've got you covered."
          />
          <div className="flex items-center justify-center gap-4 animate-fade-in-delay-1">
            <button
              onClick={() => router.push('/login')}
              className="group px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl text-lg font-semibold flex items-center gap-2 relative overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative flex items-center gap-2">
                <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                Login
              </span>
            </button>
            <button
              onClick={() => router.push('/register')}
              className="group px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-full hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl text-lg font-semibold flex items-center gap-2 relative overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative flex items-center gap-2">
                <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                Register
              </span>
            </button>
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Powerful AI Tools
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Discover our suite of AI-powered tools designed to enhance your productivity.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((_, idx) => (
              <ServiceCard key={idx} idx={idx} />
            ))}
          </div>
        </div>
      </section>
                  
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 text-center relative overflow-hidden animate-fade-in">
            <div className="relative z-10">
              <div className="inline-block mb-4">
                <span className="px-4 py-2 bg-white/20 text-white rounded-full text-sm font-semibold">
                  Get Started Today
                </span>
              </div>
              <h2 className="text-4xl font-bold text-white mb-4">
                Ready to Transform Your Workflow?
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                Join thousands of users who are already leveraging our AI services to transform their workflow.
              </p>
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={() => router.push('/register')}
                  className="group px-8 py-3 bg-white text-blue-600 rounded-full hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl text-lg font-semibold transform hover:scale-105 relative overflow-hidden"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span className="relative">Get Started</span>
                </button>
                <button
                  onClick={() => router.push('/login')}
                  className="group px-8 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-400 transition-all duration-300 shadow-lg hover:shadow-xl text-lg font-semibold transform hover:scale-105 relative overflow-hidden"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span className="relative">Sign In</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </ServicesBackground>
  )
}
