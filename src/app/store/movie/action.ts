import { createAction, props } from '@ngrx/store';
import { Movie, MovieCategory } from '../../models/movie.model/movie.model';

export const loadMovies = createAction(
  '[Movies] load movies',
  props<{ category: MovieCategory }>()
);
export const loadMoviesSuccess = createAction(
  '[Movies] load movies success',
  props<{ movies: Movie[]; category: MovieCategory }>()
);
export const loadMoviesFailure = createAction(
  '[Movies] load movies failure',
  props<{ error: string; category: MovieCategory }>()
);
export const setMovieToFavorite = createAction(
  '[Movies] set Movie To Favorite ',
  props<{ movieId: number }>()
);
export const setMovieToWatchLater = createAction(
  '[Movies] set Movie To Watch Later ',
  props<{ movieId: number }>()
);

export const searchMovie = createAction('[Movies] Search Movie ', props<{ movieName: string }>());
export const searchMovieSuccess = createAction(
  '[Movies] Search Movie Success ',
  props<{ movies: Movie[] }>()
);
export const searchMovieFailure = createAction(
  '[Movies] search movies failure',
  props<{ error: string }>()
);

export const selectedMovie = createAction('[Movies] Selected Movie', props<{ movie: Movie }>());

//=========================================
export const isUserLogged = createAction('[auth] is user logged ');
export const loadUserName = createAction('[auth] Load User Name ', props<{ userName: string }>());
