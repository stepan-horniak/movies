import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadMovies } from '../../store/movie/action';
import { combineLatest, map, Observable } from 'rxjs';
import { selectfilter, selectMoviesByCategory } from '../../store/movie/selectors';
import { Movie } from '../../models/movie.model/movie.model';
import { MovieCard } from '../../components/movie-card/movie-card';
import { CommonModule } from '@angular/common';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { MovieFilter } from '../../components/movie-filter/movie-filter';

@Component({
  selector: 'app-home-page',
  imports: [MovieCard, CommonModule, PaginatorModule, MovieFilter],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage implements OnInit {
  ollMovies$!: Observable<Movie[]>;
  movies$!: Observable<Movie[]>;

  first = 0;
  rows = 10;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(loadMovies({ category: 'now_playing' }));
    this.store.dispatch(loadMovies({ category: 'popular' }));
    this.store.dispatch(loadMovies({ category: 'top_rated' }));
    this.store.dispatch(loadMovies({ category: 'upcoming' }));

    this.ollMovies$ = combineLatest([
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
      ])
    );

    this.updatePagedMovies();

    this.store.select(selectfilter).subscribe((el) => console.log(el));
  }

  onPageChange(event: PaginatorState) {
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 10;
    this.updatePagedMovies();
  }

  private updatePagedMovies() {
    this.movies$ = this.ollMovies$.pipe(
      map((movies) => movies.slice(this.first, this.first + this.rows))
    );
  }
}
