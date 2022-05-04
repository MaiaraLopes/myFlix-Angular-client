/**
 * This component renders a mat card showing the user's details in a form.
 * The user can edit their details or delete their profile using the buttons provided.
 *
 * @module UserProfileComponent
 */
import { Component, OnInit, Input } from "@angular/core";
import { FetchApiDataService } from "../fetch-api-data.service";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.scss"],
})
export class UserProfileComponent implements OnInit {
  user: any = {};

  @Input() userDetails = {
    Username: "",
    Email: "",
    Password: "",
    Birthdate: "",
  };

  constructor(
    public dialog: MatDialog,
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  /**
   * A function to check if there is a user logged in and get
   * the user's profile if positive
   */
  ngOnInit(): void {
    if (!localStorage.getItem("username")) {
      this.router.navigate(["welcome"]);
    } else {
      this.getUserProfile();
    }
  }

  /**
   * Invokes the getUserProfile method with fetchApiData and populates the form
   * with the result.
   * @function getUserProfile
   * @returns an object with the user details
   */
  getUserProfile(): void {
    const user = localStorage.getItem("username");
    if (user) {
      this.fetchApiData.getUserProfile().subscribe((res: any) => {
        this.user = res;
        this.userDetails.Username = this.user.Username;
        this.userDetails.Email = this.user.Email;
        this.userDetails.Birthdate = this.user.Birthdate.substr(0, 10);
        console.log(this.user);
        return this.user;
      });
    }
  }

  /**
   * Gets the userDetails from the form and invokes the updateUser method
   * with fetchApiData to update the details.
   * The new user details are updated in the localStorage
   * @function updateUser
   * @returns an object with the new user's details
   */
  updateUser(): void {
    console.log(this.userDetails);
    this.fetchApiData.updateUserProfile(this.userDetails).subscribe((resp) => {
      localStorage.setItem("username", resp.Username);
      this.user = resp;
      this.snackBar.open("User profile was successfully updated.", "OK", {
        duration: 2000,
      });
      return this.user;
    });
  }

  /**
   * Invokes the deleteUser method with fetchApiData and deletes the user from localStorage.
   * If successful, a message will confirm the deletion and reroutes the user to the welcome screen.
   */
  deleteUser(): void {
    this.fetchApiData.deleteUserProfile().subscribe(() => {
      this.snackBar.open(
        `${this.user.Username}'s profile was successfully deleted.`,
        "OK",
        {
          duration: 3000,
        }
      );
      localStorage.clear();
      this.router.navigate(["welcome"]);
    });
  }
}
