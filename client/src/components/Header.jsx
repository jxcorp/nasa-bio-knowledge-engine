// src/components/Header.jsx

import React from 'react';
import { Rocket, Sun, Moon } from 'lucide-react';
import { Link } from 'react-router-dom';
// NOTE: Assuming this context hook is available
import { useTheme } from '../contexts/Themecontext'; 

// Separate ThemeToggle Component
const ThemeToggle = () => {
  // Use the theme context
  const { theme, toggleTheme } = useTheme(); 
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      className={`p-3 rounded-full transition-all duration-300 hover:scale-110 ml-4
        ${isDark 
          ? 'bg-slate-800 hover:bg-slate-700 text-yellow-300' 
          : 'bg-slate-100 hover:bg-slate-200 text-indigo-600'
        }`}
      aria-label="Toggle theme"
    >
      {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
};

const Header = () => {
  // Use the theme context to get the current theme state for styling
  const { theme } = useTheme(); 
  const isDark = theme === 'dark';

  return (
    <header className={`sticky top-0 z-50 backdrop-blur-xl border-b transition-all duration-500 ${
      isDark 
        ? 'bg-slate-950/80 border-slate-800/50' 
        : 'bg-white/80 border-slate-200/50'
    }`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl ${isDark ? 'bg-gradient-to-br from-cyan-500 to-purple-600' : 'bg-gradient-to-br from-cyan-400 to-purple-500'}`}>
              <Rocket className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">Space Biology </h1>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Powered by NASA Open Science Data Repository</p>
            </div>
          </div>
          
          {/* Theme Toggle Component */}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;