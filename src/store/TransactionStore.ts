import { Transaction, TransactionStore } from "@/types";
import { create } from "zustand";

export const useTransactionStore = create<TransactionStore>((set) => ({
  transactions: [],
  fetchTransactions: async () => {
    try {
      const response = await fetch('http://localhost:3001/transactions', {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
      
      const data = await response.json()
      console.log("data:::", data)
      set({ transactions: data })
    } catch (error) {
      console.error('Error fetching transactions:', error)
      throw error 
    }
  },
  createTransaction: (transaction) => {
    const newTransaction = {
      ...transaction,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString()
    };
    set((state) => ({ transactions: [newTransaction, ...state.transactions] }));
  },
}));