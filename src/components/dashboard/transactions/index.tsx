"use client";
import { useTransactionStore } from '@/store/TransactionStore'
import { useEffect } from 'react'
import { DataTable } from '../data-table'
import { columns } from '../transaction-column/column'
import { useRouter } from 'next/navigation';
import { useClerk } from '@clerk/nextjs';

export default function TransactionPage() {
  const { transactions, fetchTransactions } = useTransactionStore()
  const { user, loaded } = useClerk()
  const router = useRouter()

  useEffect(() => {
    if (loaded && !user) {
      router.push('/')
    }
  }, [user, loaded])

  useEffect(() => {
    if (user) {
      fetchTransactions().catch((error) => {
        console.error('Failed to fetch transactions:', error)
      })
    }
  }, [user])

  if (!loaded || !user) return null

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Transaction History</h1>
      <DataTable
        columns={columns}
        data={transactions}
      />
    </div>
  )
}