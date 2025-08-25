const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export const getImageUrl = (path: string, size: string = 'w500'): string => {
  return `${IMAGE_BASE_URL}/${size}${path}`;
};

export const getBackdropUrl = (path: string, size: string = 'w1280'): string => {
  return `${IMAGE_BASE_URL}/${size}${path}`;
};

export const getPosterUrl = (path: string, size: string = 'w500'): string => {
  return `${IMAGE_BASE_URL}/${size}${path}`;
};

export const fetchFromTMDB = async (endpoint: string, params: Record<string, string> = {}) => {
  const url = new URL(`${BASE_URL}${endpoint}`);
  url.searchParams.append('api_key', API_KEY || '');
  
  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      url.searchParams.append(key, value);
    }
  });

  try {
    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching from TMDB:', error);
    throw error;
  }
};

// Movie endpoints
export const getPopularMovies = async (page: number = 1) => {
  return fetchFromTMDB('/movie/popular', { page: page.toString() });
};

export const getTopRatedMovies = async (page: number = 1) => {
  return fetchFromTMDB('/movie/top_rated', { page: page.toString() });
};

export const getNowPlayingMovies = async (page: number = 1) => {
  return fetchFromTMDB('/movie/now_playing', { page: page.toString() });
};

export const getUpcomingMovies = async (page: number = 1) => {
  return fetchFromTMDB('/movie/upcoming', { page: page.toString() });
};

export const getTrendingMovies = async (page: number = 1) => {
  return fetchFromTMDB('/trending/movie/day', { page: page.toString() });
};

export const getMovieDetails = async (id: number) => {
  return fetchFromTMDB(`/movie/${id}`, { append_to_response: 'videos,credits' });
};

// TV Show endpoints
export const getPopularTVShows = async (page: number = 1) => {
  return fetchFromTMDB('/tv/popular', { page: page.toString() });
};

export const getTopRatedTVShows = async (page: number = 1) => {
  return fetchFromTMDB('/tv/top_rated', { page: page.toString() });
};

export const getOnAirTVShows = async (page: number = 1) => {
  return fetchFromTMDB('/tv/on_the_air', { page: page.toString() });
};

export const getTVShowDetails = async (id: number) => {
  return fetchFromTMDB(`/tv/${id}`, { append_to_response: 'videos,credits' });
};

// Search endpoints
export const searchMulti = async (query: string, page: number = 1) => {
  return fetchFromTMDB('/search/multi', { query, page: page.toString() });
};

export const searchMovies = async (query: string, page: number = 1) => {
  return fetchFromTMDB('/search/movie', { query, page: page.toString() });
};

export const searchTVShows = async (query: string, page: number = 1) => {
  return fetchFromTMDB('/search/tv', { query, page: page.toString() });
};

// Genre endpoints
export const getMovieGenres = async () => {
  return fetchFromTMDB('/genre/movie/list');
};

export const getTVGenres = async () => {
  return fetchFromTMDB('/genre/tv/list');
};