// components/SidebarFilter.jsx
import React from 'react';
import { Filter } from 'lucide-react'; // Assuming you have lucide-react installed for icons

// Placeholder for Assay Types to complete the structure
const assayTypes = ['RNA Sequencing', 'Proteomic Mass Spectrometry', 'Metabolomic Mass Spectrometry', '16S'];

// Props: filters (read), onFilterChange (write)
const SidebarFilter = ({ filters, onFilterChange }) => {
    
    // Example list of filter options (as provided by the user)
    const organisms = [
        'Homo sapiens',             // Humans
        'Mus musculus',             // Mouse
        'Rattus norvegicus',        // Rat
        'Drosophila melanogaster',  // Fruit fly
        'Caenorhabditis elegans',   // Nematode worm
        'Saccharomyces cerevisiae', // Yeast (Fungus)
        'Escherichia coli',         // E. coli (Bacterium)
        'Arabidopsis thaliana',     // Mouse-ear cress (Plant model)
        'Lactuca sativa',           // Lettuce (Plant food crop)
    ];

    const factors = [
        'Spaceflight',
        'Microgravity Simulation',  // e.g., Hindlimb Unloading, Clinostat
        'Ionizing Radiation',       // e.g., GCR or particle radiation
        'Diet',                     // Nutritional studies
        'Habitat/Environment',      // CO2 levels, temperature, etc.
        'Strain',                   // Genetic background
    ];
    
    const handleChange = (key, value) => {
        onFilterChange(key, value === '' ? '' : value); // Send the filter key and value up
    };

    return (
        <aside 
            // Standard Sidebar Styling with Dark Mode Classes
            className="w-72 p-6 border-r border-gray-200 dark:border-gray-700 
                       bg-gray-50 dark:bg-gray-800 
                       sticky top-0 h-screen overflow-y-auto 
                       transition-colors duration-300 shadow-xl dark:shadow-none"
        >
            {/* Header with Icon */}
            <div className="flex items-center text-xl font-bold mb-6 
                            border-b border-gray-200 dark:border-gray-700 pb-3 
                            text-gray-900 dark:text-gray-100">
                <Filter className="w-5 h-5 mr-2 text-purple-600 dark:text-cyan-400" />
                Filter Search
            </div>
            
            {/* Organism Filter */}
            <div className="mb-6">
                <label className="block text-sm font-medium mb-1 
                                  text-gray-700 dark:text-gray-300">
                    Organism
                </label>
                <select 
                    value={filters.organism} 
                    onChange={(e) => handleChange('organism', e.target.value)}
                    // Select Field Styling with Dark Mode
                    className="w-full p-2 border rounded-lg 
                               bg-white dark:bg-gray-700 
                               border-gray-300 dark:border-gray-600 
                               text-gray-900 dark:text-gray-100 
                               focus:ring-2 focus:ring-purple-500 focus:border-purple-500 
                               transition duration-200 cursor-pointer"
                >
                    <option value="">All Organisms</option>
                    {organisms.map(org => <option key={org} value={org}>{org}</option>)}
                </select>
            </div>

            {/* Factor Filter */}
            <div className="mb-6">
                <label className="block text-sm font-medium mb-1 
                                  text-gray-700 dark:text-gray-300">
                    Factor
                </label>
                <select 
                    value={filters.factor} 
                    onChange={(e) => handleChange('factor', e.target.value)}
                    // Select Field Styling with Dark Mode
                    className="w-full p-2 border rounded-lg 
                               bg-white dark:bg-gray-700 
                               border-gray-300 dark:border-gray-600 
                               text-gray-900 dark:text-gray-100 
                               focus:ring-2 focus:ring-purple-500 focus:border-purple-500 
                               transition duration-200 cursor-pointer"
                >
                    <option value="">All Factors</option>
                    {factors.map(factor => <option key={factor} value={factor}>{factor}</option>)}
                </select>
            </div>
            
            {/* Assay Type Filter (Completed Placeholder) */}
            <div className="mb-6">
                <label className="block text-sm font-medium mb-1 
                                  text-gray-700 dark:text-gray-300">
                    Assay Type
                </label>
                <select 
                    value={filters.assayType} 
                    onChange={(e) => handleChange('assayType', e.target.value)}
                    // Select Field Styling with Dark Mode
                    className="w-full p-2 border rounded-lg 
                               bg-white dark:bg-gray-700 
                               border-gray-300 dark:border-gray-600 
                               text-gray-900 dark:text-gray-100 
                               focus:ring-2 focus:ring-purple-500 focus:border-purple-500 
                               transition duration-200 cursor-pointer"
                >
                    <option value="">All Assay Types</option>
                    {assayTypes.map(type => <option key={type} value={type}>{type}</option>)}
                </select>
            </div>
            
        </aside>
    );
};

export default SidebarFilter;