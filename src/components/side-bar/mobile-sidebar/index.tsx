import { useThemeStore } from '@/store/Themestore'
import { AnimatePresence, motion } from 'framer-motion'
import { Sidebar } from 'lucide-react'



export default function MobileSidebar() {
  const { isMobileMenuOpen } = useThemeStore()

  return (
    <AnimatePresence>
      {isMobileMenuOpen && (
        <motion.div
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          exit={{ x: -300 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed inset-y-0 left-0 z-50 w-64 shadow-xl"
        >
          <Sidebar />
        </motion.div>
      )}
    </AnimatePresence>
  )
}