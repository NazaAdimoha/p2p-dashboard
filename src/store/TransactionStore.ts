import { Transaction, TransactionStore } from "@/types";
import { create } from "zustand";

export const useTransactionStore = create<TransactionStore>((set, get) => ({
  transactions: [],
  fetchTransactions: async () => {
    try {
      const response = await fetch('http://localhost:3001/transactions');
      const data = await response.json();
      set({ transactions: data });
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  },
  fetchTransaction: async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3001/transactions/${id}`);
      if (!response.ok) throw new Error('Transaction not found');
      const data = await response.json();
      
      if (!get().transactions.some(t => t.id === id)) {
        set((state) => ({ transactions: [data, ...state.transactions] }));
      }
      
      return data;
    } catch (error) {
      console.error('Error fetching transaction:', error);
      throw error;
    }
  },
  createTransaction: (transaction) => {
    const newTransaction = {
      ...transaction,
      id: Math.random().toString(36).slice(2, 9),
      timestamp: new Date().toISOString()
    };
    set((state) => ({ transactions: [newTransaction, ...state.transactions] }));
    
    // Sync with JSON Server
    fetch('http://localhost:3001/transactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTransaction)
    });
  },
}));