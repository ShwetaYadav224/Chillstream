import React, { useState, useEffect } from 'react';
import HeroBanner from '../components/HeroBanner';
import ContentSection from '../components/ContentSection';
import Footer from '../components/Footer';
import { 
  getPopularMovies, 
  getTopRatedMovies, 
  getNowPlayingMovies, 
  getPopularTVShows,
  getTrendingMovies 
} from '../utils/api';
import { useTrendingMovies, usePopularMovies, useTopRatedMovies, useNowPlayingMovies, usePopularTVShows } from '../hooks/useTMDB';
import type { Movie, TVShow, SearchResult } from '../types';

interface HomeProps {
  onItemClick: (type: 'movie' | 'tv', id: number) => void;
}

const Home: React.FC<HomeProps> = ({ onItemClick }) => {
  const [featuredItem, setFeaturedItem] = useState<Movie | TVShow | null>(null);
  
  // Fetch data for different sections
  const { data: trendingData, loading: trendingLoading } = useTrendingMovies();
  const { data: popularMoviesData, loading: popularMoviesLoading } = usePopularMovies();
  const { data: topRatedData, loading: topRatedLoading } = useTopRatedMovies();
  const { data: nowPlayingData, loading: nowPlayingLoading } = useNowPlayingMovies();
  const { data: popularTVData, loading: popularTVLoading } = usePopularTVShows();

  // Set featured item from trending movies
  useEffect(() => {
    if (trendingData?.results?.length > 0) {
      setFeaturedItem(trendingData.results[0]);
    }
  }, [trendingData]);

  const handleWatchNow = () => {
    if (featuredItem) {
      const type = 'title' in featuredItem ? 'movie' : 'tv';
      onItemClick(type, featuredItem.id);
    }
  };

  const handleMoreInfo = () => {
    if (featuredItem) {
      const type = 'title' in featuredItem ? 'movie' : 'tv';
      onItemClick(type, featuredItem.id);
    }
  };

  if (!featuredItem && !trendingLoading) {
    return (
      <div className="min-h-screen bg-netflix-black pt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center text-gray-400 py-20">
            <p>No content available at the moment.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-netflix-black">
      {/* Hero Banner */}
      {featuredItem && (
        <HeroBanner
          featuredItem={featuredItem}
          onWatchNow={handleWatchNow}
          onMoreInfo={handleMoreInfo}
        />
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Trending Now */}
        <ContentSection
          title="Trending Now"
          items={trendingData?.results || []}
          loading={trendingLoading}
          onItemClick={onItemClick}
        />

        {/* Popular Movies */}
        <ContentSection
          title="Popular Movies"
          items={popularMoviesData?.results || []}
          loading={popularMoviesLoading}
          onItemClick={onItemClick}
        />

        {/* Top Rated */}
        <ContentSection
          title="Top Rated"
          items={topRatedData?.results || []}
          loading={topRatedLoading}
          onItemClick={onItemClick}
        />

        {/* Now Playing */}
        <ContentSection
          title="Now in Theaters"
          items={nowPlayingData?.results || []}
          loading={nowPlayingLoading}
          onItemClick={onItemClick}
        />

        {/* Popular TV Shows */}
        <ContentSection
          title="Popular TV Shows"
          items={popularTVData?.results || []}
          loading={popularTVLoading}
          onItemClick={onItemClick}
        />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;