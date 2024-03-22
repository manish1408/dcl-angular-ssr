import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NavigationStart, Router, RouterOutlet } from "@angular/router";
import { HeaderComponent } from "./common/header/header.component";
import { FooterComponent } from "./common/footer/footer.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  title = "dcl-angular";
  showHead: boolean = false;
  constructor(private router: Router) {
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (
          event["url"] == "/schedule-call/basic-details" ||
          event["url"] == "/schedule-call/contact-information" ||
          event["url"] == "/schedule-call/it-professionals" ||
          event["url"] == "/schedule-call/duration" ||
          event["url"] == "/schedule-call/budget" ||
          event["url"] == "/schedule-call/start-date" ||
          event["url"] == "/schedule-call/technologies"
        ) {
          this.showHead = false;
          console.log(this.showHead);
        } else {
          // console.log("NU")
          this.showHead = true;
          console.log(this.showHead);
        }
      }
    });
  }
}
