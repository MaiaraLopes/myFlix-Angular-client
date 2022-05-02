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
    Name: "",
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

  ngOnInit(): void {
    this.getUserProfile();
  }

  getUserProfile(): void {
    const user = localStorage.getItem("username");
    if (user) {
      this.fetchApiData.getUserProfile().subscribe((res: any) => {
        this.user = res;
        this.userDetails.Name = this.user.Username;
        this.userDetails.Email = this.user.Email;
        this.userDetails.Birthdate = this.user.Birthdate.substr(0, 10);
        console.log(this.user);
        return this.user;
      });
    }
  }

  updateUser(): void {
    console.log(this.userDetails);
    this.fetchApiData.updateUserProfile(this.userDetails).subscribe((resp) => {
      localStorage.setItem("user", JSON.stringify(resp));
      this.snackBar.open("User profile was successfully updated.", "OK", {
        duration: 2000,
      });
      return this.user;
    });
  }

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
    });
    this.router.navigate(["welcome"]);
  }
}
