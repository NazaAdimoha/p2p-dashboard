export type Transaction = {
    id: string
    senderName: string
    receiverName: string
    amount: number
    status: 'Pending' | 'Completed' | 'Failed'
    timestamp: string
  }

 export type TransactionStore = {
    transactions: Transaction[];
    fetchTransactions: () => Promise<void>;
    createTransaction: (transaction: Omit<Transaction, "id" | "timestamp">) => void;
  };
  

 export type ThemeStore = {
    darkMode: boolean;
    isMobileMenuOpen: boolean;
    toggleTheme: () => void;
    toggleMobileMenu: () => void;
  };