"use client";
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useClerk } from '@clerk/nextjs';
import { useTransactionStore } from '@/store/TransactionStore';
import { StatusBadge } from '@/shared/statusBadge';

export default function TransactionDetails() {
  const params = useParams();
  const router = useRouter();
  const { user, loaded } = useClerk();
  const [isLoading, setIsLoading] = useState(true);
  const { transactions } = useTransactionStore();
  const [transaction, setTransaction] = useState<any>(null);

  useEffect(() => {
    if (loaded && !user) {
      router.push('/dashboard');
    }
  }, [loaded, user, router]);

  useEffect(() => {
    if (params.id && transactions.length > 0) {
      const found = transactions.find(t => t.id === params.id);
      setTransaction(found);
      setIsLoading(false);
    }
  }, [params.id, transactions]);

  if (!loaded || isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
      </div>
    );
  }

  if (!transaction) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg">Transaction not found</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Transaction Details</h1>
        <StatusBadge status={transaction.status} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DetailCard
          title="Transaction Information"
          items={[
            { label: "Transaction ID", value: transaction.id },
            { label: "Amount", value: new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(transaction.amount) },
            { label: "Date", value: new Date(transaction.timestamp).toLocaleString() },
          ]}
        />

        <DetailCard
          title="Parties"
          items={[
            { label: "Sender", value: transaction.senderName },
            { label: "Receiver", value: transaction.receiverName },
          ]}
        />
      </div>
    </div>
  );
}

interface DetailItem {
  label: string;
  value: string | number;
}

interface DetailCardProps {
  title: string;
  items: DetailItem[];
}

function DetailCard({ title, items }: DetailCardProps) {
  return (
    <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="flex flex-col space-y-1">
            <span className="text-sm text-gray-500 dark:text-gray-400">{item.label}</span>
            <span className="font-medium">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}