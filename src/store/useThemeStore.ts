import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'light' | 'dark';

interface ThemeStore {
  theme: Theme;
  toggleTheme: () => void;
}

const getSystemPrefersDark = (): boolean => {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => {
      const initialTheme: Theme = getSystemPrefersDark() ? 'dark' : 'light';

      if (typeof document !== 'undefined') {
        document.documentElement.classList.toggle(
          'dark',
          initialTheme === 'dark',
        );
      }

      return {
        theme: initialTheme,
        toggleTheme: () => {
          const nextTheme: Theme = get().theme === 'light' ? 'dark' : 'light';
          if (typeof document !== 'undefined') {
            document.documentElement.classList.toggle(
              'dark',
              nextTheme === 'dark',
            );
          }
          set({ theme: nextTheme });
        },
      };
    },
    {
      name: 'theme',
      onRehydrateStorage: () => (state) => {
        if (typeof document === 'undefined') return;
        if (state?.theme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      },
    },
  ),
);
