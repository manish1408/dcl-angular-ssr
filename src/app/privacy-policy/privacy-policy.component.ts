import { Component, ElementRef } from '@angular/core';
import { BlogService } from '../services/blog.service';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.scss'
})
export class PrivacyPolicyComponent {

  constructor(
    private el: ElementRef
  ) {}
  scrollToSection() {
    const section = this.el.nativeElement.querySelector('#blog-grid');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
