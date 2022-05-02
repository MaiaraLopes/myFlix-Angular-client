import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenreViewComponent } from '../genre-view/genre-view.component';
import { DirectorViewComponent } from '../director-view/director-view.component';
import { DescriptionViewComponent } from '../description-view/description-view.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-favorites',
  templateUrl: './user-favorites.component.html',
  styleUrls: ['./user-favorites.component.scss']
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
  ) { }

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

  getFavoriteMovies(): any {
          this.favoriteMovies = this.movies.filter((movie: any) => {
        return this.user.FavoriteMovies.includes(movie._id)
      });
      return this.favoriteMovies;
    }
  

  removeFavoriteMovies(MovieID: string, title: string): void {
    this.fetchApiData.deleteFavoriteMovie(MovieID).subscribe((updatedUser: any) => {
      this.user = updatedUser;
      this.getFavoriteMovies();
      this.snackBar.open(`${title} has been removed from your favorites.`, 'OK', {
        duration: 3000,
      });
    });
  }

  openDirector(name: string, bio: string, birth: Date): void {
    this.dialog.open(DirectorViewComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birth: birth,
      },
      width: '500px'
    })
  }

  openGenre(name: string, description: string): void {
    this.dialog.open(GenreViewComponent, {
      data: {
        Name: name,
        Description: description
      },
      width: '500px'
    })
  }

  openDescription(title: string, description: string): void {
    this.dialog.open(DescriptionViewComponent, {
      data: {
        Title: title,
        Description: description,
      },
      width: '500px'
    })
  }
}
