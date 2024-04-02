import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { TestimonialCardComponent } from '../common/testimonial-card/testimonial-card.component';
import { TestimonialService } from '../services/testimonial.service';
import { RouterModule } from '@angular/router';
import { CaseStudySliderComponent } from '../common/case-study-slider/case-study-slider.component';
import { CaseStudyService } from '../services/case-study.service';

declare var Swiper: any;

@Component({
  selector: 'app-engage',
  standalone: true,
  imports: [CaseStudySliderComponent, TestimonialCardComponent, RouterModule],
  templateUrl: './engage.component.html',
  styleUrl: './engage.component.scss',
})
export class EngageComponent {
  constructor(
    private meta: Meta,
    private testimonialService: TestimonialService,
    private caseStudyService: CaseStudyService
  ) {
    this.meta.addTag({ name: 'title', content: 'Home page' });
  }

  testimonials: any = [];
  posts: any = [];
  currentIndex: number = 0;

  currentTestimonial: any;

  ngOnInit(): void {
    this.testimonialService.fetchTestimonials().then((res) => {
      this.testimonials = res.items;

      this.currentTestimonial = this.testimonials[this.currentIndex];
    });
    this.caseStudyService
      .fetchPosts()
      .then((resp: any) => {
        console.log(resp);
        this.posts = resp?.items;

        this.swiperinit();
      })
      .catch((err: any) => {
        console.log(err);
      });
  }
  onNextClick(): void {
    if (this.currentIndex < this.testimonials.length - 1) {
      this.currentIndex++;
      this.currentTestimonial = this.testimonials[this.currentIndex];
    }
  }

  onPrevClick(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.currentTestimonial = this.testimonials[this.currentIndex];
    }
  }

  swiperinit() {
    window.setTimeout(() => {
      var swiper = new Swiper('.case-study-slider', {
        slidesPerView: 1,
        speed: 1500,
        spaceBetween: 30,
        loop: true,
        // autoplay: {
        // 	delay: 2500, // Autoplay duration in milliseconds
        // 	disableOnInteraction: false,
        // },
        navigation: {
          nextEl: '.case-study-slider-next',
          prevEl: '.case-study-slider-prev',
        },

        breakpoints: {
          280: {
            slidesPerView: 1,
          },
          386: {
            slidesPerView: 1,
          },
          576: {
            slidesPerView: 1,
            spaceBetween: 15,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          992: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          1200: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          1400: {
            slidesPerView: 2,
          },
        },
      });
    }, 100);
  }
}
