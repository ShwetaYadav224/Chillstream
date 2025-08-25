import React from 'react';

const MovieCardSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        {/* Image placeholder */}
        <div className="w-full h-48 sm:h-56 md:h-64 bg-gray-700" />
        
        {/* Content placeholder */}
        <div className="p-3">
          <div className="h-4 bg-gray-700 rounded mb-2" />
          <div className="flex justify-between items-center">
            <div className="h-3 bg-gray-700 rounded w-1/4" />
            <div className="h-3 bg-gray-700 rounded w-1/4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCardSkeleton;