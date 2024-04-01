import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { TestimonialCardComponent } from '../common/testimonial-card/testimonial-card.component';
import { TestimonialService } from '../services/testimonial.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [TestimonialCardComponent],
})
export class HomeComponent implements OnInit {
  constructor(
    private meta: Meta,
    private testimonialService: TestimonialService
  ) {
    this.meta.addTag({ name: 'title', content: 'Home page' });
  }

  testimonials: any = [];

  ngOnInit(): void {
    this.testimonialService.fetchTestimonials().then((res) => {
      console.log('testimonials:', res.items);
      this.testimonials = res.items;
    });
  }
}
