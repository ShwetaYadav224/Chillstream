import React from 'react';
import { Link } from 'react-router-dom';
import type { Movie, TVShow } from '../types';
import { getBackdropUrl, getPosterUrl } from '../utils/api';

interface HeroBannerProps {
  featuredItem: Movie | TVShow;
  onWatchNow: () => void;
  onMoreInfo: () => void;
}

const HeroBanner: React.FC<HeroBannerProps> = ({ featuredItem, onWatchNow, onMoreInfo }) => {
  const title = 'title' in featuredItem ? featuredItem.title : featuredItem.name;
  const overview = featuredItem.overview;
  const backdropUrl = getBackdropUrl(featuredItem.backdrop_path, 'w1280');
  const posterUrl = getPosterUrl(featuredItem.poster_path, 'w500');

  return (
    <div className="relative h-[70vh] md:h-[80vh] lg:h-[90vh] w-full overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0">
        <img
          src={backdropUrl}
          alt={title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = 'https://via.placeholder.com/1280x720/1a1a1a/ffffff?text=No+Image';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-2xl">
            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              {title}
            </h1>

            {/* Overview */}
            <p className="text-gray-200 text-lg md:text-xl mb-6 line-clamp-3">
              {overview}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onWatchNow}
                className="bg-netflix-red text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-red-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
              >
                <span className="mr-2">▶</span>
                Watch Now
              </button>
              <button
                onClick={onMoreInfo}
                className="bg-gray-600/70 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-600 transition-all duration-300 border border-gray-400/30"
              >
                More Info
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </div>
  );
};

export default HeroBanner;