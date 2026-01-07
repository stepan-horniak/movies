import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../../models/movie.model/movie.model';
import { ButtonModule } from 'primeng/button';
import { Store } from '@ngrx/store';
import { setMovieToFavorite, setMovieToWatchLater } from '../../store/movie/action';
@Component({
  selector: 'app-movie-card',
  imports: [ButtonModule],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.scss',
})
export class MovieCard implements OnInit {
  @Input() movie!: Movie;

  constructor(private store: Store) {}
  ngOnInit(): void {}

  addToWatchLaterListId(movieId: number) {
    this.store.dispatch(setMovieToWatchLater({ movieId }));
  }
  addToFavoriteListId(movieId: number) {
    this.store.dispatch(setMovieToFavorite({ movieId }));
  }
}
