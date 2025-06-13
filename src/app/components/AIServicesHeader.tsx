import React from 'react';

interface AIServicesHeaderProps {
  subtitle: string;
  title: string;
  tagline: string;
  description: string;
}

const AIServicesHeader: React.FC<AIServicesHeaderProps> = ({ subtitle, title, tagline, description }) => (
  <div className="text-center mb-16 animate-fade-in">
    <div className="inline-block mb-4">
      <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full text-sm font-semibold shadow-md animate-float">
        {subtitle}
      </span>
    </div>
    <h1 className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 mb-4 drop-shadow-lg">
      {title}
    </h1>
    <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto italic mb-2 animate-fade-in-slow">
      {tagline}
    </p>
    <p className="text-base text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-2 animate-fade-in-slow">
      {description}
    </p>
    <div className="w-full overflow-hidden -mb-2">
      <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-8">
        <path fill="currentColor" d="M0,32L48,37.3C96,43,192,53,288,53.3C384,53,480,43,576,37.3C672,32,768,32,864,37.3C960,43,1056,53,1152,53.3C1248,53,1344,43,1392,37.3L1440,32L1440,60L1392,60C1344,60,1248,60,1152,60C1056,60,960,60,864,60C768,60,672,60,576,60C480,60,384,60,288,60C192,60,96,60,48,60L0,60Z" className="text-blue-200 dark:text-indigo-900" />
      </svg>
    </div>
  </div>
);

export default AIServicesHeader; 