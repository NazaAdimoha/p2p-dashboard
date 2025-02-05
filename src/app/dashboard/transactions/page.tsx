import TransactionPage from "@/components/dashboard/transactions";
import React from "react";

const Transactions = () => {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Transaction History</h1>
      <TransactionPage />
    </div>
  );
};

export default Transactions;
