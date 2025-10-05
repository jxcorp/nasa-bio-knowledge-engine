import React from 'react';
import { Link } from 'react-router-dom';
import NoSidebarLayout from '../layouts/NoSidebarLayout'; // Assuming you want the header/footer

const NotFoundPage = () => {
  return (
    // Wrap the 404 content in your main layout for consistent header/footer
    <NoSidebarLayout>
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center p-8">
        
        {/* Large 404 Error Text */}
        <h1 className="text-9xl font-extrabold text-indigo-600 tracking-widest opacity-80">
          404
        </h1>
        
        {/* Animated Background Text */}
        <div className="bg-black text-white px-2 text-sm rounded rotate-12 absolute shadow-lg">
          PAGE NOT FOUND
        </div>
        
        {/* Main Heading */}
        <p className="text-3xl font-medium mt-10 text-gray-800">
          We can't find that page, Captain.
        </p>

        {/* Descriptive Text */}
        <p className="mt-4 mb-8 text-lg text-gray-600 max-w-lg">
          The requested OSDR path does not exist or may have been moved. 
          Please check the URL or return to the dashboard.
        </p>
        
        {/* Navigation Link */}
        <Link 
          to="/" 
          className="px-6 py-3 text-sm font-bold text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 transition duration-300 transform hover:scale-105"
        >
          Go to Dashboard
        </Link>
      </div>
    </NoSidebarLayout>
  );
};

export default NotFoundPage;