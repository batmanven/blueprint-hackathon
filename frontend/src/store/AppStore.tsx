import React, { createContext, useContext, useState, type ReactNode } from 'react';
import type { User } from '../types';

interface AppState {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  language: 'en' | 'hi';
  setLanguage: (lang: 'en' | 'hi') => void;
  shieldFund: number;
  setShieldFund: (amount: number) => void;
  savedSchemes: string[];
  toggleSavedScheme: (schemeId: string) => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [shieldFund, setShieldFund] = useState(240000); // Default benchmark
  const [savedSchemes, setSavedSchemes] = useState<string[]>([]);

  const toggleSavedScheme = (schemeId: string) => {
    setSavedSchemes(prev => 
      prev.includes(schemeId) ? prev.filter(id => id !== schemeId) : [...prev, schemeId]
    );
  };

  return (
    <AppContext.Provider value={{
      user,
      setUser,
      isLoading,
      setIsLoading,
      language,
      setLanguage,
      shieldFund,
      setShieldFund,
      savedSchemes,
      toggleSavedScheme
    }}>
      {children}
    </AppContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAppStore = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppStore must be used within an AppProvider');
  }
  return context;
};
