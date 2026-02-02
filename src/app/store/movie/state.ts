import { Genre, Movie } from '../../models/movie.model/movie.model';

export interface MovieState {
  listMovies: {
    now_playing: Movie[] | null;
    popular: Movie[] | null;
    top_rated: Movie[] | null;
    upcoming: Movie[] | null;
  };
  isAuthenticated: boolean;
  authUserName: string | null;
  searchListMovies: Movie[] | null;
  selectedMovie: Movie | null;
  genres: Genre[] | null;
  filterSettings: {
    adult: boolean;
    rated: boolean;
    genre: number | null;
    year: number | null;
  };
  favoriteMovieIds: number[] | null;
  watchListMovieIds: number[] | null;
}
export const initialState: MovieState = {
  listMovies: {
    now_playing: null,
    popular: null,
    top_rated: null,
    upcoming: null,
  },
  isAuthenticated: false,
  authUserName: null,
  searchListMovies: null,
  selectedMovie: null,
  genres: null,
  filterSettings: {
    adult: false,
    rated: false,
    genre: null,
    year: null,
  },
  favoriteMovieIds: null,
  watchListMovieIds: null,
};
