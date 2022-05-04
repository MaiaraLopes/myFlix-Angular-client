/**
 * This class is used to make Http requests to the myFlix API to retrieve data
 * that is used within the app, register and log in users, update or delete their profile,
 * and add or remove movies from their favorites.
 * It is injected as a dependency to the root component making the service available
 * to all the other components.
 *
 * @module FetchApiDataService
 */
import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, throwError, catchError } from "rxjs";

//Declaring the api url that will provide data for the client app
const apiUrl = "https://myflix-ml.herokuapp.com/";
@Injectable({
  providedIn: "root",
})
export class FetchApiDataService {
  //Inject the HttpClient module to the constructor params
  //This will provide HttpClient to the entire class, making it available via this.http

  constructor(private http: HttpClient) {}

  /**
   * User registration endpoint - method POST
   * @function userRegistration
   * @param userDetails
   * @returns an object with the user's details
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post<any>(apiUrl + "users", userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * User login endpoint - method POST
   * @function userLogin
   * @param userDetails
   * @returns an object with the user's details
   */

  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post<any>(apiUrl + "login", userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * List of movies endpoint - method GET
   * @function getAllMovies
   * @returns an array with all movies objects
   */

  getAllMovies(): Observable<any> {
    const token = localStorage.getItem("token");
    return this.http
      .get<any>(apiUrl + "movies", {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * Single movie card with details endpoint - method GET
   * @function getSingleMovie
   * @param movieTitle
   * @returns an object with the specific movie details
   */
  getSingleMovie(movieTitle: string): Observable<any> {
    const token = localStorage.getItem("token");
    return this.http
      .get<any>(apiUrl + `movies/${movieTitle}`, {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * Director details endpoint - method GET
   * @function getDirector
   * @param directorName
   * @returns an object with the director details
   */
  getDirector(directorName: string): Observable<any> {
    const token = localStorage.getItem("token");
    return this.http
      .get<any>(apiUrl + `movies/Director/${directorName}`, {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * Genre details endpoint - method GET
   * @function getGenre
   * @param genreName
   * @returns an object with the genre details
   */
  getGenre(genreName: string): Observable<any> {
    const token = localStorage.getItem("token");
    return this.http
      .get<any>(apiUrl + `movies/Genre/${genreName}`, {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * Show user profile endpoint - method GET
   * Requires authentication with a bearer token
   * @function getUserProfile
   * @returns an object with the user details
   */
  getUserProfile(): Observable<any> {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    return this.http
      .get<any>(apiUrl + `users/${username}`, {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * Update user profile endpoint - method PUT
   * Requires authentication with a bearer token
   * @function updateUserProfile
   * @param userDetails
   * @returns an object with the user details
   */
  updateUserProfile(userDetails: object): Observable<any> {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    return this.http
      .put<any>(apiUrl + `users/${username}`, userDetails, {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * Delete user profile endpoint - method DELETE
   * Requires authentication with bearer token
   * @function deleteUserProfile
   * @returns delete user profile
   */
  deleteUserProfile(): Observable<any> {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    return this.http
      .delete<any>(apiUrl + `users/${username}`, {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * Add movie to user's favorites - method POST
   * Requires authentication with bearer token
   * @function addFavoriteMovie
   * @param MovieID
   * @returns an object with the added movie
   */
  addFavoriteMovie(MovieID: string): Observable<any> {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    return this.http
      .post<any>(apiUrl + `users/${username}/movies/${MovieID}`, null, {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * Remove movie from user's favorite - method DELETE
   * @function deleteFavoriteMovie
   * @param MovieID
   * @returns an object without the deleted movie
   */

  deleteFavoriteMovie(MovieID: string): Observable<any> {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    return this.http
      .delete<any>(apiUrl + `users/${username}/movies/${MovieID}`, {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error("Some error occurred:", error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError("Something bad happened; please try again later.");
  }
}
