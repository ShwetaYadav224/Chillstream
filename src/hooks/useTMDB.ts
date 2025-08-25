import { useState, useEffect, useCallback, useRef } from 'react';
import type { ApiResponse } from '../types';

export const useTMDB = <T>(fetchFunction: () => Promise<T>): ApiResponse<T> => {
  const [data, setData] = useState<T>();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(true);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(undefined);
        const result = await fetchFunction();
        
        if (isMountedRef.current) {
          setData(result);
        }
      } catch (err) {
        if (isMountedRef.current) {
          setError(err instanceof Error ? err.message : 'An error occurred');
        }
      } finally {
        if (isMountedRef.current) {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [fetchFunction]);

  return { data, error, loading };
};

export const usePopularMovies = (page: number = 1) => {
  const fetchFunction = useCallback(() => getPopularMovies(page), [page]);
  return useTMDB(fetchFunction);
};

export const useTopRatedMovies = (page: number = 1) => {
  const fetchFunction = useCallback(() => getTopRatedMovies(page), [page]);
  return useTMDB(fetchFunction);
};

export const useNowPlayingMovies = (page: number = 1) => {
  const fetchFunction = useCallback(() => getNowPlayingMovies(page), [page]);
  return useTMDB(fetchFunction);
};

export const useUpcomingMovies = (page: number = 1) => {
  const fetchFunction = useCallback(() => getUpcomingMovies(page), [page]);
  return useTMDB(fetchFunction);
};

export const useTrendingMovies = (page: number = 1) => {
  const fetchFunction = useCallback(() => getTrendingMovies(page), [page]);
  return useTMDB(fetchFunction);
};

export const useMovieDetails = (id: number) => {
  const fetchFunction = useCallback(() => getMovieDetails(id), [id]);
  return useTMDB(fetchFunction);
};

export const usePopularTVShows = (page: number = 1) => {
  const fetchFunction = useCallback(() => getPopularTVShows(page), [page]);
  return useTMDB(fetchFunction);
};

export const useTopRatedTVShows = (page: number = 1) => {
  const fetchFunction = useCallback(() => getTopRatedTVShows(page), [page]);
  return useTMDB(fetchFunction);
};

export const useOnAirTVShows = (page: number = 1) => {
  const fetchFunction = useCallback(() => getOnAirTVShows(page), [page]);
  return useTMDB(fetchFunction);
};

export const useTVShowDetails = (id: number) => {
  const fetchFunction = useCallback(() => getTVShowDetails(id), [id]);
  return useTMDB(fetchFunction);
};

export const useSearchMulti = (query: string, page: number = 1) => {
  const fetchFunction = useCallback(() => searchMulti(query, page), [query, page]);
  return useTMDB(fetchFunction);
};

export const useSearchMovies = (query: string, page: number = 1) => {
  const fetchFunction = useCallback(() => searchMovies(query, page), [query, page]);
  return useTMDB(fetchFunction);
};

export const useSearchTVShows = (query: string, page: number = 1) => {
  const fetchFunction = useCallback(() => searchTVShows(query, page), [query, page]);
  return useTMDB(fetchFunction);
};

// Import API functions
import {
  getPopularMovies,
  getTopRatedMovies,
  getNowPlayingMovies,
  getUpcomingMovies,
  getTrendingMovies,
  getMovieDetails,
  getPopularTVShows,
  getTopRatedTVShows,
  getOnAirTVShows,
  getTVShowDetails,
  searchMulti,
  searchMovies,
  searchTVShows,
} from '../utils/api';