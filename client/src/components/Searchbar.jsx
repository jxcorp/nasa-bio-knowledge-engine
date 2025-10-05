// components/Searchbar.jsx
import React from 'react';
import { Search, Sparkles } from 'lucide-react';
// NOTE: Assuming this context hook is available
import { useTheme } from '../contexts/Themecontext'; 

// Props: query (read), setQuery (write), onSearch (submit handler)
const SearchBar = ({ query, setQuery, onSearch }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch && query.trim()) {
      // Call the parent's submit handler with the cleaned query
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-4xl mx-auto mt-12 mb-16">
      <div className={`relative flex items-center p-1 rounded-full transition-all duration-500 shadow-2xl ${
        isDark 
          ? 'bg-slate-800/80 ring-2 ring-cyan-500/50 shadow-cyan-900/40' 
          : 'bg-white/90 ring-2 ring-purple-300/80 shadow-purple-300/40'
      } backdrop-blur-lg group`}>
        
        {/* Input Field */}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for genes, datasets, or journal articles (e.g., 'Rad51 and microgravity')"
          className={`flex-grow h-14 px-6 text-lg bg-transparent focus:outline-none transition-colors duration-300 ${
            isDark 
              ? 'placeholder-slate-500 text-white' 
              : 'placeholder-slate-500 text-slate-900'
          }`}
          aria-label="Search space biology database"
        />

        {/* AI Hint Icon (for empty state) */}
        <div className={`absolute left-3 transition-opacity duration-500 pointer-events-none ${
          query ? 'opacity-0' : 'opacity-100 group-hover:opacity-0'
        }`}>
          <Sparkles className={`w-6 h-6 animate-pulse ${
            isDark ? 'text-purple-400' : 'text-purple-600'
          }`} />
        </div>

        {/* Search Button (Submit) */}
        <button
          type="submit"
          className={`flex items-center gap-2 h-12 px-7 rounded-full font-bold text-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${
            isDark 
              ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:shadow-lg hover:shadow-cyan-500/30' 
              : 'bg-gradient-to-r from-cyan-600 to-purple-700 text-white hover:shadow-lg hover:shadow-purple-400/50'
          }`}
          aria-label="Execute search"
        >
          <Search className="w-5 h-5" />
          <span className="hidden sm:inline">Search</span>
        </button>
      </div>
    </form>
  );
};

export default SearchBar;