import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadMovies } from '../../store/movie/action';
import { selectMoviesByCategory } from '../../store/movie/selectors';
import { Observable } from 'rxjs';
import { Movie } from '../../models/movie.model/movie.model';
import { CommonModule } from '@angular/common';
import { MovieCard } from '../../components/movie-card/movie-card';

@Component({
  selector: 'app-now-playing-page',
  imports: [CommonModule, MovieCard],
  templateUrl: './now-playing-page.html',
  styleUrl: './now-playing-page.scss',
})
export class NowPlayingPage implements OnInit {
  public movies$!: Observable<Movie[] | undefined>;
  constructor(private store: Store) {}
  ngOnInit(): void {
    this.store.dispatch(loadMovies({ category: 'now_playing' }));
    this.movies$ = this.store.select(selectMoviesByCategory('now_playing'));
  }
}
