import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { EngagementModelsComponent } from '../common/engagement-models/engagement-models.component';
import { HiringProcessComponent } from '../common/hiring-process/hiring-process.component';
import { HomeTestimonialsComponent } from '../common/home-testimonials/home-testimonials.component';
import { ScheduleCallCTAComponent } from '../common/schedule-call-cta/schedule-call-cta.component';
import { TestimonialCardComponent } from '../common/testimonial-card/testimonial-card.component';
import { CommonService } from '../services/common.service';
import { HomeService } from '../services/home.service';
import { TestimonialService } from '../services/testimonial.service';
declare var Swiper: any;
@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [
    TestimonialCardComponent,
    HomeTestimonialsComponent,
    RouterModule,
    EngagementModelsComponent,
    ScheduleCallCTAComponent,
    HiringProcessComponent,
  ],
})
export class HomeComponent implements OnInit {
  constructor(
    private testimonialService: TestimonialService,
    private homeService: HomeService,
    private common: CommonService,
    private meta: Meta,
    private title: Title
  ) {
    this.title.setTitle("Distinct Cloud Labs | Empower Your Business with AI and ML ");

    this.meta.addTags([
      {
        name: "description",
        content:
          "Transform your business with Distinct Cloud Labs' AI enablement services. From tailored AI strategies to custom development, seamless integration, and expert training, we help you unlock growth and innovation with cutting-edge AI solutions.",
      },
      { property: "og:title", content: "Home" },
      {
        property: "og:description",
        content:
          "Transform your business with Distinct Cloud Labs' AI enablement services. From tailored AI strategies to custom development, seamless integration, and expert training, we help you unlock growth and innovation with cutting-edge AI solutions.",
      },
      {
        property: "twitter:title",
        content: "Distinct Cloud Labs | Empower Your Business with AI and ML",
      },
      {
        property: "twitter:description",
        content:
          "Transform your business with Distinct Cloud Labs' AI enablement services. From tailored AI strategies to custom development, seamless integration, and expert training, we help you unlock growth and innovation with cutting-edge AI solutions.",
      },
    ]);
  }

  testimonials: any = [];
  currentIndex: number = 0;
  currentTestimonial: any;
  ctaDetails: any = [];
  engagementModels: any = [];

  ngOnInit(): void {
    this.testimonialService.fetchTestimonials().subscribe((res: any) => {
      this.testimonials = res.items;
      this.swiperinitTestimonial();
    });
    this.getCTA();

    if (this.common.isBrowser()) {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    }
  }
  swiperinitTestimonial() {
    if (this.common.isBrowser()) {
      window.setTimeout(() => {
        var swiper = new Swiper('.home3-testimonial-slider', {
          slidesPerView: 2,
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

  getCTA() {
    this.homeService.getCTA().then((res) => {
      this.ctaDetails = res.items;
    });
  }

  getEngagementModels() {
    this.homeService.getEngagementModels().then((res) => {
      this.engagementModels = res.items;
    });
  }
}
