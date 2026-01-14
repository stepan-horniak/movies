import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../../models/movie.model/movie.model';
import { ButtonModule } from 'primeng/button';
import { Store } from '@ngrx/store';
import { selectedMovie, setMovieToFavorite, setMovieToWatchLater } from '../../store/movie/action';
import { Router } from '@angular/router';
@Component({
  selector: 'app-movie-card',
  imports: [ButtonModule],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.scss',
})
export class MovieCard implements OnInit {
  @Input() movie!: Movie;

  constructor(private store: Store, private router: Router) {}
  ngOnInit(): void {}

  addToWatchLaterListId(event: Event, movieId: number) {
    event.stopPropagation();
    this.store.dispatch(setMovieToWatchLater({ movieId }));
  }
  addToFavoriteListId(event: Event, movieId: number) {
    event.stopPropagation();
    this.store.dispatch(setMovieToFavorite({ movieId }));
  }
  selectMovie(movie: Movie) {
    this.store.dispatch(selectedMovie({ movie }));
    this.router.navigate(['/movie-details']);
  }
}
