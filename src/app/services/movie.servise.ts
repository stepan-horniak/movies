import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movie, MovieRequest } from '../models/movie.model/movie.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieServise {
  baseUrl = 'https://api.themoviedb.org/3/';

  token =
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OTBhY2Y2NDk1OWUwODkwMjZjNzBjZTU2YWE5NzEyNCIsIm5iZiI6MTc2NDc5MzIxOC41Nzc5OTk4LCJzdWIiOiI2OTMwOWI4MmJmMDgwZmNjNjZjM2RjMmYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.1vDXf-l4gdHnv1IUtHReLNBkodNhsRhDCmajs4dss3g';

  constructor(private http: HttpClient) {}
  getMovies(category: string): Observable<MovieRequest> {
    return this.http.get<MovieRequest>(`${this.baseUrl}movie/${category}`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
  }
}
