import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import {MatSnackBar} from '@angular/material/snack-bar'

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {

  @Input() userDetails = { Username: '', Password: '', Email: '', Birthdate: '' };
  
  constructor( 
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar) {}

  ngOnInit(): void {
  }

  //Function that sends th e form inputs to the backend
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userDetails).subscribe((result) => {
      //Successful user registration
      this.dialogRef.close();
      console.log(result);
      this.snackBar.open('User registered successfully!', 'OK', {
        duration: 2000
      });
    }, (result) => {
      console.log(result);
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }
}
