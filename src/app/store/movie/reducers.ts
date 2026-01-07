import { createReducer, on } from '@ngrx/store';
import { initialState } from './state';
import * as MovieActions from '../movie/action';

export const MovieReducers = createReducer(
  initialState,
  on(MovieActions.loadMoviesSuccess, (state, { movies, category }) => ({
    ...state,
    [category]: movies,
  })),
  on(MovieActions.setMovieToFavorite, (state, { movieId }) => ({
    ...state,
    favoriteListId: state.favoriteListId.some((el) => el === movieId)
      ? state.favoriteListId
      : [...state.favoriteListId, movieId],
  })),
  on(MovieActions.setMovieToWatchLater, (state, { movieId }) => ({
    ...state,
    watchLaterListId: state.watchLaterListId.some((el) => el === movieId)
      ? state.watchLaterListId
      : [...state.watchLaterListId, movieId],
  }))
);
