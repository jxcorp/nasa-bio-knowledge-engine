// src/components/Footer.jsx

import React from 'react';
import { Rocket } from 'lucide-react';
// NOTE: Assuming this context hook is available
import { useTheme } from '../contexts/Themecontext'; 

const Footer = () => {
  // Use the theme context
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <footer className={`border-t py-12 transition-colors duration-500 ${
      isDark ? 'border-slate-800/50 bg-slate-950/50' : 'border-slate-200 bg-slate-50/50'
    }`}>
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Rocket className={`w-5 h-5 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`} />
            <span className={`font-semibold ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Space Biology Discovery Engine
            </span>
          </div>
          
          <div className={`text-sm ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
            © 2025 Entropic Minds |  Source: Nasa Open Research Data
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;