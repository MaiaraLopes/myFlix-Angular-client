/**
 * This component renders a mat dialog with a form which the user
 * uses to submit their details to login to the app.
 *
 * @module UserLoginFormComponent
 */
import { Component, OnInit, Input } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { FetchApiDataService } from "../fetch-api-data.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";

@Component({
  selector: "app-user-login-form",
  templateUrl: "./user-login-form.component.html",
  styleUrls: ["./user-login-form.component.scss"],
})
export class UserLoginFormComponent implements OnInit {
  @Input() userDetails = { Username: "", Password: "" };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {}

  /**
   * Invokes the userLogin method with fetchApiData and userDetails from the form
   * to log in the user. If successful, a message appears confirming the user is logged in.
   */
  loginUser(): void {
    this.fetchApiData.userLogin(this.userDetails).subscribe(
      (result) => {
        //Successful user login
        localStorage.setItem("token", result.token);
        localStorage.setItem("username", result.user.Username);
        this.dialogRef.close(); //closes the modal if successful
        console.log(result);
        this.snackBar.open("User logged in successfully!", "OK", {
          duration: 2000,
        });
        this.router.navigate(["movies"]);
      },
      (result) => {
        console.log(result);
        this.snackBar.open(result, "OK", {
          duration: 2000,
        });
      }
    );
  }
}
