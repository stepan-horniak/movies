import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movie, MovieRequest } from '../models/movie.model/movie.model';
import { catchError, map, Observable, switchMap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieServise {
  baseUrl = 'https://api.themoviedb.org/3';
  apiKey = '990acf64959e089026c70ce56aa97124';
  token =
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OTBhY2Y2NDk1OWUwODkwMjZjNzBjZTU2YWE5NzEyNCIsIm5iZiI6MTc2NDc5MzIxOC41Nzc5OTk4LCJzdWIiOiI2OTMwOWI4MmJmMDgwZmNjNjZjM2RjMmYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.1vDXf-l4gdHnv1IUtHReLNBkodNhsRhDCmajs4dss3g';
  userName = 'StepanHorniak';
  userPassword = '19951220Pishti';
  constructor(private http: HttpClient) {}
  getMovies(category: string): Observable<MovieRequest> {
    return this.http.get<MovieRequest>(`${this.baseUrl}/movie/${category}`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
  }
  searchMovieToName(movieName: string): Observable<MovieRequest> {
    return this.http.get<MovieRequest>(`${this.baseUrl}/search/movie?query=${movieName}`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
  }

  //==============================================================================
  private getRequestToken(): Observable<string> {
    const url = `${this.baseUrl}/authentication/token/new?api_key=${this.apiKey}`;
    return this.http.get<any>(url).pipe(
      map((response) => response.request_token),
      catchError(this.handleError)
    );
  }

  private validateRequestToken(requestToken: string): Observable<void> {
    const url = `${this.baseUrl}/authentication/token/validate_with_login?api_key=${this.apiKey}`;
    const body = {
      username: this.userName,
      password: this.userPassword,
      request_token: requestToken,
    };
    return this.http.post<any>(url, body).pipe(
      map(() => {}),
      catchError(this.handleError)
    );
  }

  // Create a session ID
  private createSession(requestToken: string): Observable<string> {
    const url = `${this.baseUrl}/authentication/session/new?api_key=${this.apiKey}`;
    const body = { request_token: requestToken };
    return this.http.post<any>(url, body).pipe(
      map((response) => response.session_id),
      catchError(this.handleError)
    );
  }

  // Get account details to retrieve accountId
  private getAccountId(sessionId: string): Observable<number> {
    const url = `${this.baseUrl}/account?api_key=${this.apiKey}&session_id=${sessionId}`;
    return this.http.get<any>(url).pipe(
      map((response) => response.id),
      catchError(this.handleError)
    );
  }

  // Public method to get accountId
  public authenticateAndGetAccountId(): Observable<number> {
    return this.getRequestToken().pipe(
      switchMap((requestToken) =>
        this.validateRequestToken(requestToken).pipe(
          switchMap(() => this.createSession(requestToken)),
          switchMap((sessionId) => this.getAccountId(sessionId))
        )
      )
    );
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(error);
  }
}

// export class AuthService {
//     private apiUrl = 'https://api.themoviedb.org/3';
//     private apiKey = 'YOUR_KEY';

//     private username = 'YOUR_USER_NAME';
//     private password = 'PASS';

//     constructor(private http: HttpClient) { }

//     // Get the request token
//     private getRequestToken(): Observable<string> {
//         const url = `${this.apiUrl}/authentication/token/new?api_key=${this.apiKey}`;
//         return this.http.get<any>(url).pipe(
//             map(response => response.request_token),
//             catchError(this.handleError)
//         );
//     }

//     // Validate the request token with the user's credentials
//     private validateRequestToken(requestToken: string): Observable<void> {
//         const url = `${this.apiUrl}/authentication/token/validate_with_login?api_key=${this.apiKey}`;
//         const body = {
//             username: this.username,
//             password: this.password,
//             request_token: requestToken
//         };
//         return this.http.post<any>(url, body).pipe(
//             map(() => { }),
//             catchError(this.handleError)
//         );
//     }

//     // Create a session ID
//     private createSession(requestToken: string): Observable<string> {
//         const url = `${this.apiUrl}/authentication/session/new?api_key=${this.apiKey}`;
//         const body = { request_token: requestToken };
//         return this.http.post<any>(url, body).pipe(
//             map(response => response.session_id),
//             catchError(this.handleError)
//         );
//     }

//     // Get account details to retrieve accountId
//     private getAccountId(sessionId: string): Observable<number> {
//         const url = `${this.apiUrl}/account?api_key=${this.apiKey}&session_id=${sessionId}`;
//         return this.http.get<any>(url).pipe(
//             map(response => response.id),
//             catchError(this.handleError)
//         );
//     }

//     // Public method to get accountId
//     public authenticateAndGetAccountId(): Observable<number> {
//         return this.getRequestToken().pipe(
//             switchMap(requestToken => this.validateRequestToken(requestToken).pipe(
//                 switchMap(() => this.createSession(requestToken)),
//                 switchMap(sessionId => this.getAccountId(sessionId))
//             ))
//         );
//     }

//     private handleError(error: any) {
//         console.error('An error occurred:', error);
//         return throwError(error);
//     }
// }

// add this code to ngOnInit in your appConfig.component

// this.authService.authenticateAndGetAccountId().subscribe(
//     accountId => {
//         this.movieService.setAccountId(accountId);
//         console.log('Account ID:', accountId);
//     },
//     error => {
//         console.error('Authentication failed:', error);
//     }
// );

// and save accountId in your MovieService

// accountId: number | null = null;

// setAccountId(id: number) {
//     this.accountId = id;
// }
