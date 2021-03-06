/**
 * This component is used to render a mat card that welcomes users to the app.
 * It has two buttons for registration or log ig, which the user chooses accordingly.
 *
 * @module WelcomePageComponent
 */
import { Component, OnInit } from "@angular/core";
import { UserLoginFormComponent } from "../user-login-form/user-login-form.component";
import { UserRegistrationFormComponent } from "../user-registration-form/user-registration-form.component";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";

@Component({
  selector: "app-welcome-page",
  templateUrl: "./welcome-page.component.html",
  styleUrls: ["./welcome-page.component.scss"],
})
export class WelcomePageComponent implements OnInit {
  constructor(public dialog: MatDialog, public router: Router) {}

  ngOnInit(): void {
    if (localStorage.getItem("username")) {
      this.router.navigate(["movies"]);
    }
  }
  //Opens the registration dialog when sign up button is clicked
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: "280px",
    });
  }

  //Opens the login dialog when login button is clicked
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: "280px",
    });
  }
}
