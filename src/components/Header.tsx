import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  onSearch: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <header className="bg-netflix-black fixed top-0 w-full z-50 px-6 py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-4 md:space-x-8">
          <h1 className="text-netflix-red text-xl md:text-2xl font-bold">Chillstream</h1>
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="text-white hover:text-gray-300 transition-colors">Home</Link>
            <Link to="/" className="text-white hover:text-gray-300 transition-colors">Movies</Link>
            <Link to="/" className="text-white hover:text-gray-300 transition-colors">TV Shows</Link>
          </nav>
        </div>
        
        <form onSubmit={handleSearch} className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-3 py-1 md:px-4 md:py-2 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-netflix-red w-32 md:min-w-64 text-sm md:text-base"
          />
          <button
            type="submit"
            className="bg-netflix-red text-white px-3 py-1 md:px-4 md:py-2 rounded hover:bg-red-600 transition-colors text-sm md:text-base"
          >
            Search
          </button>
        </form>
      </div>
    </header>
  );
};

export default Header;