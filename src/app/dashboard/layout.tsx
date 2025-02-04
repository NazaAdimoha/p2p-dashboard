"use client";

import { useEffect } from 'react'
import { useClerk } from '@clerk/nextjs'
import { ReactNode } from 'react';
import { useThemeStore } from '@/store/Themestore';
import Sidebar from '@/components/side-bar/web-sidebar';
import MobileSidebar from '@/components/side-bar/mobile-sidebar';
import { useRouter } from 'next/navigation';
import DashBoardNavbar from '@/components/nav-bar';

export default function Dashboard({
    children
}:{children: ReactNode}) {
  const { user } = useClerk()
  const router = useRouter()
  const { darkMode } = useThemeStore()
//   const { transactions, fetchTransactions } = useTransactionStore()

  useEffect(() => {
    if (!user) router.push('/')
  }, [user])

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-background-dark' : 'bg-background-light'}`}>
      <DashBoardNavbar />
      
      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-64 fixed h-full overflow-y-auto border-r">
          <Sidebar />
        </aside>

        {/* Mobile Sidebar */}
        <div className="md:hidden">
          <MobileSidebar />
        </div>

        <main className="md:ml-64 flex-1">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className={`rounded-xl p-6 ${
              darkMode 
                ? 'bg-background-dark border border-gray-800' 
                : 'bg-white shadow-sm'
            }`}>
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}