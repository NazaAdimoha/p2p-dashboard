import { useClerk } from '@clerk/nextjs'
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion'
import { useThemeStore } from '@/store/Themestore'


export default function Sidebar() {
  const { signOut } = useClerk()
  const router = useRouter()
  const { darkMode } = useThemeStore()
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: '🏠' },
    { name: 'Transactions', path: '/transactions', icon: '💸' },
    { name: 'Analytics', path: '/analytics', icon: '📊' },
    { name: 'Settings', path: '/settings', icon: '⚙️' },
  ]

  return (
    <nav className={`h-full ${darkMode ? 'bg-background-dark' : 'bg-white'}`}>
      <div className="p-4 space-y-8">
        <h2 className={`text-xl font-bold px-2 ${darkMode ? 'text-text-primary-dark' : 'text-gray-900'}`}>
          PeerPay
        </h2>
        
        <div className="space-y-2">
          {navItems.map((item) => (
            <motion.a
              key={item.name}
              href={item.path}
              whileHover={{ x: 5 }}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg ${
                pathname === item.path
                  ? `${darkMode ? 'bg-primary-dark' : 'bg-primary'} text-white`
                  : `${darkMode ? 'text-text-secondary-dark hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-100'}`
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </motion.a>
          ))}
        </div>

        <div className="border-t pt-4">
          <button
            onClick={() => signOut(() => router.push('/'))}
            className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg ${
              darkMode 
                ? 'text-red-400 hover:bg-red-900/20' 
                : 'text-red-600 hover:bg-red-100'
            }`}
          >
            <span>🚪</span>
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </nav>
  )
}