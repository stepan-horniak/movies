import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  categoryToStateKey,
  MovieCategory,
  MoviesState,
} from '../../models/movie.model/movie.model';

export const selectMoviesState = createFeatureSelector<MoviesState>('movies');

export const selectMoviesByCategory = (category: MovieCategory) =>
  createSelector(selectMoviesState, (state) => {
    return state.listMovies[categoryToStateKey[category]];
  });

export const selectIsUserLogged = createSelector(
  selectMoviesState,
  (state) => state.isAuthenticated,
);

export const selectUserName = createSelector(selectMoviesState, (state) => state.authUserName);
export const selectSearchListMovies = createSelector(
  selectMoviesState,
  (state) => state.searchListMovies,
);

export const selectSelectedMovie = createSelector(
  selectMoviesState,
  (state) => state.selectedMovie,
);

export const selectGenres = createSelector(selectMoviesState, (state) => state.genres);

//=================================\

export const selectFilterSettings = createSelector(
  selectMoviesState,
  (state) => state.filterSettings,
);

export const selectCountFavoriteMovies = createSelector(
  selectMoviesState,
  (state) => state.favoriteMovieIds?.length || 0,
);

export const selectCountWatchListMovies = createSelector(
  selectMoviesState,
  (state) => state.watchListMovieIds?.length || 0,
);
