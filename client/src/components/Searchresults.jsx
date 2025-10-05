// src/components/ResultsList.js (Refactored for Load More only)

import React from "react";
import PaperCard from "./Card";

const ResultsList = ({
  results,
  isLoading,
  totalResults,
  searchTerm,

  showLoadMore, // True if results.length < totalResults
  onLoadMore, // The handler to increment the display count

  // REMOVED: isOSDRMode (Now Load More is used for ALL sources)
}) => {
  const renderControls = () => {
    if (totalResults === 0 || isLoading) return null;

    if (showLoadMore) {
      // Calculate remaining items to show in the button text
      const remaining = totalResults - results.length;

      return (
        <div 
          // 💡 CSS Change: Dark mode border color
          className="flex justify-center mt-6 pt-4 border-t border-gray-200 dark:border-gray-700"
        >
          <button
            onClick={onLoadMore}
            className="
        px-6 py-2 rounded-md text-base font-semibold 
        transition-colors duration-150 
        
        // 💡 CSS Change: Load More button styling for light/dark
        bg-white text-gray-700 
        border border-gray-300 
        hover:bg-gray-50 
        shadow-sm
        dark:bg-gray-700 dark:text-gray-200 
        dark:border-gray-600 dark:hover:bg-gray-600
    "
          >
            Show next 10 results
          </button>
        </div>
      );
    }
    // 2. DISPLAY 'ALL RESULTS' MESSAGE
    // If not showing load more, it means all results are displayed
    if (totalResults > 0) {
      return (
        <p 
          // 💡 CSS Change: Dark mode border and text for "All Results" message
          className="text-center mt-6 pt-4 border-t border-gray-200 text-gray-500 text-sm 
                     dark:border-gray-700 dark:text-gray-400"
        >
          All {totalResults.toLocaleString()} results displayed.
        </p>
      );
    }

    return null;
  };

  // --- MAIN RENDER LOGIC ---
  if (isLoading) {
    return (
      <div className="text-center p-12 flex justify-center items-center h-full">
        <img 
          src="/loader.gif" 
          alt="Loading content..." 
          // Adjust w- and h- values to control the size of the GIF
          className="w-30 h-30" 
        />
      </div>
    );
  }

  const resultHeader = searchTerm
    ? `Results for "${searchTerm}"`
    : `All Documents`;

  return (
    <div>
      {/* STATS AND SORT BAR */}
      <div 
        // 💡 CSS Change: Dark mode border and text for header/stats bar
        className="flex justify-between items-center mb-5 pb-2 border-b border-gray-100 dark:border-gray-700"
      >
        <h2 
          // 💡 CSS Change: Dark mode text for result header
          className="text-lg font-semibold text-gray-700 dark:text-gray-200"
        >
          {resultHeader}{" "}
          
         {/* <span className="text-gray-500 font-normal dark:text-gray-400">
            ({totalResults.toLocaleString()} found)
          </span> */}
        </h2>
        {/* <select 
          // 💡 CSS Change: Dark mode styling for select dropdown
          className="p-1.5 border border-gray-300 rounded text-sm text-gray-600 
                     dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300"
        >
          <option>Sort by: Relevance</option>
          <option>Sort by: Date (Newest)</option>
          <option>Sort by: Date (Oldest)</option>
        </select> */}
      </div>

      {/* LIST OF CARDS */}
      {results.length > 0 ? (
        <div className="space-y-4">
          {results.map((paper) => (
            // 2. Corrected the dynamic link syntax using {} and ``
            
              <PaperCard paper={paper} />
            
          ))}
        </div>
      ) : (
        <div 
          // 💡 CSS Change: Dark mode styling for "No Results Found" message box
          className="text-center p-12 rounded-lg border 
                     bg-gray-50 border-gray-200 
                     dark:bg-gray-700 dark:border-gray-600"
        >
          <p 
            // 💡 CSS Change: Dark mode text for main message
            className="text-lg font-medium text-gray-500 dark:text-gray-300"
          >
            No results found.
          </p>
          <p 
            // 💡 CSS Change: Dark mode text for helper message
            className="text-sm text-gray-400 mt-1 dark:text-gray-400"
          >
            Please modify your filters or search term.
          </p>
        </div>
      )}

      {/* LOAD MORE CONTROLS */}
      {renderControls()}
    </div>
  );
};

export default ResultsList;