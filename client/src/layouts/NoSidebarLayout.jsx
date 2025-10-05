// src/layouts/NoSidebarLayout.jsx
import React from 'react';
import Header from '../components/Header'; // Assuming you have a Header component
/* import Footer from '../components/Footer'; // Assuming you have a Footer component
 */
const NoSidebarLayout = ({ children }) => {
  return (
    // The main container fills the entire viewport
    <div className="flex flex-col min-h-screen 
                    // 💡 CSS Change: Base text color for the entire layout
                    dark:text-gray-100">
      
      {/* 1. Header (fixed at the top) */}
      <header 
        // 💡 CSS Change: Header background and shadow in dark mode
        className="sticky top-0 z-10 shadow-md 
                   bg-white dark:bg-gray-900 dark:shadow-xl"
      >
        <Header />
      </header>

      {/* 2. Main Content Area */}
      {/* flex-grow allows this section to take up all available vertical space */}
      <main 
        // 💡 CSS Change: Main content background in dark mode
        className="flex-grow p-4 md:p-8 
                   bg-gray-50 dark:bg-gray-900"
      >
        <div className="max-w-7xl mx-auto">
          {children} {/* This is where your OSDRDetailsPage content will go */}
        </div>
      </main>

      {/* 3. Footer (fixed at the bottom or just stick to the bottom) */}
      <footer 
        // 💡 CSS Change: Footer background and border in dark mode
        className="w-full p-4 border-t 
                   bg-gray-100 dark:bg-gray-800 dark:border-gray-700"
      >
{/* <Footer />
 */}      </footer>
      
    </div>
  );
};

export default NoSidebarLayout;