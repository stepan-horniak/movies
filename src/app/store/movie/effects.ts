import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, filter, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { concatLatestFrom } from '@ngrx/operators';

import { MovieServise } from '../../services/movie.servise';
import * as MoviesActions from '../movie/action';
import { selectMoviesByCategory } from './selectors';

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
}
