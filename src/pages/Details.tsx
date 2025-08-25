import React from 'react';
import { useMovieDetails, useTVShowDetails } from '../hooks/useTMDB';
import { useNavigate } from 'react-router-dom';
import type { MovieDetails, TVShowDetails } from '../types';
import { getBackdropUrl, getPosterUrl, getImageUrl } from '../utils/api';

interface DetailsProps {
  type: 'movie' | 'tv';
  id: number;
  onBack: () => void;
}

const Details: React.FC<DetailsProps> = ({ type, id, onBack }) => {
  const navigate = useNavigate();
  const movieDetails = useMovieDetails(type === 'movie' ? id : 0);
  const tvShowDetails = useTVShowDetails(type === 'tv' ? id : 0);

  const { data, loading, error } = type === 'movie' ? movieDetails : tvShowDetails;
  const details = data as MovieDetails | TVShowDetails;

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

  if (!details) {
    return (
      <div className="min-h-screen bg-netflix-black pt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-white text-center">Content not found</div>
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

  const title = 'title' in details ? details.title : details.name;
  const releaseDate = 'release_date' in details ? details.release_date : details.first_air_date;
  const runtime = 'runtime' in details ? details.runtime : details.episode_run_time?.[0];

  const trailer = details.videos?.results?.find(
    (video) => video.type === 'Trailer' && video.site === 'YouTube'
  );

  return (
    <div className="min-h-screen bg-netflix-black">
      {/* Backdrop Image */}
      <div className="relative h-96">
        <img
          src={getBackdropUrl(details.backdrop_path)}
          alt={title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = 'https://via.placeholder.com/1280x720/1a1a1a/ffffff?text=No+Image';
          }}
        />
        <div className="absolute inset-0 bg-black/60"></div>
        
        {/* Back Button */}
        <button
          onClick={onBack}
          className="absolute top-20 left-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors z-40"
        >
          ← Back
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-32 relative z-10">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster */}
          <div className="flex-shrink-0">
            <img
              src={getPosterUrl(details.poster_path)}
              alt={title}
              className="w-64 h-96 object-cover rounded-lg shadow-xl"
              onError={(e) => {
                e.currentTarget.src = 'https://via.placeholder.com/300x450/1a1a1a/ffffff?text=No+Image';
              }}
            />
          </div>

          {/* Details */}
          <div className="flex-1 text-white">
            <h1 className="text-4xl font-bold mb-4">{title}</h1>
            
            <div className="flex items-center gap-4 mb-6 text-sm">
              <span>⭐ {details.vote_average.toFixed(1)}</span>
              <span>{releaseDate ? new Date(releaseDate).getFullYear() : 'N/A'}</span>
              {runtime && <span>{runtime} min</span>}
              {'adult' in details && <span>{details.adult ? '18+' : 'PG'}</span>}
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {details.genres?.map((genre) => (
                <span
                  key={genre.id}
                  className="bg-netflix-red px-3 py-1 rounded-full text-sm"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            <p className="text-gray-300 mb-6 leading-relaxed">{details.overview}</p>

            {details.tagline && (
              <p className="text-gray-400 italic mb-6">"{details.tagline}"</p>
            )}

            {/* Cast */}
            {details.credits?.cast?.slice(0, 6).length > 0 && (
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-3">Cast</h3>
                <div className="flex gap-4 overflow-x-auto">
                  {details.credits.cast.slice(0, 6).map((person) => (
                    <div key={person.id} className="flex-shrink-0 w-20 text-center">
                      <img
                        src={getImageUrl(person.profile_path, 'w185')}
                        alt={person.name}
                        className="w-20 h-20 object-cover rounded-full mb-2"
                        onError={(e) => {
                          e.currentTarget.src = 'https://via.placeholder.com/80x80/333/fff?text=👤';
                        }}
                      />
                      <p className="text-sm font-medium truncate">{person.name}</p>
                      <p className="text-xs text-gray-400 truncate">{person.character}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Play Button */}
            <button
              onClick={() => navigate(`/watch/${type}/${id}`)}
              className="bg-netflix-red text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2 mb-4"
            >
              <span>▶</span>
              Watch Now
            </button>

            {/* Trailer Button */}
            {trailer && (
              <button
                onClick={() => window.open(`https://www.youtube.com/watch?v=${trailer.key}`, '_blank')}
                className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
              >
                <span>🎬</span>
                Watch Trailer
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;