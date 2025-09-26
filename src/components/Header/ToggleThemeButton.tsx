import { useThemeStore } from '../../store/useThemeStore';
import { MoonIcon } from '../../ui/MoonIcon';
import { SunIcon } from '../../ui/SunIcon';

export const ToggleThemeButton = () => {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="ml-4 mt-2 mb-2 px-3 py-1 rounded-full border-2 border-todo-border dark:border-dark-border hover:scale-105 transition-all duration-300"
      aria-label="Toggle theme"
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
    >
      {theme === 'dark' ?
        <SunIcon className={'text-yellow-300'} />
      : <MoonIcon className={'text-slate-400'} />}
    </button>
  );
};
