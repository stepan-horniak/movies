import { createReducer, on } from '@ngrx/store';
import { initialState } from './state';
import * as MovieActions from '../movie/action';

export const MovieReducers = createReducer(
  initialState,
  on(MovieActions.loadMoviesSuccess, (state, { movies, category }) => ({
    ...state,
    listMovies: {
      ...state.listMovies,
      [category]: movies,
    },
  })),

  on(MovieActions.loadUserName, (state, { userName }) => ({
    ...state,
    isAuthenticated: !state.isAuthenticated,
    authUserName: userName,
  })),

  on(MovieActions.searchMovieSuccess, (state, { movies }) => ({
    ...state,
    searchListMovies: movies,
  })),
  on(MovieActions.selectedMovie, (state, { movie }) => ({
    ...state,
    selectedMovie: movie,
  })),
  on(MovieActions.loadGenresMoviesSuccess, (state, { movies }) => ({
    ...state,
    genres: movies,
  })),

  on(MovieActions.addToFavoriteListId, (state, { movieId }) => ({
    ...state,
    favoriteMovieIds: state.favoriteMovieIds?.includes(movieId)
      ? state.favoriteMovieIds
      : [...(state.favoriteMovieIds ?? []), movieId],
  })),
  on(MovieActions.removeToFavoriteListId, (state, { movieId }) => ({
    ...state,
    favoriteMovieIds: state.favoriteMovieIds
      ? state.favoriteMovieIds.filter((id) => id !== movieId)
      : null,
  })),
  on(MovieActions.addToWatchListId, (state, { movieId }) => ({
    ...state,
    watchListMovieIds: state.watchListMovieIds?.includes(movieId)
      ? state.watchListMovieIds
      : [...(state.watchListMovieIds ?? []), movieId],
  })),
  on(MovieActions.removeFromWatchListId, (state, { movieId }) => ({
    ...state,
    watchListMovieIds: state.watchListMovieIds
      ? state.watchListMovieIds.filter((id) => id !== movieId)
      : null,
  })),

  on(MovieActions.filterSettings, (state, { adult, rated, genre, year }) => ({
    ...state,
    filterSettings: {
      adult,
      rated,
      genre,
      year,
    },
  })),
);
