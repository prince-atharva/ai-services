  'use client'

  import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
  import { Auth } from '@/lib/api/auth';

  interface User {
    id: number;
    name: string;
    email: string;
  }

  interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    setUser: (user: User | null) => void;
    setIsLoading: (isLoading: boolean) => void;
  }

  const AuthContext = createContext<AuthContextType | undefined>(undefined);

  export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const fetchProfile = async () => {
        setIsLoading(true);
        try {
          const profile = await Auth.getProfile();
          setUser(profile.data);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      }
      fetchProfile();
    }, []);

    return (
      <AuthContext.Provider value={{ user,setUser,setIsLoading, isLoading }}>
          {isLoading ? (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
          <div className="text-center flex flex-col items-center">
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full animate-pulse"></div>
              </div>
              <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            </div>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 animate-pulse">Loading services...</p>
          </div>
        </div>
      ) : (
        children
      )}
      </AuthContext.Provider>
    );
  }

  export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
  }