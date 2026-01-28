import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Movie } from '../../models/movie.model/movie.model';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { MovieCard } from '../../components/movie-card/movie-card';
import { MovieServise } from '../../services/movie.servise';

@Component({
  selector: 'app-favoryte-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MovieCard],
  templateUrl: './favoryte-page.html',
  styleUrl: './favoryte-page.scss',
})
export class FavorytePage implements OnInit {
  public movies$!: Observable<Movie[]>;
  constructor(
    private store: Store,
    private movieService: MovieServise,
  ) {}

  ngOnInit(): void {
    const accountId = localStorage.getItem('accountId');
    if (accountId) {
      this.movies$ = this.movieService.getFavoriteOrWatchListMovies('favorite', accountId);
    }
  }
  removeFromFavorite(movieId: number) {
    const accountId = localStorage.getItem('accountId');
    const sessionId = localStorage.getItem('sessionId');
    if (accountId && sessionId) {
      this.movies$ = this.movies$.pipe(map((movies) => movies.filter((m) => m.id !== movieId)));

      this.movieService
        .updateFavoriteList('favorite', movieId, accountId, sessionId, false)
        .subscribe();
    }
  }
}
