/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        'gloss-metal':
          'linear-gradient(135deg, #ffffff, #f0f0f0, #fafafa, #ffffff)',
        'gloss-metal-dark':
          'linear-gradient(135deg, #0b1220, #0f172a, #0e1626, #0b1220)',
        // м'якший холодний фоновий градієнт карток
        'todo-bg': 'linear-gradient(135deg, #eef2ff, #f8fafc 60%, #f1f5f9)',
        'todo-bg-dark':
          'linear-gradient(135deg, #0f172a, #0b1220 60%, #0f172a)',
        // легкий світлий hover із трохи більшою контрастністю
        'todo-hover': 'linear-gradient(90deg, #edf2f7, #e5e7eb)',
        'todo-hover-dark': 'linear-gradient(90deg, #111827, #0f172a)',
        // фон для виконаних тудушок, щоб були більш виділені
        'todo-completed': 'linear-gradient(90deg, #e6f0ff, #eef9ff)',
        'todo-completed-dark':
          'linear-gradient(90deg,rgb(24, 31, 46), #0f172a)',
        'items-gradient': 'linear-gradient(90deg, #f3f4f6, #f8fafc)',
        'items-gradient-dark': 'linear-gradient(90deg, #0f172a, #0b1220)',
        // градієнти для кнопок (фільтри/вторинні)
        'pill-active': 'linear-gradient(90deg, #60a5fa, #0ea5e9)',
        'pill-active-dark': 'linear-gradient(90deg, #0ea5e9, #38bdf8)',
        'pill-hover': 'linear-gradient(90deg, #eef2ff, #e0f2fe)',
        'pill-hover-dark': 'linear-gradient(90deg, #0f172a,rgb(30, 49, 87))',
      },
      colors: {
        todo: {
          border: '#e5e7eb',
          borderHover: '#cbd5e1',
          text: '#0f172a',
          muted: '#64748b',
          inputFocus: '#64748b',
          inputGlow: '#cbd5e1',
          danger: '#ef4444',
          dangerHover: '#dc2626',
          // нейтральні кнопки/пілли
          pillBg: '#ffffff',
          pillBgActive: '#0ea5e9',
          pillText: '#475569',
          pillTextActive: '#ffffff',
          pillBorder: '#e2e8f0',
        },
        // dark theme tokens
        dark: {
          bg: '#0b1220',
          surface: '#0f172a',
          text: '#e5e7eb',
          muted: '#94a3b8',
          border: '#1f2937',
          danger: '#ef4444',
        },
      },
    },
  },
  plugins: [],
};
