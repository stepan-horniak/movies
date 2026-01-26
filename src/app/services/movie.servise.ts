import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenreRequest, MovieRequest } from '../models/movie.model/movie.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieServise {
  baseUrl = 'https://api.themoviedb.org/3';
  apiKey = '990acf64959e089026c70ce56aa97124';
  token =
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OTBhY2Y2NDk1OWUwODkwMjZjNzBjZTU2YWE5NzEyNCIsIm5iZiI6MTc2NDc5MzIxOC41Nzc5OTk4LCJzdWIiOiI2OTMwOWI4MmJmMDgwZmNjNjZjM2RjMmYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.1vDXf-l4gdHnv1IUtHReLNBkodNhsRhDCmajs4dss3g';

  constructor(private http: HttpClient) {}
  getMovies(category: string): Observable<MovieRequest> {
    return this.http.get<MovieRequest>(`${this.baseUrl}/movie/${category}`);
  }

  searchMovieToName(movieName: string): Observable<MovieRequest> {
    return this.http.get<MovieRequest>(`${this.baseUrl}/search/movie?query=${movieName}`);
  }

  getGenres(): Observable<GenreRequest> {
    return this.http.get<GenreRequest>(`${this.baseUrl}/genre/movie/list`);
  }
  //=====reguest token==========
  getRequestToken(): Observable<string> {
    return this.http
      .get<{ request_token: string }>(`${this.baseUrl}/authentication/token/new`)
      .pipe(map((res) => res.request_token));
  }
  //==============createGuestSession===

  createGuestSession(): Observable<string> {
    const url = `${this.baseUrl}/authentication/guest_session/new`;
    return this.http.get<string>(url);
  }

  //=========Create Session=================
  createSession(requestToken: string): Observable<{ session_id: string }> {
    return this.http.post<{ session_id: string }>(`${this.baseUrl}/authentication/session/new`, {
      request_token: requestToken,
    });
  }
  //============
  getAccountDetails(sessionId: string): Observable<{ id: number }> {
    return this.http.get<{ id: number }>(`${this.baseUrl}/account`, {
      params: { session_id: sessionId },
    });
  }
  //=========add favorite===
  // const url = 'https://api.themoviedb.org/3/account/22525014/favorite?session_id=0f4999330d926bfbaf027971363f90ce1b15aac0';
  // { "movie_id": 238, "media_type": "movie", "favorite": true }

  addFavorite(accountId: string, sessionId: string): Observable<any> {
    return this.http.post<{}>(
      `${this.baseUrl}/account/${accountId}/favorite?session_id=${sessionId}`,
      { media_id: 238, media_type: 'movie', favorite: true },

      { headers: { 'Content-Type': 'application/json;charset=utf-8' } },
    );
  }
}
