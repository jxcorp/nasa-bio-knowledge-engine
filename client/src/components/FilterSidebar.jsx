// src/components/FilterSidebar.js

import React, { useState } from "react";

// Define the available categories and source types


const SOURCES = [
  { value: "journal", label: "Journal Articles" },
  { value: "osdr", label: "OSDR (Raw Data)" },
];

const FilterSidebar = ({ filters, onFilterChange, onSearchSubmit }) => {
  // Local state for the search input field
  const [localSearchTerm, setLocalSearchTerm] = useState("");

  // --- HANDLERS ---

  // Handle changes to the text input (search bar)
  const handleSearchChange = (e) => {
    setLocalSearchTerm(e.target.value);
  };

  // Handle form submission (when the user hits Enter or clicks the search icon)
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearchSubmit(localSearchTerm.trim());
  };

  // Handle checkbox/category changes
 /*  const handleCategoryChange = (category) => {
    const currentCategories = filters.categories;
    let newCategories;

    if (currentCategories.includes(category)) {
      // Remove category
      newCategories = currentCategories.filter((c) => c !== category);
    } else {
      // Add category
      newCategories = [...currentCategories, category];
    }

    onFilterChange({ categories: newCategories });
  }; */

  // Handle radio button/source changes
  const handleSourceChange = (e) => {
    onFilterChange({ source: e.target.value });
  };

  // Handle year range changes (assuming simple inputs for now)
 /*  const handleYearChange = (e) => {
    const { name, value } = e.target;
    // Use parseInt to ensure the value is a number, not a string
    onFilterChange({ [name]: parseInt(value) });
  }; */

  return (
    <div className="space-y-6">
  {/* 1. Search Bar (The most prominent feature) */}
  <form
    onSubmit={handleSearchSubmit}
    // 💡 CSS Change: Dark mode border
    className="pb-4 border-b border-gray-200 dark:border-gray-700"
  >
    <label
      htmlFor="search-input"
      // 💡 CSS Change: Dark mode text for label
      className="block text-sm font-semibold text-gray-700 mb-2 dark:text-gray-300"
    >
      Search Documents
    </label>
    <div className="flex">
      <input
        id="search-input"
        type="search"
        value={localSearchTerm}
        onChange={handleSearchChange}
        placeholder="e.g., Radiation shielding, life support"
        className="flex-grow p-2 rounded-l-md text-sm 
                   // 💡 CSS Change: Input field styling for light/dark
                   border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 
                   dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
      />
      <button
        type="submit"
        // 💡 CSS Change: Button color scheme update
        className="px-3 bg-indigo-600 text-white rounded-r-md hover:bg-indigo-700 
                   dark:bg-cyan-500 dark:hover:bg-cyan-600 transition duration-150"
        title="Search"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  </form>

  {/* 2. Document Source Filter (Radio Buttons) */}
  <div
    // 💡 CSS Change: Dark mode border
    className="pb-4 border-b border-gray-200 dark:border-gray-700"
  >
    <h3
      // 💡 CSS Change: Dark mode text for header
      className="text-md font-semibold text-gray-800 mb-3 uppercase tracking-wider dark:text-gray-200"
    >
      Source Type
    </h3>
    <div className="space-y-2">
      {SOURCES.map((source) => (
        <div key={source.value} className="flex items-center">
          <input
            id={`source-${source.value}`}
            name="source"
            type="radio"
            value={source.value}
            checked={filters.source === source.value}
            onChange={handleSourceChange}
            // 💡 CSS Change: Radio button styling
            className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500 
                       dark:bg-gray-700 dark:border-gray-600 dark:checked:bg-cyan-500 dark:focus:ring-cyan-500"
          />
          <label
            htmlFor={`source-${source.value}`}
            // 💡 CSS Change: Dark mode text for label
            className="ml-2 block text-sm text-gray-700 cursor-pointer dark:text-gray-300"
          >
            {source.label}
          </label>
        </div>
      ))}
    </div>
  </div>

  {/* 3. Subject Categories (Checkboxes) - Commented out but updated */}
  {/* <div className="pb-4 border-b border-gray-200 dark:border-gray-700">
    <h3 className="text-md font-semibold text-gray-800 mb-3 uppercase tracking-wider dark:text-gray-200">
      Subject Categories
    </h3>
    <div className="space-y-2">
      {CATEGORIES.map((category) => (
        <div key={category} className="flex items-center">
          <input
            id={`category-${category}`}
            name="category"
            type="checkbox"
            checked={filters.categories.includes(category)}
            onChange={() => handleCategoryChange(category)}
            // 💡 CSS Change: Checkbox styling
            className="h-4 w-4 rounded text-indigo-600 border-gray-300 focus:ring-indigo-500 
                       dark:bg-gray-700 dark:border-gray-600 dark:checked:bg-cyan-500 dark:focus:ring-cyan-500"
          />
          <label
            htmlFor={`category-${category}`}
            className="ml-2 block text-sm text-gray-700 cursor-pointer dark:text-gray-300"
          >
            {category}
          </label>
        </div>
      ))}
    </div>
  </div> */}

  {/* 4. Publication Year Range Filter (Simple Inputs) - Commented out but updated */}
  {/* <div>
    <h3 className="text-md font-semibold text-gray-800 mb-3 uppercase tracking-wider dark:text-gray-200">
      Publication Year
    </h3>
    <div className="flex justify-between space-x-3">
      <div className="w-1/2">
        <label
          htmlFor="year-start"
          className="block text-xs font-medium text-gray-500 dark:text-gray-400"
        >
          From
        </label>
        <input
          id="year-start"
          name="yearStart"
          type="number"
          value={filters.yearStart}
          onChange={handleYearChange}
          min="1950"
          max={new Date().getFullYear()}
          className="w-full p-2 rounded-md text-sm mt-1 
                     // 💡 CSS Change: Input field styling for light/dark
                     border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500
                     dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>
      <div className="w-1/2">
        <label
          htmlFor="year-end"
          className="block text-xs font-medium text-gray-500 dark:text-gray-400"
        >
          To
        </label>
        <input
          id="year-end"
          name="yearEnd"
          type="number"
          value={filters.yearEnd}
          onChange={handleYearChange}
          min="1950"
          max={new Date().getFullYear()}
          className="w-full p-2 rounded-md text-sm mt-1 
                     // 💡 CSS Change: Input field styling for light/dark
                     border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500
                     dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>
    </div>
  </div> */}
</div>
  );
};

export default FilterSidebar;
