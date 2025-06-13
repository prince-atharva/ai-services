import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Auth } from '@/lib/api/auth';
import { useRouter } from 'next/navigation';

interface UserHeaderProps {
  showServicesButton?: boolean;
}

const UserHeader: React.FC<UserHeaderProps> = ({ showServicesButton = true }) => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await Auth.logout();
      window.location.href = '/';
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNavigateServices = () => {
    router.push('/services');
  };

  return (
    <div className="flex items-center justify-between gap-4 mb-8">
      <div className='flex items-center gap-4'>
        <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg border-4 border-white dark:border-gray-800 animate-pulse-glow">
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
      <div className="flex items-center gap-2">
        {showServicesButton && (
          <button
            onClick={handleNavigateServices}
            className="group px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-400 modern-button"
            aria-label="Go to Services"
            type="button"
          >
            <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            Services
          </button>
        )}
        <button
          onClick={handleLogout}
          disabled={isLoading}
          className="group px-6 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full hover:from-red-600 hover:to-red-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-red-400 modern-button"
          aria-label="Logout"
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
    </div>
  );
};

export default UserHeader;