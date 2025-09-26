/**
 * SearchFilters provides a simple search input to filter sweets by name.
 *
 * @param {Object} props
 * @param {(query: string) => void} props.onSearch - Triggered with the query string.
 */
import React, { useState } from 'react';

const SearchFilters = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Propagate the current search term to parent
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg mb-8 fade-in">
      <form onSubmit={handleSubmit} className="relative flex gap-3">
        <div className="relative flex-grow">
          <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search sweets by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-light focus:ring-4 focus:ring-primary-light focus:ring-opacity-20 transition-all duration-300 text-gray-700 placeholder-gray-400"
          />
        </div>
        <button
          type="submit"
          className="px-6 py-4 bg-gradient-to-r from-primary-light to-primary-dark text-white rounded-xl hover:from-primary-dark hover:to-primary-light transition-all duration-300 transform hover:scale-105 hover:shadow-lg font-semibold flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchFilters;