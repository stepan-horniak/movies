import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  AuthState,
  categoryToStateKey,
  Movie,
  MovieCategory,
  MoviesState,
} from '../../models/movie.model/movie.model';

export const selectMoviesState = createFeatureSelector<MoviesState>('movies');

export const selectMoviesByCategory = (category: MovieCategory) =>
  createSelector(selectMoviesState, (state): Movie[] | undefined => {
    return state[categoryToStateKey[category]];
  });

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectIsUserLogged = createSelector(selectAuthState, (state) => state.isAuthenticated);
