import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { TestimonialCardComponent } from '../common/testimonial-card/testimonial-card.component';
import { TestimonialService } from '../services/testimonial.service';
import { RouterModule } from '@angular/router';
import { EngagementModelsComponent } from '../common/engagement-models/engagement-models.component';
import { ScheduleCallCTAComponent } from '../common/schedule-call-cta/schedule-call-cta.component';
declare var Swiper: any;
@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [TestimonialCardComponent, RouterModule, EngagementModelsComponent, ScheduleCallCTAComponent],
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
  currentTestimonial: any;

  ngOnInit(): void {
    this.testimonialService.fetchTestimonials().then((res) => {
      this.testimonials = res.items;
      this.swiperinitTestimonial();
    });
  }
  swiperinitTestimonial() {
    window.setTimeout(() => {
      var swiper = new Swiper('.home3-testimonial-slider', {
        slidesPerView: 1,
        speed: 1500,
        spaceBetween: 30,
        navigation: {
          nextEl: '.home3-testimonial-next',
          prevEl: '.home3-testimonial-prev',
        },
      });
    }, 100);
  }
}
