import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  currentIndex: number = 0;

  ngOnInit(): void {
    this.testimonialService.fetchTestimonials().then((res) => {
      console.log('testimonials:', res.items);
      this.testimonials = res.items;
    });
  }
  onNextClick(): void {
    if (this.currentIndex < this.testimonials.length - 1) {
      this.currentIndex++;
      console.log(this.currentIndex);
    }
  }

  onPrevClick(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      console.log(this.currentIndex);
    }
  }
}
