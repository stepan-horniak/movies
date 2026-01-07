import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MovieCard } from '../../components/movie-card/movie-card';
import { Observable } from 'rxjs';
import { Movie } from '../../models/movie.model/movie.model';
import { Store } from '@ngrx/store';
import { loadMovies } from '../../store/movie/action';
import { selectFavoriteListId, selectMoviesByCategory } from '../../store/movie/selectors';

@Component({
  selector: 'app-top-rated-page',
  imports: [CommonModule, MovieCard],
  templateUrl: './top-rated-page.html',
  styleUrl: './top-rated-page.scss',
})
export class TopRatedPage implements OnInit {
  public movies$!: Observable<Movie[] | undefined>;
  constructor(private store: Store) {}
  ngOnInit(): void {
    this.store.dispatch(loadMovies({ category: 'top_rated' }));
    this.movies$ = this.store.select(selectMoviesByCategory('top_rated'));

    this.store.select(selectFavoriteListId).subscribe((el) => console.log(el));
  }
}
