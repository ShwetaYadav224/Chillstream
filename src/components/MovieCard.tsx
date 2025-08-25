import React from 'react';
import type { Movie, TVShow } from '../types';
import { getPosterUrl } from '../utils/api';

interface MovieCardProps {
  item: Movie | TVShow;
  onClick: () => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ item, onClick }) => {
  const title = 'title' in item ? item.title : item.name;
  const releaseDate = 'release_date' in item ? item.release_date : item.first_air_date;
  const rating = item.vote_average;

  return (
    <div
      className="group cursor-pointer transform transition-all duration-500 hover:scale-105 hover:z-10"
      onClick={onClick}
    >
      <div className="relative overflow-hidden rounded-lg shadow-xl">
        {/* Main Image */}
        <img
          src={getPosterUrl(item.poster_path)}
          alt={title}
          className="w-full h-48 sm:h-56 md:h-64 object-cover transition-all duration-500 group-hover:scale-110"
          onError={(e) => {
            e.currentTarget.src = 'https://via.placeholder.com/300x450/1a1a1a/ffffff?text=No+Image';
          }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-3 md:p-4">
          {/* Title and Info */}
          <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <h3 className="font-bold text-white text-sm md:text-base mb-2 line-clamp-2 drop-shadow-lg">
              {title}
            </h3>
            <div className="flex items-center justify-between text-xs text-gray-200">
              <span className="bg-black/50 px-2 py-1 rounded">
                {releaseDate ? new Date(releaseDate).getFullYear() : 'N/A'}
              </span>
              <span className="flex items-center bg-black/50 px-2 py-1 rounded">
                ⭐ {rating.toFixed(1)}
              </span>
            </div>
          </div>
          
          {/* Hover Actions */}
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-3">
            <div className="flex space-x-2">
              <button className="bg-netflix-red text-white p-2 rounded-full hover:bg-red-600 transition-colors">
                <span className="text-sm">▶</span>
              </button>
              <button className="bg-white/20 text-white p-2 rounded-full hover:bg-white/30 transition-colors backdrop-blur-sm">
                <span className="text-sm">+</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Glow Effect */}
        <div className="absolute inset-0 rounded-lg ring-2 ring-netflix-red/0 group-hover:ring-netflix-red/50 transition-all duration-500" />
      </div>
    </div>
  );
};

export default MovieCard;