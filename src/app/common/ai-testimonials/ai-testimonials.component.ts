import { Component } from '@angular/core';
import { TestimonialService } from '../../services/testimonial.service';
import { finalize } from 'rxjs';
import { SummaryPipe } from '../../_pipes/summary.pipe';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-ai-testimonials',
  standalone: true,
  imports: [CommonModule, SummaryPipe, RouterModule],
  templateUrl: './ai-testimonials.component.html',
  styleUrl: './ai-testimonials.component.scss',
})
export class AiTestimonialsComponent {
  testimonials: any = [];

  loading = false;
  constructor(private testimonialService: TestimonialService) {}

  ngOnInit(): void {
    this.loading = true;

    this.testimonialService
      .fetchTestimonials()
      .pipe(finalize(() => (this.loading = false)))
      .subscribe((res: any) => {
        this.testimonials = res.items;
      });
  }
}
