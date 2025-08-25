import React from 'react';
import MovieCard from '../components/MovieCard';
import { useSearchMulti } from '../hooks/useTMDB';
import type { Movie, TVShow, SearchResult } from '../types';

interface SearchResultsProps {
  query: string;
  onBack: () => void;
  onItemClick: (type: 'movie' | 'tv', id: number) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ query, onBack, onItemClick }) => {
  const { data, loading, error } = useSearchMulti(query.trim());

  if (loading) {
    return (
      <div className="min-h-screen bg-netflix-black pt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-center items-center h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-netflix-red"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-netflix-black pt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-red-500 text-center">Error: {error}</div>
          <button
            onClick={onBack}
            className="mt-4 bg-netflix-red text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const results = (data as SearchResult)?.results || [];
  const filteredResults = results.filter(
    (item: Movie | TVShow) => item.poster_path && ('title' in item || 'name' in item)
  );

  return (
    <div className="min-h-screen bg-netflix-black pt-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={onBack}
            className="bg-netflix-red text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors mr-4 z-40"
          >
            ← Back
          </button>
          <h2 className="text-2xl font-bold text-white">
            Search Results for: "{query}"
          </h2>
          <span className="ml-4 text-gray-400">
            ({filteredResults.length} results)
          </span>
        </div>

        {/* Results Grid */}
        {filteredResults.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {filteredResults.map((item) => (
              <MovieCard
                key={item.id}
                item={item}
                onClick={() => onItemClick(
                  'title' in item ? 'movie' : 'tv',
                  item.id
                )}
              />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-400 py-12">
            <p className="text-xl mb-4">No results found for "{query}"</p>
            <p>Try different keywords or browse our popular content.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;