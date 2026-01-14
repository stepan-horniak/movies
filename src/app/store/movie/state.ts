import { Genre, Movie } from '../../models/movie.model/movie.model';

export interface MovieState {
  watchLaterListId: number[];
  favoriteListId: number[];
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
}
export const initialState: MovieState = {
  watchLaterListId: [],
  favoriteListId: [],
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
};
