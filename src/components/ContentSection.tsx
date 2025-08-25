import React from 'react';
import MovieCard from './MovieCard';
import MovieCardSkeleton from './MovieCardSkeleton';
import type { Movie, TVShow } from '../types';

interface ContentSectionProps {
  title: string;
  items: Array<Movie | TVShow>;
  loading?: boolean;
  onItemClick: (type: 'movie' | 'tv', id: number) => void;
}

const ContentSection: React.FC<ContentSectionProps> = ({
  title,
  items,
  loading = false,
  onItemClick,
}) => {
  return (
    <section className="mb-12 fade-in">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-white">
          {title}
        </h2>
        <button className="text-netflix-red hover:text-red-400 transition-colors text-sm font-semibold">
          View All →
        </button>
      </div>

      <div className="relative">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
          {loading ? (
            // Show skeleton loaders
            Array.from({ length: 6 }).map((_, index) => (
              <MovieCardSkeleton key={index} />
            ))
          ) : (
            // Show actual content
            items.map((item) => (
              <MovieCard
                key={item.id}
                item={item}
                onClick={() => onItemClick(
                  'title' in item ? 'movie' : 'tv',
                  item.id
                )}
              />
            ))
          )}
        </div>

        {/* Gradient fade on the right for horizontal scrolling indication */}
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-netflix-black to-transparent pointer-events-none" />
      </div>
    </section>
  );
};

export default ContentSection;