import { createAction, props } from '@ngrx/store';
import { Genre, Movie, MovieCategory } from '../../models/movie.model/movie.model';

export const loadMovies = createAction(
  '[Movies] Load Movies',
  props<{ category: MovieCategory }>(),
);
export const loadMoviesSuccess = createAction(
  '[Movies] Load Movies Success',
  props<{ movies: Movie[]; category: MovieCategory }>(),
);
export const loadMoviesFailure = createAction(
  '[Movies] Load Movies Failure',
  props<{ error: string; category: MovieCategory }>(),
);

export const searchMovie = createAction('[Movies] Search Movie ', props<{ movieName: string }>());
export const searchMovieSuccess = createAction(
  '[Movies] Search Movie Success ',
  props<{ movies: Movie[] }>(),
);
export const searchMovieFailure = createAction(
  '[Movies] Search Movies Failure',
  props<{ error: string }>(),
);

export const loadGenresMovie = createAction('[Movies] Load Genres Movie ');
export const loadGenresMoviesSuccess = createAction(
  '[Movies] Load Genres Movies Success ',
  props<{ movies: Genre[] }>(),
);
export const loadGenresMoviesFailure = createAction(
  '[Movies] Load Genre Movies Failure',
  props<{ error: string }>(),
);

export const selectedMovie = createAction('[Movies] Selected Movie', props<{ movie: Movie }>());

//===============

export const setMovieToFavorite = createAction(
  '[Movies] Set Movie To Favorite ',
  props<{ movieId: number }>(),
);
export const setMovieToWatchLater = createAction(
  '[Movies] Set Movie To Watch List ',
  props<{ movieId: number }>(),
);
//=========================================
export const isUserLogged = createAction('[auth] Is User Logged ');
export const loadUserName = createAction('[auth] Load User Name ', props<{ userName: string }>());
//===============================
export const filterSettings = createAction(
  '[filter] Filter Settings ',
  props<{ adult: boolean; rated: boolean; genre: number; year: number }>(),
);
