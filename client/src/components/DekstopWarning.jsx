// src/components/DesktopOnlyWarning.jsx

import React, { useState, useEffect } from 'react';
import { Monitor, X } from 'lucide-react';

// Define the minimum width for considering it 'desktop'
const MIN_DESKTOP_WIDTH = 1024; // Tailwind's 'lg' breakpoint

const DesktopOnlyWarning = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // 1. Detect Screen Size on Mount and Resize
  useEffect(() => {
    const checkScreenSize = () => {
      // Check if the current window width is less than the desktop threshold
      const isCurrentlyMobile = window.innerWidth < MIN_DESKTOP_WIDTH;
      setIsMobile(isCurrentlyMobile);
    };

    // Run on mount
    checkScreenSize();

    // Run on window resize
    window.addEventListener('resize', checkScreenSize);

    // Cleanup listener on unmount
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Only render the warning on mobile devices AND if it hasn't been closed
  if (!isMobile || !isVisible) {
    return null;
  }

  return (
    // Fixed overlay with high z-index to cover the entire page
    <div className="fixed inset-0 bg-gray-900 bg-opacity-95 z-[9999] flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-xl shadow-2xl max-w-sm w-full p-6 text-center border-t-4 border-indigo-500">
        
        <Monitor className="w-12 h-12 text-indigo-500 mx-auto mb-4" />
        
        <h2 className="text-xl font-bold mb-2">Desktop View Recommended</h2>
        
        <p className="text-sm mb-4 text-gray-600 dark:text-gray-400">
          This data platform is complex and is primarily designed for desktop or tablet use.
        </p>

        <p className="text-sm font-semibold mb-6">
          For the best experience, please switch to a larger screen or try enabling "Desktop Site" in your browser settings.
        </p>
        
        <button
          onClick={() => setIsVisible(false)}
          className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 rounded-lg transition duration-200 flex items-center justify-center"
        >
          <X className="w-4 h-4 mr-2" />
          I Understand (Hide)
        </button>
      </div>
    </div>
  );
};

export default DesktopOnlyWarning;