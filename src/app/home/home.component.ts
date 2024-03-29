import { Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { TestimonialCardComponent } from '../common/testimonial-card/testimonial-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [TestimonialCardComponent],
})
export class HomeComponent {
  constructor(private meta: Meta) {
    this.meta.addTag({ name: 'title', content: 'Home page' });
  }
}
