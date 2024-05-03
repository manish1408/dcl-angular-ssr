import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationStart, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';
import { ToastrModule } from 'ngx-toastr';
import { CommonService } from './services/common.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    ToastrModule,
  ],

  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'dcl-angular';
  showHead: boolean = false;
  constructor(private router: Router, private common: CommonService) {
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (
          event['url'].startsWith('/schedule-call') ||
          event['url'] === '/thank-you' ||
          event['url'] === '/page-not-found'
        ) {
          this.showHead = false;
        } else {
          this.showHead = true;
        }
        // if (
        //   event['url'] == '/schedule-call/basic-details' ||
        //   event['url'] == '/schedule-call/contact-information' ||
        //   event['url'] == '/schedule-call/it-professionals' ||
        //   event['url'] == '/schedule-call/duration' ||
        //   event['url'] == '/schedule-call/budget' ||
        //   event['url'] == '/schedule-call/start-date' ||
        //   event['url'] == '/schedule-call/technologies' ||
        //   event['url'] == '/thank-you'
        // ) {
        //   this.showHead = false;
        // } else {
        //   this.showHead = true;
        // }
      }
    });
  }

  onActivate(event: any) {
    this.common.isBrowser() &&
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
  }
}
