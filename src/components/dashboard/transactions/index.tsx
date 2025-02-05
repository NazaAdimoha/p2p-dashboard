"use client";
import { useTransactionStore } from '@/store/TransactionStore'
import { useEffect, useState } from 'react'
import { DataTable } from '../data-table'
import { columns } from '../transaction-column/column'
import { useRouter } from 'next/navigation';
import { useClerk } from '@clerk/nextjs';

export default function TransactionPage() {
  const { transactions, fetchTransactions } = useTransactionStore()
  console.log("transactions:::", transactions)
  const { user, loaded } = useClerk()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (loaded && !user) {
      router.push('/dashboard')
    }
  }, [loaded, user, router])

  useEffect(() => {
    const loadTransactions = async () => {
      if (user) {
        try {
          await fetchTransactions()
        } catch (error) {
          console.error('Failed to fetch transactions:', error)
        } finally {
          setIsLoading(false)
        }
      }
    }

    if (user) {
      loadTransactions()
    }
  }, [user, fetchTransactions])

if (!loaded || isLoading || !isMounted) {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
    </div>
  )
}

if (!user) return null

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