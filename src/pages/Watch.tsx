import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Watch: React.FC = () => {
  const { type, id } = useParams<{ type: string; id: string }>();
  const navigate = useNavigate();

  const getVideoSrc = () => {
    if (type === 'movie') {
      return `https://vidsrc.xyz/embed/movie?tmdb=${id}&autoplay=1`;
    } else if (type === 'tv') {
      // For TV shows, we'll use the first season and first episode by default
      return `https://vidsrc.xyz/embed/tv?tmdb=${id}&season=1&episode=1&autoplay=1`;
    }
    return '';
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header with back button */}
      <div className="fixed top-0 left-0 right-0 bg-black/80 z-50 p-4">
        <button
          onClick={handleBack}
          className="bg-netflix-red text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
        >
          ← Back to Details
        </button>
      </div>

      {/* Video Player */}
      <div className="pt-16 h-screen">
        <iframe
          src={getVideoSrc()}
          className="w-full h-full border-0"
          allowFullScreen
          allow="autoplay; encrypted-media"
          title="Video Player"
        />
      </div>
    </div>
  );
};

export default Watch;