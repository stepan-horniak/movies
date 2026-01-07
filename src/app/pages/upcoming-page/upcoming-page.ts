import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../../models/movie.model/movie.model';
import { Store } from '@ngrx/store';
import { loadMovies } from '../../store/movie/action';
import { selectMoviesByCategory } from '../../store/movie/selectors';
import { CommonModule } from '@angular/common';
import { MovieCard } from '../../components/movie-card/movie-card';

@Component({
  selector: 'app-upcoming-page',
  imports: [CommonModule, MovieCard],
  templateUrl: './upcoming-page.html',
  styleUrl: './upcoming-page.scss',
})
export class UpcomingPage implements OnInit {
  public movies$!: Observable<Movie[] | undefined>;
  constructor(private store: Store) {}
  ngOnInit(): void {
    this.store.dispatch(loadMovies({ category: 'upcoming' }));
    this.movies$ = this.store.select(selectMoviesByCategory('upcoming'));
  }
}
