import { Transaction, TransactionStore } from "@/types";
import { create } from "zustand";


export const useTransactionStore = create<TransactionStore>((set) => ({
  transactions: [],
  fetchTransactions: async () => {
    const response = await fetch("/api/transactions");
    const data = await response.json();
    set({ transactions: data });
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