import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
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
export const selectFavoriteListId = () => createSelector(selectMoviesState, (state) => state);
