import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, filter, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { concatLatestFrom } from '@ngrx/operators';

import { MovieServise } from '../../services/movie.servise';
import * as MoviesActions from '../movie/action';
import { selectGenres, selectMoviesByCategory } from './selectors';

@Injectable()
export class MoviesEffects {
  private actions$ = inject(Actions);
  private movieData = inject(MovieServise);
  private store = inject(Store);

  loadMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MoviesActions.loadMovies),

      concatLatestFrom((action: any) => this.store.select(selectMoviesByCategory(action.category))),

      filter(([_, movies]) => movies === null),

      mergeMap(([action]) =>
        this.movieData.getMovies(action.category).pipe(
          map((data) =>
            MoviesActions.loadMoviesSuccess({
              movies: data.results,
              category: action.category,
            })
          ),
          catchError((err) =>
            of(
              MoviesActions.loadMoviesFailure({
                error: err.message,
                category: action.category,
              })
            )
          )
        )
      )
    )
  );

  loadUserName$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MoviesActions.isUserLogged),

      map(() => {
        const cookies = document.cookie.split('; ');
        const nameCookie = cookies.find((c) => c.startsWith('name='));

        const userName = nameCookie ? decodeURIComponent(nameCookie.split('=')[1]) : 'Log in';

        return MoviesActions.loadUserName({ userName });
      })
    )
  );

  searchMovie$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MoviesActions.searchMovie),
      mergeMap((action) =>
        this.movieData.searchMovieToName(action.movieName).pipe(
          map((data) =>
            MoviesActions.searchMovieSuccess({
              movies: data.results,
            })
          ),
          catchError((err) =>
            of(
              MoviesActions.searchMovieFailure({
                error: err.message,
              })
            )
          )
        )
      )
    )
  );

  loadGenresMovie$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MoviesActions.loadGenresMovie),
      // беремо актуальні жанри зі store
      concatLatestFrom(() => this.store.select(selectGenres)),

      // якщо жанри вже є — не робимо запит
      filter(([_, genres]) => !genres || genres.length === 0),

      mergeMap(() =>
        this.movieData.getGenres().pipe(
          map((data) =>
            MoviesActions.loadGenresMoviesSuccess({
              movies: data.genres,
            })
          ),
          catchError((err) =>
            of(
              MoviesActions.loadGenresMoviesFailure({
                error: err.message,
              })
            )
          )
        )
      )
    )
  );
}
