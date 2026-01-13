import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Movie } from '../../models/movie.model/movie.model';
import { selectSelectedMovie } from '../../store/movie/selectors';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-details-page',
  imports: [CommonModule],
  templateUrl: './movie-details-page.html',
  styleUrl: './movie-details-page.scss',
})
export class MovieDetailsPage implements OnInit {
  movie$!: Observable<Movie>;

  constructor(private store: Store) {
    this.movie$ = this.store.select(selectSelectedMovie);
  }

  ngOnInit(): void {}
}
