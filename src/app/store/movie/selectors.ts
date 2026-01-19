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
  (state) => state.isAuthenticated
);

export const selectUserName = createSelector(selectMoviesState, (state) => state.authUserName);
export const selectSearchListMovies = createSelector(
  selectMoviesState,
  (state) => state.searchListMovies
);

export const selectSelectedMovie = createSelector(
  selectMoviesState,
  (state) => state.selectedMovie
);

export const selectGenres = createSelector(selectMoviesState, (state) => state.genres);

//=================================\

export const selectFilterSettings = createSelector(
  selectMoviesState,
  (state) => state.filterSettings
);

//  filterSettings: {
//     adult: false,
//     rated: false,
//     genre: null,
//     year: null,
//   },

// adult
// false
// genre_ids
// (3) [28, 9648, 18]
// release_date
// "2025-04-30"
// vote_average
// 6.5
