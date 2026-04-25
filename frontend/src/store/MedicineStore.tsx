/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Medicine } from '../types';

interface MedicineState {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: Medicine[];
  setSearchResults: (results: Medicine[]) => void;
  selectedMedicine: Medicine | null;
  setSelectedMedicine: (med: Medicine | null) => void;
  savingsTotal: number;
  addSavings: (amount: number) => void;
}

const MedicineContext = createContext<MedicineState | undefined>(undefined);

export const MedicineProvider = ({ children }: { children: ReactNode }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Medicine[]>([]);
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null);
  const [savingsTotal, setSavingsTotal] = useState(0);

  const addSavings = (amount: number) => {
    setSavingsTotal(prev => prev + amount);
  };

  return (
    <MedicineContext.Provider value={{
      searchQuery,
      setSearchQuery,
      searchResults,
      setSearchResults,
      selectedMedicine,
      setSelectedMedicine,
      savingsTotal,
      addSavings
    }}>
      {children}
    </MedicineContext.Provider>
  );
};

export const useMedicineStore = () => {
  const context = useContext(MedicineContext);
  if (context === undefined) {
    throw new Error('useMedicineStore must be used within a MedicineProvider');
  }
  return context;
};
