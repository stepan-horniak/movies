import { Movie } from '../../models/movie.model/movie.model';

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
};
