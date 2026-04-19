import React from 'react'
import { FaSearch } from 'react-icons/fa'

export default function SearchBar() {
  return (
    <div className='relative group'>
        <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
            <FaSearch className='text-gray-400 group-focus-within:text-[#03349a] transition-colors' size={14} />
        </div>
        <input 
            className='w-full h-11 bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2 
                       text-sm transition-all duration-200
                       focus:bg-white focus:ring-2 focus:ring-[#03349a]/20 focus:border-[#03349a] outline-none' 
            placeholder='Search for products...' 
        />
    </div>
  )
}
