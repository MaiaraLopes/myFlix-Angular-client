import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

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
    return this.http.post(apiUrl + 'users', userDetails).pipe(catchError(this.handleError));
  }

  //User login endpoint
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails).pipe(catchError(this.handleError));
  }

  //List of movies endpoint
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get<any>(apiUrl + 'movies', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer' + token,
        }
      )
    }).pipe(catchError(this.handleError)
    );
  }

  //Single movie card with details endpoint
  getSingleMovie(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/:movieId', {
      headers: new HttpHeaders({
        Authorization: 'Bearer' + token,
      })
    }).pipe(catchError(this.handleError))
  }

  //Director details endpoint
  getDirector(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/director/:Name', {
      headers: new HttpHeaders ({
Authorization: 'Bearer' + token,
      })
    } ).pipe(catchError(this.handleError))
  }
  
  //Genre details endpoint
  getGenre(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/genre/:Name', {
      headers: new HttpHeaders({
        Authorization: 'Bearer' + token,
      })
    }).pipe(catchError(this.handleError))
  }

  //Show user profile endpoint
  getUserProfile(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    return this.http.get(apiUrl + `users/${username}`, {
      headers: new HttpHeaders({
  Authorization: 'Bearer' + token,
})
    }).pipe(catchError(this.handleError))
  }

  //Update user profile endpoint
  updateUserProfile(userDetails: object): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    return this.http.put(apiUrl + `users/${username}`, userDetails, {
      headers: new HttpHeaders({
        Authorization: 'Bearer' + token,
      }),
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
