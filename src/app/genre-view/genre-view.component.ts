/**
 * This component us used to render a mat dialog with the name and description
 * of the genre of the chosen movie
 * @module GenreViewComponent
 */
import { Component, OnInit, Inject } from "@angular/core";
//MAT_DIALOG_DATA is an injection token that allows access to the data passed into a dialog
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-genre-view",
  templateUrl: "./genre-view.component.html",
  styleUrls: ["./genre-view.component.scss"],
})
export class GenreViewComponent implements OnInit {
  /**
   * The data passed to the Genre dialog in the MovieCardComponent is injected
   * into the constructor using the MAT_DIALOG_DATA injection token.
   * The data becomes a property on the class and is available
   * to be output in the template
   * @param data
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Name: string;
      Description: string;
    }
  ) {}

  ngOnInit(): void {}
}
