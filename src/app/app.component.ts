/**
 * This component is the root component rendered in index.html.
 * It is the app's parent component that uses routers to display
 * the content definend by the routes.
 */
import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "myFlix-Angular-client";
}
