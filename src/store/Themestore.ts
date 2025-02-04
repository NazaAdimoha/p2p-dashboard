
import { ThemeStore } from "@/types";
import { create } from "zustand";

export const useThemeStore = create<ThemeStore>((set) => ({
    darkMode: false,
    isMobileMenuOpen: false,
    toggleTheme: () => set((state) => ({ darkMode: !state.darkMode })),
    toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
}));