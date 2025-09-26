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
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          placeholder="Search sweets..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-light"
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-primary-light to-primary-dark text-white px-4 py-2 rounded-md hover:from-primary-dark hover:to-primary-light transition-all"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchFilters;