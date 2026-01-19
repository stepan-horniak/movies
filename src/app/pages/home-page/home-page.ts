import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';

import { loadMovies } from '../../store/movie/action';
import { selectFilterSettings, selectMoviesByCategory } from '../../store/movie/selectors';
import { Movie, MovieCategory } from '../../models/movie.model/movie.model';
import { MovieCard } from '../../components/movie-card/movie-card';
import { MovieFilter } from '../../components/movie-filter/movie-filter';

@Component({
  selector: 'app-home-page',
  imports: [CommonModule, MovieCard, MovieFilter, PaginatorModule],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage implements OnInit {
  allMovies$!: Observable<Movie[]>;
  movies$!: Observable<Movie[]>;

  page$ = new BehaviorSubject<{ first: number; rows: number }>({
    first: 0,
    rows: 10,
  });

  constructor(private store: Store) {}

  ngOnInit(): void {
    // 1. Завантаження категорій
    ['now_playing', 'popular', 'top_rated', 'upcoming'].forEach((category) =>
      this.store.dispatch(loadMovies({ category: category as MovieCategory }))
    );

    // 2. Обʼєднання всіх фільмів + видалення дублікатів
    this.allMovies$ = combineLatest([
      this.store.select(selectMoviesByCategory('now_playing')),
      this.store.select(selectMoviesByCategory('popular')),
      this.store.select(selectMoviesByCategory('top_rated')),
      this.store.select(selectMoviesByCategory('upcoming')),
    ]).pipe(
      map(([nowPlaying, popular, topRated, upcoming]) => [
        ...(nowPlaying ?? []),
        ...(popular ?? []),
        ...(topRated ?? []),
        ...(upcoming ?? []),
      ]),
      map((movies) => Array.from(new Map(movies.map((m) => [m.id, m])).values()))
    );

    // 3. Фільтрація + сортування + пагінація
    this.movies$ = combineLatest([
      this.allMovies$,
      this.store.select(selectFilterSettings),
      this.page$,
    ]).pipe(
      map(([allMovies, filters, page]) => {
        const filterYear = filters.year ? Number(filters.year) : null;

        let filtered = allMovies.filter((movie) => {
          const matchesAdult = filters.adult ? true : movie.adult === false;

          const movieYear = Number(movie.release_date?.slice(0, 4));

          const matchesYear = filterYear ? movieYear <= filterYear : true;

          return matchesAdult && matchesYear;
        });

        filtered = [...filtered].sort((a, b) =>
          filters.rated ? b.vote_average - a.vote_average : a.vote_average - b.vote_average
        );

        return filtered.slice(page.first, page.first + page.rows);
      })
    );
  }

  onPageChange(event: PaginatorState): void {
    this.page$.next({
      first: event.first ?? 0,
      rows: event.rows ?? 10,
    });
  }
}
