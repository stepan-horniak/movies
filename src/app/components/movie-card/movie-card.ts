import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { Movie } from '../../models/movie.model/movie.model';
import { ButtonModule } from 'primeng/button';
import { Store } from '@ngrx/store';
import { selectedMovie } from '../../store/movie/action';
import { Router } from '@angular/router';
import { MovieServise } from '../../services/movie.servise';
@Component({
  selector: 'app-movie-card',
  imports: [ButtonModule],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.scss',
})
export class MovieCard implements OnInit {
  movieService = inject(MovieServise);
  @Input() movie!: Movie;
  @Input() isFavoritePage = false;
  @Output() removed = new EventEmitter<number>();

  constructor(
    private store: Store,
    private router: Router,
  ) {}
  ngOnInit(): void {}

  addToWatchList(event: Event, movieId: number) {
    event.stopPropagation();
    const accountId = localStorage.getItem('accountId');
    const sessionId = localStorage.getItem('sessionId');
    if (!accountId || !sessionId) return;
    this.movieService.updateFavoriteList('watchlist', movieId, accountId, sessionId).subscribe();
  }
  addToFavoriteList(event: Event, movieId: number) {
    event.stopPropagation();
    const accountId = localStorage.getItem('accountId');
    const sessionId = localStorage.getItem('sessionId');
    if (!accountId || !sessionId) return;
    this.movieService.updateFavoriteList('favorite', movieId, accountId, sessionId).subscribe();
  }
  selectMovie(movie: Movie) {
    this.store.dispatch(selectedMovie({ movie }));
    this.router.navigate(['/movie-details']);
  }
  deleteMovieOnList(event: Event, movieId: number) {
    if (!this.isFavoritePage) return;

    event.stopPropagation();
    this.removed.emit(movieId);
  }
}
