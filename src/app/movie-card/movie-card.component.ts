import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DirectorViewComponent } from '../director-view/director-view.component';
import { GenreViewComponent } from '../genre-view/genre-view.component';
import { DescriptionViewComponent } from '../description-view/description-view.component';
import { subscribeOn } from 'rxjs';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  favoriteMovies: any[] = [];
  user: any = {};

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.fetchApiData.getAllMovies().subscribe((movies: any) => {
      this.movies = movies;
    })
    this.fetchApiData.getUserProfile().subscribe((user: any) => {
      this.user = user;
})
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  getDirectorView(name: string, bio: string, birth: Date): void {
    this.dialog.open(DirectorViewComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birth: birth
      },
      width: '500px'
    })
  }

  getGenreView(name: string, description: string): void {
    this.dialog.open(GenreViewComponent, {
      data: {
        Name: name,
        Description: description
      },
      width: '500px'
    })
  }

  getDescriptionView(title: string, description: string): void {
    this.dialog.open(DescriptionViewComponent, {
      data: {
        Title: title,
        Description: description
      },
      width: '500px'
    })
  }

  getFavoriteMovies(): void {
    this.fetchApiData.getUserProfile().subscribe((resp: any) => {
      this.favoriteMovies = resp.FavoriteMovies;
    })
  }

  addFavoriteMovies(MovieID: string, title: string): void {
    this.fetchApiData.addFavoriteMovie(MovieID).subscribe((updatedUser: any) => {
      this.user - updatedUser;
      this.snackBar.open(`${title} has been added to your favorites.`, 'OK', {
        duration: 3000
      });
      
    });
  }

  removeFavoriteMovies(MovieID: string, title: string): void {
    this.fetchApiData.deleteFavoriteMovie(MovieID).subscribe((updatedUser: any) => {
      this.user = updatedUser;
      this.snackBar.open(`${title} has been removed from your favorites.`, 'OK', {
        duration: 3000,
      });
    })
  }

  isFavorite(MovieID: string): boolean {
    return this.user.FavoriteMovies.includes(MovieID);
  }

  toggleFavorite(movie: any): void {
    this.isFavorite(movie._id)
      ? this.removeFavoriteMovies(movie._id, movie.Title)
      : this.addFavoriteMovies(movie._id, movie.Title);
  }
}
