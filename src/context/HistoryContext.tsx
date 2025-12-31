import { createContext, useState, useContext } from "react";
import type { ReactNode } from "react";


interface HistoryContextType {
  history: string[];
  addHistory: (item: string) => void;
  clearHistory: () => void;
}

const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

export function HistoryProvider({ children }: { children: ReactNode }) {
  const [history, setHistory] = useState<string[]>([]);

  const addHistory = (item: string) => setHistory((prev) => [...prev, item]);
  const clearHistory = () => setHistory([]);

  return (
    <HistoryContext.Provider value={{ history, addHistory, clearHistory }}>
      {children}
    </HistoryContext.Provider>
  );
}
// eslint-disable-next-line react-refresh/only-export-components
export function useHistoryContext() {
  const context = useContext(HistoryContext);
  if (!context) {
    throw new Error("useHistoryContext must be used within a HistoryProvider");
  }
  return context;
}
