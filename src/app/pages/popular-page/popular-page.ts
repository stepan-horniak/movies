import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectMoviesByCategory } from '../../store/movie/selectors';
import { loadMovies } from '../../store/movie/action';
import { Movie } from '../../models/movie.model/movie.model';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MovieCard } from '../../components/movie-card/movie-card';

@Component({
  selector: 'app-popular-page',
  imports: [CommonModule, MovieCard],
  templateUrl: './popular-page.html',
  styleUrls: ['./popular-page.scss'],
})
export class PopularPage implements OnInit {
  movies$!: Observable<Movie[] | undefined>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(loadMovies({ category: 'popular' }));
    this.movies$ = this.store.select(selectMoviesByCategory('popular'));
  }
}
