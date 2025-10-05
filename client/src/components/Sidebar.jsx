// src/components/FilterSidebar.js

import React, { useState } from 'react';

const SUBJECT_CATEGORIES = [
    'Life Sciences (General)',
    'Space Physiology',
    'Radiation Effects',
    'Plant Biology',
    'Microbiology',
    'Instrumentation'
    // This list will be expanded using the NASA STI Guide
];

const FilterSidebar = ({ filters, onFilterChange, onSearchSubmit }) => {
    const [localSearch, setLocalSearch] = useState('');

    const handleCategoryChange = (category) => {
        const currentCategories = filters.categories;
        if (currentCategories.includes(category)) {
            onFilterChange({ categories: currentCategories.filter(c => c !== category) });
        } else {
            onFilterChange({ categories: [...currentCategories, category] });
        }
    };

    const handleSearchClick = (e) => {
        e.preventDefault();
        onSearchSubmit(localSearch);
    };

    return (
        <div className="bg-white p-4 shadow-lg rounded-lg sticky top-4">
            <h2 className="text-xl font-bold mb-4 text-nasa-blue">Search & Filter</h2>
            
            {/* SEARCH BOX */}
            <form onSubmit={handleSearchClick} className="mb-6">
                <input
                    type="text"
                    placeholder="Search titles, authors, keywords..."
                    value={localSearch}
                    onChange={(e) => setLocalSearch(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
                <button type="submit" className="mt-2 w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700">
                    Search
                </button>
            </form>

            {/* SUBJECT CATEGORIES FILTER */}
            <div className="mb-6">
                <h3 className="font-semibold mb-2">Subject Categories</h3>
                {SUBJECT_CATEGORIES.map(category => (
                    <div key={category} className="flex items-center mb-1">
                        <input
                            type="checkbox"
                            id={category}
                            checked={filters.categories.includes(category)}
                            onChange={() => handleCategoryChange(category)}
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                        />
                        <label htmlFor={category} className="ml-2 text-sm text-gray-700">{category}</label>
                    </div>
                ))}
            </div>

            {/* PUBLICATION YEAR FILTER (Simplified) */}
            <div className="mb-6">
                <h3 className="font-semibold mb-2">Publication Year</h3>
                {/* Input fields/slider for year range */}
                <input 
                    type="number" 
                    placeholder="Min Year" 
                    value={filters.yearStart} 
                    onChange={(e) => onFilterChange({ yearStart: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md"
                />
            </div>
            
            {/* SOURCE FILTER */}
            <div className="mb-6">
                <h3 className="font-semibold mb-2">Data Source</h3>
                {['all', 'STI Repository', 'OSDR/GeneLab'].map(source => (
                    <div key={source} className="flex items-center mb-1">
                        <input
                            type="radio"
                            id={source}
                            name="source"
                            checked={filters.source === source}
                            onChange={() => onFilterChange({ source: source })}
                            className="h-4 w-4 text-blue-600 border-gray-300"
                        />
                        <label htmlFor={source} className="ml-2 text-sm text-gray-700 capitalize">{source}</label>
                    </div>
                ))}
            </div>

            <button 
                onClick={() => onFilterChange({ categories: [], yearStart: 2000, source: 'all' })}
                className="w-full text-sm text-red-600 mt-4 p-2 border border-red-300 rounded-md hover:bg-red-50"
            >
                Clear All Filters
            </button>
        </div>
    );
};

export default FilterSidebar;