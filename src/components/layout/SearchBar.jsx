import React from 'react';
import { FaSearch } from 'react-icons/fa';

export default function SearchBar() {
  return (
    <div className="flex items-center w-full max-w-md mx-auto bg-white rounded-full shadow-md px-4 py-2">
      <FaSearch className="text-gray-400 mr-2" />
      <input
        type="text"
        placeholder="Search..."
        className="flex-grow outline-none text-gray-700 bg-transparent placeholder-gray-400"
      />
    </div>
  );
}