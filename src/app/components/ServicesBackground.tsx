import React from 'react';

const ServicesBackground: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 relative overflow-x-hidden">
    <div className="absolute inset-0 z-0 animate-gradient-move bg-gradient-to-br from-blue-200 via-indigo-200 to-purple-200 dark:from-gray-900 dark:via-indigo-900 dark:to-blue-900 opacity-60"></div>
    <div className="absolute inset-0 pointer-events-none z-10">
      <div className="w-full h-full bg-[url('/sparkle.svg')] opacity-10"></div>
    </div>
    <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 z-20">
      {children}
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
      .glass-effect {
        backdrop-filter: blur(16px) saturate(180%);
        -webkit-backdrop-filter: blur(16px) saturate(180%);
      }
    `}</style>
  </div>
);

export default ServicesBackground; 