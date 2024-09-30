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
          event['url'].startsWith('/dcl-sprint') ||
          event['url'].startsWith('/assessment') ||
          event['url'] === '/thank-you' ||
          event['url'] === '/page-not-found' ||
          event['url'] === '/ai-development'
        ) {
          this.showHead = false;
        } else {
          this.showHead = true;
        }
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
