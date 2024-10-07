import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ai-footer',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './ai-footer.component.html',
  styleUrl: './ai-footer.component.scss',
})
export class AiFooterComponent {
  newsEmail: string = '';

  constructor(
    private toastr: ToastrService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}
  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const isReloaded = window.sessionStorage.getItem('isReloaded');
      if (!isReloaded) {
        window.sessionStorage.setItem('isReloaded', 'true');
        window.location.reload();
      } else {
        window.sessionStorage.removeItem('isReloaded');
      }
    }
  }
  newsLetterSubmit() {
    if (!this.newsEmail) {
      this.toastr.error('Email is required');
      return;
    }
    this.toastr.success('Thankyou for subscribing');
  }
}
