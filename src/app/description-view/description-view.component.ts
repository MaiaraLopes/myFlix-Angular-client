/**
 * This component us used to render a mat dialog with the name, and description
 * of the chosen movie
 * @module DescriptionViewComponent
 */
import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-description-view",
  templateUrl: "./description-view.component.html",
  styleUrls: ["./description-view.component.scss"],
})
export class DescriptionViewComponent implements OnInit {
  constructor(
    /**
     * The data passed to the Description dialog in the MovieCardComponent is injected
     * into the constructor using the MAT_DIALOG_DATA injection token.
     * The data becomes a property on the class and is available
     * to be output in the template
     * @param data
     */
    @Inject(MAT_DIALOG_DATA)
    public data: { Title: string; Description: string }
  ) {}

  ngOnInit(): void {}
}
