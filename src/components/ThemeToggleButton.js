// src/components/ThemeToggleButton.js
import React, { useContext } from 'react';
import { Sun, Moon } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';

const ThemeToggleButton = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  return (
    <button onClick={toggleTheme} className="p-2 rounded-full text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors" aria-label="Toggle theme">
      <Sun className="h-5 w-5 hidden dark:block" />
      <Moon className="h-5 w-5 block dark:hidden" />
    </button>
  );
};

export default ThemeToggleButton;
