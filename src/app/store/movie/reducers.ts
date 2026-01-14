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
  }))
);
