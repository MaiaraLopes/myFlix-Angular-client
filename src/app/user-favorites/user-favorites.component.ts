/**
 * This component is used to display the user's FavoriteMovies list.
 * The cards show the title, director and an image of the movie.
 * The user then has the option to click on a director, genre or description button.
 * The movie can be removed from this list by pressing on the icon button.
 *
 * @module UserFavoritesComponent
 */
import { Component, OnInit } from "@angular/core";
import { FetchApiDataService } from "../fetch-api-data.service";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { GenreViewComponent } from "../genre-view/genre-view.component";
import { DirectorViewComponent } from "../director-view/director-view.component";
import { DescriptionViewComponent } from "../description-view/description-view.component";
import { Router } from "@angular/router";

@Component({
  selector: "app-user-favorites",
  templateUrl: "./user-favorites.component.html",
  styleUrls: ["./user-favorites.component.scss"],
})
export class UserFavoritesComponent implements OnInit {
  user: any = {};
  movies: any[] = [];
  favoriteMovies: any[] = [];

  constructor(
    public dialog: MatDialog,
    public fetchApiData: FetchApiDataService,
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
        this.fetchApiData.getUserProfile().subscribe((user: any) => {
          this.user = user;
          this.getFavoriteMovies();
        });
      });
    }
  }

  /**
   * Function that gets all movies from the API then filters the movies
   * by their id to match the ids in user.FavoriteMovies.
   * A message will appear confirming the movie has been added to the list.
   * @function getFavoriteMovies
   * @returns an array with the movies objects from the user's FavoriteMovies list
   */
  getFavoriteMovies(): any {
    this.favoriteMovies = this.movies.filter((movie: any) => {
      return this.user.FavoriteMovies.includes(movie._id);
    });
    return this.favoriteMovies;
  }

  /**
   * Function that removes a movie from the FavoriteMovies list using the API.
   * A message will appear confirming the movie has been removed from the list.
   *
   * @param MovieID - Movie id
   * @param title - Movie title
   */
  removeFavoriteMovies(MovieID: string, title: string): void {
    this.fetchApiData
      .deleteFavoriteMovie(MovieID)
      .subscribe((updatedUser: any) => {
        this.user = updatedUser;
        this.getFavoriteMovies();
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
   * Opens a dialog to display the director component
   * @param name - Director's name
   * @param bio - Director's bio
   * @param birth - Director's birthdate
   */
  openDirector(name: string, bio: string, birth: Date): void {
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
  openGenre(name: string, description: string): void {
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
  openDescription(title: string, description: string): void {
    this.dialog.open(DescriptionViewComponent, {
      data: {
        Title: title,
        Description: description,
      },
      width: "500px",
    });
  }
}
