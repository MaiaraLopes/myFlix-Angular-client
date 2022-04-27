import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, catchError } from 'rxjs';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://myflix-ml.herokuapp.com/';
@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  //Inject the HttpClient module to the constructor params
  //This will provide HttpClient to the entire class, making it available via this.http

  constructor(private http: HttpClient) { }

  //User registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post<any>(apiUrl + 'users', userDetails).pipe(catchError(this.handleError));
  }

  //User login endpoint
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post<any>(apiUrl + 'login', userDetails).pipe(catchError(this.handleError));
  }

  //List of movies endpoint
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get<any>(apiUrl + 'movies', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        }
      )
    }).pipe(catchError(this.handleError)
    );
  }

  //Single movie card with details endpoint
  getSingleMovie(movieTitle: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get<any>(apiUrl + `movies/${movieTitle}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(catchError(this.handleError))
  }

  //Director details endpoint
  getDirector(directorName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get<any>(apiUrl + `movies/Director/${directorName}`, {
      headers: new HttpHeaders ({
Authorization: 'Bearer ' + token,
      })
    } ).pipe(catchError(this.handleError))
  }
  
  //Genre details endpoint
  getGenre(genreName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get<any>(apiUrl + `movies/Genre/${genreName}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(catchError(this.handleError))
  }

  //Show user profile endpoint
  getUserProfile(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    return this.http.get<any>(apiUrl + `users/${username}`, {
      headers: new HttpHeaders({
  Authorization: 'Bearer ' + token,
})
    }).pipe(catchError(this.handleError))
  }

  //Update user profile endpoint
  updateUserProfile(userDetails: object): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    return this.http.put<any>(apiUrl + `users/${username}`, userDetails, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    }).pipe(catchError(this.handleError))
  }

  //Delete user profile endpoint
  deleteUserProfile(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    return this.http.delete<any>(apiUrl + `users/${username}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(catchError(this.handleError))
  }

  //Add movie to user's favorites
  addFavoriteMovie(MovieID: string): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    return this.http.post<any>(apiUrl + `users/${username}/movies/${MovieID}`, null, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(catchError(this.handleError))
  }

  //Remove movie from user's favorite
  deleteFavoriteMovie(MovieID: string): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    return this.http.delete<any>(apiUrl + `users/${username}/movies/${MovieID}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(catchError(this.handleError))
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`
      );
    }
    return throwError(
      'Something bad happened; please try again later.'
    )
  }
}
