import { Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { MovieServise } from '../../services/movie.servise';
import { Movie } from '../../models/movie.model/movie.model';
import { CommonModule } from '@angular/common';
import { MovieCard } from '../../components/movie-card/movie-card';

@Component({
  selector: 'app-watch-list-page',
  imports: [CommonModule, MovieCard],
  templateUrl: './watch-list-page.html',
  styleUrl: './watch-list-page.scss',
})
export class WatchListPage {
  public movies$!: Observable<Movie[]>;
  constructor(private movieService: MovieServise) {}

  ngOnInit(): void {
    const accountId = localStorage.getItem('accountId');
    if (accountId) {
      this.movies$ = this.movieService.getFavoriteOrWatchListMovies('watchlist', accountId);
    }
  }
  removeFromWatchList(movieId: number) {
    const accountId = localStorage.getItem('accountId');
    const sessionId = localStorage.getItem('sessionId');
    if (accountId && sessionId) {
      this.movies$ = this.movies$.pipe(map((movies) => movies.filter((m) => m.id !== movieId)));

      this.movieService
        .updateFavoriteList('watchlist', movieId, accountId, sessionId, false)
        .subscribe();
    }
  }
}
