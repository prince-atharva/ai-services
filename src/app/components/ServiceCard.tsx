import React from 'react';
import Link from 'next/link';
import { services, SERVICE_COLORS } from '@/lib/constent/services';

const ServiceCard: React.FC<{ idx: number }> = ({ idx }) => {
  const service = services[idx];
  const colorClass = SERVICE_COLORS[idx % SERVICE_COLORS.length];
  const animationDelay = idx * 120;

  return (
    <Link
      href={service.path}
      className={`group relative bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg rounded-3xl p-8 shadow-2xl transition-all duration-300 hover:shadow-3xl hover:-translate-y-2 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-blue-100 dark:border-indigo-900 glass-effect hover-card animate-slide-up opacity-0`}
      style={{ animationDelay: `${animationDelay}ms` }}
      tabIndex={0}
      aria-label={`Go to ${service.title}`}
    >
      <div className="relative">
        <div  
          className={`w-12 h-12 bg-gradient-to-br ${colorClass} rounded-xl flex items-center justify-center mb-6 text-white transform group-hover:rotate-12 transition-transform duration-300 animate-pulse-glow`}
          aria-hidden="true"
        >
          {service.icon}
        </div>
        <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
          {service.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          {service.description}
        </p>
        <ul className="space-y-3">
          {service.features.map((feature, index) => (
            <li key={index} className="flex items-center text-gray-600 dark:text-gray-300 transform hover:translate-x-2 transition-transform duration-300">
              <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {feature}
            </li>
          ))}
        </ul>
        <div className="absolute bottom-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <svg className="w-8 h-8 text-blue-500 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </Link>
  );
};

export default ServiceCard;