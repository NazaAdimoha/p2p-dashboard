import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ThemeStore } from "@/types";

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      darkMode: false,
      isMobileMenuOpen: false,
      toggleTheme: () => set((state) => ({ darkMode: !state.darkMode })),
      toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
    }),
    {
      name: 'theme-storage',
    }
  )
);