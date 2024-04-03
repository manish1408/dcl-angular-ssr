import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { TestimonialCardComponent } from '../common/testimonial-card/testimonial-card.component';
import { TestimonialService } from '../services/testimonial.service';
import { Router, RouterModule } from '@angular/router';
import { CaseStudySliderComponent } from '../common/case-study-slider/case-study-slider.component';
import { CaseStudyService } from '../services/case-study.service';
import { ServiceBannerComponent } from '../common/service-banner/service-banner.component';
import { FormDataService } from '../services/form-data.service';
import { ToastrService } from 'ngx-toastr';

declare var Swiper: any;

@Component({
  selector: 'app-engage',
  standalone: true,
  imports: [
    CaseStudySliderComponent,
    TestimonialCardComponent,
    RouterModule,
    ServiceBannerComponent,
  ],
  templateUrl: './engage.component.html',
  styleUrl: './engage.component.scss',
})
export class EngageComponent {
  constructor(
    private meta: Meta,
    private testimonialService: TestimonialService,
    private caseStudyService: CaseStudyService,
    private formDataService: FormDataService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.meta.addTag({ name: 'title', content: 'Home page' });
  }

  testimonials: any = [];
  posts: any = [];
  currentIndex: number = 0;
  id!: string;
  currentTestimonial: any;
  isLoading: boolean = false;

  ngOnInit(): void {
    this.testimonialService.fetchTestimonials().then((res) => {
      this.testimonials = res.items;

      this.currentTestimonial = this.testimonials[this.currentIndex];
    });
    this.caseStudyService
      .fetchPosts()
      .then((resp: any) => {
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
  onSubmit(formValues: any) {
    if (formValues.valid) {
      this.isLoading = true;
      this.formDataService
        .saveScheduleCall(formValues.value)
        .subscribe((res) => {
          this.isLoading = false;
          if (res.result === 1) {
            this.id = res.data._id;
            this.router.navigate(
              ['/schedule-call/contact-information', this.id],
              { queryParams: { services: 'true' } }
            );
          }
        }),
        (error: any) => {
          this.isLoading = false;
          console.error('Error occurred:', error);
          this.toastr.error('Something went wrong. Please try again.');
        };
    }
  }
}
