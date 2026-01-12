export interface MovieRequest {
  dates: [];
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface Movie {
  adult: false;
  backdrop_path: string;
  genre_ids: [];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export type MovieCategory = 'now_playing' | 'popular' | 'top_rated' | 'upcoming';

export interface MoviesState {
  listMovies: {
    now_playing: Movie[];
    popular: Movie[];
    top_rated: Movie[];
    upcoming: Movie[];
  };
  isAuthenticated: boolean;
}

export const categoryToStateKey: Record<MovieCategory, keyof MoviesState['listMovies']> = {
  now_playing: 'now_playing',
  popular: 'popular',
  top_rated: 'top_rated',
  upcoming: 'upcoming',
};
