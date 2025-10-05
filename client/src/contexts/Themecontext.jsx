// src/context/ThemeContext.js

import React, { createContext, useContext, useState, useEffect } from 'react';

// 1. Define the Context structure
// We create a Context object that components can subscribe to.
const ThemeContext = createContext();

/**
 * 2. Theme Provider Component
 * This component wraps your entire application (usually in index.js or App.js).
 * It manages the theme state and applies the 'dark' class to the HTML root.
 */
export const ThemeProvider = ({ children }) => {
    // Initialize state, checking localStorage for a saved theme preference
    const [theme, setTheme] = useState(
        // Use a function to initialize state once on mount
        () => localStorage.getItem('theme') || 'dark'
    );

    // 3. Effect to handle DOM manipulation and persistence
    useEffect(() => {
        const root = window.document.documentElement;

        // Apply theme class to the <html> tag (CRUCIAL for Tailwind 'class' mode)
        if (theme === 'dark') {
            root.classList.add('dark');
            // Remove 'light' if we used a 'light:' prefix elsewhere (good cleanup)
            root.classList.remove('light'); 
        } else {
            root.classList.remove('dark');
            root.classList.add('light'); 
        }

        // Save the current theme preference to local storage
        localStorage.setItem('theme', theme);

    }, [theme]); // Reruns whenever the theme state changes

    // The function used by child components to switch the theme
    const toggleTheme = () => {
        setTheme(currentTheme => (currentTheme === 'dark' ? 'light' : 'dark'));
    };

    return (
        <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

/**
 * 4. Custom Hook for using the theme
 * This makes accessing the theme and toggle function cleaner in any component.
 */
export const useTheme = () => {
    const context = useContext(ThemeContext);
    
    // Safety check
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    
    return context;
};