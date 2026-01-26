import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest, map, Observable, tap } from 'rxjs';
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
  /** Всі фільми (обʼєднані категорії) */
  allMovies$!: Observable<Movie[]>;

  /** Фільми ПІСЛЯ фільтрів і сортування (БЕЗ пагінації) */
  filteredMovies$!: Observable<Movie[]>;

  /** Фільми для відображення (з slice) */
  movies$!: Observable<Movie[]>;

  /** Кількість фільмів після фільтрів — для paginator */
  totalRecords$!: Observable<number>;

  /** Стан пагінації */
  page$ = new BehaviorSubject<{ first: number; rows: number }>({
    first: 0,
    rows: 10,
  });

  constructor(private store: Store) {}

  ngOnInit(): void {
    // 1️⃣ Завантажуємо всі категорії
    ['now_playing', 'popular', 'top_rated', 'upcoming'].forEach((category) =>
      this.store.dispatch(loadMovies({ category: category as MovieCategory })),
    );

    // 2️⃣ Обʼєднуємо всі категорії + прибираємо дублікати
    this.allMovies$ = combineLatest([
      this.store.select(selectMoviesByCategory('now_playing')),
      this.store.select(selectMoviesByCategory('popular')),
      this.store.select(selectMoviesByCategory('top_rated')),
      this.store.select(selectMoviesByCategory('upcoming')),
    ]).pipe(
      map(([now, popular, top, upcoming]) => [
        ...(now ?? []),
        ...(popular ?? []),
        ...(top ?? []),
        ...(upcoming ?? []),
      ]),
      map((movies) => Array.from(new Map(movies.map((m) => [m.id, m])).values())),
    );

    // 3️⃣ ФІЛЬТРИ + СОРТУВАННЯ (БЕЗ slice)
    this.filteredMovies$ = combineLatest([
      this.allMovies$,
      this.store.select(selectFilterSettings),
    ]).pipe(
      map(([movies, filters]) => {
        const filterYear = filters.year ? Number(filters.year) : null;

        let filtered = movies.filter((movie) => {
          const matchesAdult = filters.adult || !movie.adult;

          const movieYear = Number(movie.release_date?.slice(0, 4));
          const matchesYear = filterYear ? movieYear >= filterYear : true;

          if (filters.genre) {
            const genreId = Number(filters.genre);
            return matchesAdult && matchesYear && movie.genre_ids.includes(genreId);
          }

          return matchesAdult && matchesYear;
        });

        filtered.sort((a, b) =>
          filters.rated ? b.vote_average - a.vote_average : a.vote_average - b.vote_average,
        );

        return filtered;
      }),
      tap(() => {
        // side effect: скидаємо пагінацію
        this.page$.next({ first: 0, rows: 10 });
      }),
    );

    // 4️⃣ КІЛЬКІСТЬ ЕЛЕМЕНТІВ ДЛЯ PAGINATOR
    this.totalRecords$ = this.filteredMovies$.pipe(map((movies) => movies.length));

    // 5️⃣ PAGINATION (slice)
    this.movies$ = combineLatest([this.filteredMovies$, this.page$]).pipe(
      map(([movies, page]) => movies.slice(page.first, page.first + page.rows)),
    );
  }

  // 6️⃣ Клік по paginator
  onPageChange(event: PaginatorState): void {
    this.page$.next({
      first: event.first ?? 0,
      rows: event.rows ?? 10,
    });
  }
}
