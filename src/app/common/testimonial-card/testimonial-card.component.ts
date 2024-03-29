import { Component, OnInit } from '@angular/core';
import { TestimonialService } from '../../services/testimonial.service';

@Component({
  selector: 'app-testimonial-card',
  standalone: true,
  imports: [],
  templateUrl: './testimonial-card.component.html',
  styleUrl: './testimonial-card.component.scss',
})
export class TestimonialCardComponent implements OnInit {
  constructor(private testimonialService: TestimonialService) {}

  ngOnInit(): void {
    this.testimonialService.fetchTestimonials().then((res) => {
      console.log('testimonials:', res.items);
    });
  }
}
