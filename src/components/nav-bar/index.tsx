import { AnimatePresence, motion } from 'framer-motion'
import { useClerk } from '@clerk/nextjs'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { useThemeStore } from '@/store/Themestore'
import { Menu, Moon, Sun, X } from 'lucide-react'

export default function DashBoardNavbar() {
  const { user, signOut } = useClerk()
  const router = useRouter()
  const pathname = usePathname()
  const { darkMode, toggleTheme } = useThemeStore()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navLinks = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Transactions', path: '/transactions' },
    { name: 'New Transaction', path: '/new' },
  ]

  return (
    <nav className={`sticky top-0 z-50 ${darkMode ? 'bg-background-dark' : 'bg-white'} shadow-sm`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left section */}
          <div className="flex items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex-shrink-0 flex items-center"
            >
              <span className={`text-xl font-bold ${darkMode ? 'text-text-primary-dark' : 'text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent hover:opacity-90 transition-opacity'}`}>
                PeerPay
              </span>
            </motion.div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              {navLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.path}
                  whileHover={{ y: -2 }}
                  className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                    pathname === link.path
                      ? `border-b-2 ${darkMode ? 'border-primary-dark text-text-primary-dark' : 'border-primary text-primary'}`
                      : `${darkMode ? 'text-text-secondary-dark hover:text-text-primary-dark' : 'text-gray-500 hover:text-gray-700'}`
                  }`}
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full ${darkMode ? 'text-text-primary-dark' : 'text-gray-600'}`}
            >
              {darkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            {user && (
              <div className="hidden md:flex items-center gap-4">
                <span className={`text-sm ${darkMode ? 'text-text-secondary-dark' : 'text-gray-600'}`}>
                  {user.fullName}
                </span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => signOut(() => router.push('/'))}
                  className={`px-4 py-2 rounded-lg text-sm ${
                    darkMode
                      ? 'bg-primary-dark text-white hover:bg-primary'
                      : 'bg-primary text-white hover:bg-primary-dark'
                  }`}
                >
                  Sign Out
                </motion.button>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute w-full bg-white shadow-lg"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.path}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    pathname === link.path
                      ? 'bg-primary text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {link.name}
                </a>
              ))}
              {user && (
                <div className="border-t pt-2">
                  <button
                    onClick={() => signOut(() => router.push('/'))}
                    className="w-full text-left px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}