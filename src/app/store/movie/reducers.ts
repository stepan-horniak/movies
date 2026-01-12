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

  on(MovieActions.isUserLogged, (state, {}) => ({
    ...state,
    isAuthenticated: !state.isAuthenticated,
  }))
);
