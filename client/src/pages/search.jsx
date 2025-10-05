// App.jsx (Corrected for Manual Button Submit)
import React, { useState, useEffect, useCallback } from 'react';
import SidebarFilter from '../components/SideFilter';
import SearchBar from '../components/Searchbar';
import ResultsList from '../components/Result';
import Header from '../components/Header';
import Footer from '../components/Footer';
// *** CHANGE 1: Import useSearchParams instead of useParams ***
import { useSearchParams } from 'react-router-dom'; 

const BACKEND_URL = 'https://bio-knowledge-engine.onrender.com/datasets/search'; 


function SearchPage() {
    // *** CHANGE 2: Use useSearchParams to get the query parameter 'q' ***
    const [searchParams] = useSearchParams();
    const q = searchParams.get('q'); // This will get 'human' from ?q=human
    
    // searchTerm holds the text currently in the input field (live update)
    const [searchTerm, setSearchTerm] = useState('');
    // activeQuery holds the term submitted by the button press (triggers API call)
    const [activeQuery, setActiveQuery] = useState(''); 
    
    const [filters, setFilters] = useState({ 
        organism: '', 
        factor: '', 
        assayType: '' 
    });
    const [results, setResults] = useState([]);
    const [totalResults, setTotalResults] = useState(0); // To show total count
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // **********************************************
    // NEW EFFECT: Initial Load from URL Query Parameter (q)
    // **********************************************
    useEffect(() => {
        // Check if a 'q' query parameter exists and activeQuery hasn't been set yet
        if (q && q.trim() !== '' && activeQuery === '') {
            // Set both the input field and the query that triggers the search
            setSearchTerm(q);
            setActiveQuery(q);
        }
    }, [q, activeQuery]); // Depend on 'q' to run on mount, and activeQuery to run only once

    // Function to build the URL parameters based on the active query and filters
    const buildQueryString = (q, f) => {
        const params = new URLSearchParams();
        if (!q) return ''; // Must have a search query

        // Map frontend 'q' to backend 'term' for the proxy to forward to OSDR
        params.append('term', q); 
        
        // Append filters only if they have a truthy value
        if (f.organism) params.append('organism', f.organism);
        if (f.factor) params.append('factor', f.factor);
        if (f.assayType) params.append('assayType', f.assayType);
        
        params.append('size',100)
        params.append("type",'cgene')
        
        return params.toString();
    };

    const runSearch = useCallback(async (q, f) => {
        const queryString = buildQueryString(q, f);
        if (!queryString) return setResults([]);

        setIsLoading(true);
        setError(null);
        
        const url = `${BACKEND_URL}?${queryString}`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.details || 'Search failed on the backend.');
            }
            const data = await response.json();
            
            // Expected response structure from your final backend: { results: [], total: N }
            setResults(data.results || []);
            setTotalResults(data.total || 0);

        } catch (err) {
            setError(err.message);
            setResults([]);
            setTotalResults(0);
        } finally {
            setIsLoading(false);
        }
    }, [BACKEND_URL]);

    // 1. EFFECT: Triggers the search whenever the activeQuery or filters change.
    useEffect(() => {
        // Only run if a query exists
        if (activeQuery) {
            // Slight debounce is fine, even for initial load, to prevent race conditions.
            const handler = setTimeout(() => {
                runSearch(activeQuery, filters);
            }, 50); 
            
            return () => clearTimeout(handler);
        }
    }, [activeQuery, filters, runSearch]);

    // 2. HANDLER: Triggered by the SearchBar button click
    const handleSearchBarSubmit = (query) => {
        // 1. Update the input field state (q)
        setSearchTerm(query);
        // 2. Update the active/submitted query state (triggers the useEffect)
        setActiveQuery(query);
    };

    // 3. HANDLER: Triggered by the SidebarFilter selection
    const handleFilterChange = (key, value) => {
        setFilters(prev => ({
            ...prev,
            [key]: value
        }));
        // The useEffect hook handles re-running the search using the current activeQuery
    };

    return (
        <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
            {/* 1. HEADER */}
            <Header />

            {/* 2. MAIN CONTENT AREA (Sidebar + Results) */}
            <main className="flex flex-1">
                {/* Sidebar Filter Component */}
                <SidebarFilter 
                    filters={filters} 
                    onFilterChange={handleFilterChange} 
                />
                
                {/* Results Container */}
                <div className="flex-1 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
                    {/* Search Bar Component */}
                    <SearchBar 
                        query={searchTerm} 
                        setQuery={setSearchTerm} 
                        onSearch={handleSearchBarSubmit}
                    />
                    
                    {/* Results Header and List */}
                    <div className="mt-8">
                        <h2 className="text-2xl font-semibold mb-6">
                            {isLoading 
                                ? "Searching..." 
                                : totalResults > 0 
                                    ? `Showing results for "${activeQuery}" (${totalResults.toLocaleString()} Datasets) Best 100 Results`
                                    : activeQuery ? `No results found for "${activeQuery}"` : "Start by searching the repository."
                            }
                        </h2>
                        <ResultsList 
                            results={results} 
                            isLoading={isLoading} 
                            error={error}
                        />
                    </div>
                </div>
            </main>
            
            {/* 3. FOOTER */}
            <Footer />
        </div>
    );
}
export default SearchPage;