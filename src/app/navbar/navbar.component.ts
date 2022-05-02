import { Component, OnInit } from "@angular/core";
import { FetchApiDataService } from "../fetch-api-data.service";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialogModule } from "@angular/material/dialog";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public snackBar: MatSnackBar,
    public dialog: MatDialogModule
  ) {}

  ngOnInit(): void {}

  //Sends user to movies screen
  toMovies(): void {
    this.router.navigate(["movies"]);
  }

  //Sends user to their favourites list
  toMyList(): void {
    this.router.navigate(["my-list"]);
  }

  //Sends user to their profile screen
  toProfile(): void {
    this.router.navigate(["profile"]);
  }

  //Logs user out by clearing localStorage, then redirects to Welcome Screen
  logOut(): void {
    localStorage.clear();
    this.snackBar.open("User has successfully logged out", "OK", {
      duration: 2000,
    });
    this.router.navigate(["welcome"]);
  }
}
