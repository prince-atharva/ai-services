'use client'

import { useRouter } from 'next/navigation'
import { services, SERVICE_COLORS } from '@/lib/constent/services'

const testimonials = [
  {
    quote: "This AI platform has revolutionized how we handle our recruitment process. The resume parser is incredibly accurate!",
    author: "Sarah Johnson",
    role: "HR Director",
    company: "TechCorp"
  },
  {
    quote: "The translation service is a game-changer for our international team. It's fast, accurate, and supports all the languages we need.",
    author: "Michael Chen",
    role: "Global Operations Manager",
    company: "Global Solutions"
  },
  {
    quote: "The AI assistant has become an indispensable tool for our content team. It's like having an extra team member!",
    author: "Emma Rodriguez", 
    role: "Content Lead",
    company: "Creative Media"
  }
]

export default function HomePage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-fade-in">
              <div className="inline-block mb-4">
                <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full text-sm font-semibold animate-bounce">
                  ✨ AI-Powered Solutions
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 mb-6">
                Transform Your Workflow
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
                Experience the future of AI with our cutting-edge services. From resume parsing to real-time translation, we've got you covered.
              </p>
            </div>
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
        </div>

        {/* Animated Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-block mb-4">
              <span className="px-4 py-2 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 rounded-full text-sm font-semibold">
                Our Services
              </span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Powerful AI Tools
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Discover our suite of AI-powered tools designed to enhance your productivity
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={service.id}
                className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 animate-fade-in cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative">
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${
                      SERVICE_COLORS[index % SERVICE_COLORS.length]
                    } rounded-xl flex items-center justify-center mb-6 text-white transform group-hover:rotate-12 transition-transform duration-300`}
                  >
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {service.description}
                  </p>
                  <ul className="space-y-3">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-600 dark:text-gray-300 transform hover:translate-x-2 transition-transform duration-300">
                        <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 text-center relative overflow-hidden animate-fade-in">
            <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
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
    </div>
  )
}
