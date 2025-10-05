// src/SpaceBiologyEngine.js (Integrated Engine with Load More Logic)

import React, { useState, useEffect, useCallback } from "react";
import * as dsv from "d3-dsv";
import FilterSidebar from "../components/FilterSidebar";
import Header from "../components/Header";
import ResultsList from "../components/Searchresults";
import { fetchOSDRData } from "../components/osdrdata"; // Import OSDR fetcher

// 1. Import all static data sources
import journalDataCSV from "../data/journals.csv";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/Themecontext";
import { Search } from "lucide-react";

const RESULTS_PER_PAGE = 10; // Define increment constant

const SpaceBiologyEngine = () => {
  const { theme } = useTheme();
const isDark = theme === "dark";

  const [allData, setAllData] = useState([]);
  const navigate = useNavigate();
  const [localSearchTerm, setLocalSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const [results, setResults] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  const [itemsToDisplay, setItemsToDisplay] = useState(RESULTS_PER_PAGE);
  const handleMainSearchSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    if (localSearchTerm.trim()) {
      // Use navigate to redirect to the /search route with the query parameter
      navigate(`/search?q=${encodeURIComponent(localSearchTerm.trim())}`);
    }
  };
  const [filters, setFilters] = useState({
    categories: [],
    yearStart: 2000,
    yearEnd: new Date().getFullYear(),
    source: "journal",
  });

  const [isLoading, setIsLoading] = useState(true);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    const loadAllData = async () => {
      setIsLoading(true);
      let journalData = [];
      let osdrData = [];

      // A. Load Journal Data
      try {
        const response = await fetch(journalDataCSV);
        const csvText = await response.text();
        journalData = dsv.csvParse(csvText, (d, i) => {
          return {
            id: `journal-${i}`,
            authors: [],
            startdate: "",
            enddate: "",
            publicationDate: "",
            title: d.Title || "N/A Title",
            documentLink: d.Link || "#",
            sourceType: "Journal",
          };
        });
      } catch (error) {
        console.error("Failed to load or parse journal CSV data:", error);
      }

      // B. Load OSDR Data
      try {
        osdrData = await fetchOSDRData();
      } catch (error) {
        console.error("Failed to fetch OSDR data:", error);
      }

      // C. Merge and Store
      const mergedData = [...journalData, ...osdrData];
      console.log(mergedData);
      setAllData(mergedData);
      setIsLoading(false);
    };

    loadAllData();
  }, []);

  // --- 2. Filter/Search Logic (Updates filteredData) ---
  useEffect(() => {
    const applyFiltersAndSearch = setTimeout(() => {
      if (isLoading && allData.length === 0) {
        return;
      }

      let currentFiltered = allData;

      // 1. SOURCE FILTER
      if (filters.source !== "all") {
        currentFiltered = currentFiltered.filter(
          (item) =>
            item.sourceType &&
            item.sourceType.toLowerCase() === filters.source.toLowerCase()
        );
      }

      // 2. TEXT SEARCH - ONLY SEARCHING ON 'title'
      if (searchTerm) {
        const lowerSearchTerm = searchTerm.toLowerCase();
        currentFiltered = currentFiltered.filter((item) =>
          item.title.toLowerCase().includes(lowerSearchTerm)
        );
      }

      // 3. Update Total Results (FIX: Removed the problematic resetDisplayState call)
      setTotalResults(currentFiltered.length);

      // 4. Update the filtered data
      setFilteredData(currentFiltered);
    }, 300);

    return () => clearTimeout(applyFiltersAndSearch);
    // Dependencies are now correct for re-filtering when new data arrives (allData)
  }, [searchTerm, filters, allData, isLoading]);

  // --- 3. Slicing Logic (Updates results based on itemsToDisplay) ---
  useEffect(() => {
    // Slice the filtered data based on the current itemsToDisplay count
    // This is the core "Load More" mechanism
    const slicedResults = filteredData.slice(0, itemsToDisplay);

    setResults(slicedResults);
  }, [filteredData, itemsToDisplay]);

  // --- HANDLER FIXES: Implement reset logic here ---

  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    // 💡 FIX 1: Reset the display count whenever the filters change
    setItemsToDisplay(RESULTS_PER_PAGE);
  };

  // 💡 FIX 2: Wrapper function for search term to include display reset
  const handleSearchTermChange = (term) => {
    setSearchTerm(term);
    setItemsToDisplay(RESULTS_PER_PAGE);
  };

  const handleLoadMoreAction = useCallback(async () => {
    const isOSDRMode = filters.source.toLowerCase() === "osdr";

    if (isOSDRMode) {
      // --- 1. SERVER-SIDE FETCHING (OSDR MODE) ---
      console.log("LOAD MORE: Fetching next batch from OSDR API...");

      const osdrItemsInAllData = allData.filter(
        (item) => item.sourceType.toLowerCase() === "osdr"
      ).length;
      const offset = osdrItemsInAllData;
      const limit = RESULTS_PER_PAGE;

      setIsLoading(true);

      try {
        const newOSDRData = await fetchOSDRData(offset, limit);

        if (newOSDRData.length > 0) {
          // 💡 FIX 3a (Data Consistency): Ensure the new data is correctly formatted
          const validatedNewOSDRData = newOSDRData.map((item) => ({
            ...item,
            sourceType: item.sourceType || "OSDR",
          }));

          // 💡 FIX 3b (Reliable State Update): Use functional update for setAllData
          setAllData((prevAllData) => [
            ...prevAllData,
            ...validatedNewOSDRData,
          ]);

          // Increment display count, which is now safe from being reset by useEffect (2)
          setItemsToDisplay((prevCount) => prevCount + RESULTS_PER_PAGE);
        } else {
          console.log("LOAD MORE: No new data returned from OSDR.");
        }
      } catch (error) {
        console.error("Failed to fetch more OSDR data:", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      // --- 2. CLIENT-SIDE SLICING (JOURNAL / ALL MODE) ---
      console.log("LOAD MORE: Incrementing client-side slice count...");
      setItemsToDisplay((prevCount) => prevCount + RESULTS_PER_PAGE);
    }

    // Always scroll to provide visual feedback, regardless of the method
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });

    // Dependency list is correct
  }, [allData, filters.source, fetchOSDRData, setIsLoading, setAllData]);

  const showLoadMore = results.length < totalResults;

  return (
    <div
      className="min-h-screen transition-colors duration-500
                    bg-gray-100 text-gray-900 
                    dark:bg-gray-900 dark:text-gray-100"
    >
      {/* 💡 JS Fix: Removed redundant setSearchTerm prop, assuming Header now uses context/its own state */}
      <Header />{" "}
      <form
            onSubmit={handleMainSearchSubmit}
            className="max-w-xl mx-auto m-5"
          >
            <div
              className={`relative flex rounded-sm p-1 shadow-xl transition-all duration-500 ${
                isDark
                  ? "bg-slate-800/80 ring-2 ring-indigo-500/30"
                  : "bg-white ring-2 ring-indigo-300/50"
              }`}
            >
              <input
                type="text"
                placeholder="e.g., human health, mouse bone loss, plant growth"
                value={localSearchTerm}
                onChange={(e) => setLocalSearchTerm(e.target.value)}
                className={`flex-1 px-6 py-2 text-lg rounded-l-full focus:outline-none transition-colors duration-300 ${
                  isDark
                    ? "bg-transparent text-white placeholder-slate-500"
                    : "bg-transparent text-slate-800 placeholder-slate-400"
                }`}
              />
              <button
                type="submit"
                aria-label="Search"
                className={`group w-24 flex items-center justify-center rounded-sm font-bold text-lg transition-all duration-300 hover:scale-105 ${
                  isDark
                    ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:from-cyan-400 hover:to-purple-500"
                    : "bg-gradient-to-r from-cyan-600 to-purple-700 text-white hover:from-cyan-500 hover:to-purple-600"
                }`}
              >
                <Search className="w-6 h-6" />
              </button>
            </div>
          </form>
      <div className="container mx-auto max-w-7xl px-4 md:px-6 py-6 flex flex-col md:flex-row gap-8">
        {/* Left Column: FilterSidebar */}
        
        <div className="w-full md:w-64">
          <div
            className="md:sticky md:top-6 p-4 rounded shadow-lg border 
                          // 💡 CSS Change: Sidebar card styling
                          bg-white border-gray-200 
                          dark:bg-gray-800 dark:border-gray-700 dark:shadow-xl"
          >
            <FilterSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
              onSearchSubmit={handleSearchTermChange}
            />
          </div>
        </div>

        {/* Right Column: Results List */}
        <div
          className="w-full md:flex-1 p-6 rounded shadow-lg border 
                        // 💡 CSS Change: Results card styling
                        bg-white border-gray-200
                        dark:bg-gray-800 dark:border-gray-700 dark:shadow-xl"
        >
          
          <ResultsList
            results={results}
            isLoading={isLoading}
            totalResults={totalResults}
            searchTerm={searchTerm}
            // 🚀 UPDATED PROPS: Pass Load More data instead of pagination data
            showLoadMore={showLoadMore}
            onLoadMore={handleLoadMoreAction}
          />
        </div>
      </div>
      <footer
        className="w-full mt-10 py-4 text-center text-sm border-t 
                          // 💡 CSS Change: Footer border/text classes
                          text-gray-500 border-gray-200 
                          dark:text-gray-400 dark:border-gray-800"
      ></footer>{" "}
    </div>
  );
};

export default SpaceBiologyEngine;
