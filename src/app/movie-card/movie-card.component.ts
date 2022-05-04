/**
 * This component is used to display the data retrieved from the movies list
 * in the myFlix database. Each movie is rendered as a mat card in the template.
 * The cards show the title, director and an image of the movie.
 * The user then has the option to click on a director, genre or description button
 * and to add the movie to their favorites list using the icon in the corner.
 *
 *  @module MovieCardComponent
 */
import { Component, OnInit } from "@angular/core";
import { FetchApiDataService } from "../fetch-api-data.service";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { DirectorViewComponent } from "../director-view/director-view.component";
import { GenreViewComponent } from "../genre-view/genre-view.component";
import { DescriptionViewComponent } from "../description-view/description-view.component";
import { Router } from "@angular/router";

@Component({
  selector: "app-movie-card",
  templateUrl: "./movie-card.component.html",
  styleUrls: ["./movie-card.component.scss"],
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  favoriteMovies: any[] = [];
  user: any = {};

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  /**
   * A function to check if there is a user logged in and get data
   * for all movies and the user's profile if positive
   */
  ngOnInit(): void {
    if (!localStorage.getItem("username")) {
      this.router.navigate(["welcome"]);
    } else {
      this.fetchApiData.getAllMovies().subscribe((movies: any) => {
        this.movies = movies;
      });
      this.fetchApiData.getUserProfile().subscribe((user: any) => {
        this.user = user;
      });
    }
  }

  /**
   * Opens a dialog to display the director component
   * @param name - Director's name
   * @param bio - Director's bio
   * @param birth - Director's birthdate
   */
  getDirectorView(name: string, bio: string, birth: Date): void {
    this.dialog.open(DirectorViewComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birth: birth,
      },
      width: "500px",
    });
  }

  /**
   * Opens a dialog to display the genre component
   * @param name - Genre's name
   * @param description - Genre's description
   */
  getGenreView(name: string, description: string): void {
    this.dialog.open(GenreViewComponent, {
      data: {
        Name: name,
        Description: description,
      },
      width: "500px",
    });
  }

  /**
   * Opens a dialog to display the description component
   * @param title - Movie title
   * @param description - Movie description
   */
  getDescriptionView(title: string, description: string): void {
    this.dialog.open(DescriptionViewComponent, {
      data: {
        Title: title,
        Description: description,
      },
      width: "500px",
    });
  }

  /**
   * Invokes the getUserProfile method using fetchApiData and populates the favoriteMovies array
   * with the FavoriteMovies property on the response, containing the user's favorite movies
   * @function getFavoriteMovies
   * @returns an array with the movies objects from the user's FavoriteMovies list
   */
  getFavoriteMovies(): void {
    this.fetchApiData.getUserProfile().subscribe((resp: any) => {
      this.favoriteMovies = resp.FavoriteMovies;
    });
  }

  /**
   * Invokes the addFavoriteMovies method using fetchApiData to add movies
   * to the user's FavoriteMovies. If successful, an alert message confirms
   * the movie has been added to the list
   * @function addFavoriteMovies
   * @param MovieID - Movie id
   * @param title - Movie title
   * @returns an updated array with the movies objects from the user's FavoriteMovies list
   */
  addFavoriteMovies(MovieID: string, title: string): void {
    this.fetchApiData
      .addFavoriteMovie(MovieID)
      .subscribe((updatedUser: any) => {
        this.user = updatedUser;
        this.snackBar.open(`${title} has been added to your favorites.`, "OK", {
          duration: 3000,
        });
      });
  }

  /**
   * Invokes the removeFavoriteMovies method using fetchApiData to remove movies
   * from the user's FavoriteMovies. If successful, an alert message confirms
   * the movie has been removed from the list
   * @function removeFavoriteMovies
   * @param MovieID - Movie id
   * @param title - Movie title
   * @returns an updated array with the movies objects from the user's FavoriteMovies
   */
  removeFavoriteMovies(MovieID: string, title: string): void {
    this.fetchApiData
      .deleteFavoriteMovie(MovieID)
      .subscribe((updatedUser: any) => {
        this.user = updatedUser;
        this.snackBar.open(
          `${title} has been removed from your favorites.`,
          "OK",
          {
            duration: 3000,
          }
        );
      });
  }

  /**
   * Function that checks if the movie id is included in the user's FavoriteMovies
   * @param MovieID  - Movie id
   * @returns true or false
   */
  isFavorite(MovieID: string): boolean {
    return this.user.FavoriteMovies.includes(MovieID);
  }

  /**
   * Function that adds or removes the movie to or from the user's FavoriteMovies list.
   * If the movie is present, call @function removeFavoriteMovies
   * If the movie is not present, call @function addFavoriteMovies
   * @param movie - Movie object
   * @returns addFavoriteMovies or removeFavoriteMovies function
   */
  toggleFavorite(movie: any): void {
    this.isFavorite(movie._id)
      ? this.removeFavoriteMovies(movie._id, movie.Title)
      : this.addFavoriteMovies(movie._id, movie.Title);
  }
}
