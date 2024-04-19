import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { TestimonialCardComponent } from '../../common/testimonial-card/testimonial-card.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CaseStudySliderComponent } from '../../common/case-study-slider/case-study-slider.component';
import { ServiceBannerComponent } from '../../common/service-banner/service-banner.component';
import { FormDataService } from '../../services/form-data.service';
import { ToastrService } from 'ngx-toastr';
import { ScheduleCallCTAComponent } from '../../common/schedule-call-cta/schedule-call-cta.component';
import { EngagementModelsComponent } from '../../common/engagement-models/engagement-models.component';
import { HiringProcessComponent } from '../../common/hiring-process/hiring-process.component';
import { SolutionsService } from '../../services/solutions.service';
import { CommonModule } from '@angular/common';
import { CommonService } from '../../services/common.service';

declare var Swiper: any;

@Component({
  selector: 'app-solution',
  standalone: true,
  imports: [
    CaseStudySliderComponent,
    TestimonialCardComponent,
    RouterModule,
    ServiceBannerComponent,
    EngagementModelsComponent,
    ScheduleCallCTAComponent,
    HiringProcessComponent,
    CommonModule,
  ],
  templateUrl: './solution.component.html',
  styleUrl: './solution.component.scss',
})
export class SolutionComponent {
  constructor(
    private meta: Meta,
    private route: ActivatedRoute,
    private formDataService: FormDataService,
    private router: Router,
    private toastr: ToastrService,
    private solutionsService: SolutionsService,
    private title: Title,
    private common: CommonService
  ) {
    this.meta.addTag({ name: 'title', content: 'Home page' });
  }

  posts: any = [];
  currentIndex: number = 0;
  id!: string;
  currentTestimonial: any;
  isLoading: boolean = false;
  pageType: any;
  initialHeader: string = '';
  mainHeader: string = '';
  description: string = '';
  buttonCta: string = '';
  solutions: any = [];
  loading: boolean = true;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.pageType = params?.['type'];
      if (this.pageType === 'front-end') {
        //metaTags
        this.meta.updateTag({
          name: 'title',
          content: 'Front-End Development Services - Distinct Cloud Labs',
        });
        this.meta.updateTag({
          name: 'description',
          content:
            'Deploy front-end development experts with a visionary approach to crafting captivating user interfaces. Create highly tailored, meticulously designed…',
        });
        this.title.setTitle("Front-End Development Services - Distinct Cloud Labs");
      } else if (this.pageType === 'back-end') {
        //metaTags
        this.meta.updateTag({
          name: 'title',
          content: 'Backend Development Services - Distinct Cloud Labs',
        });
        this.meta.updateTag({
          name: 'description',
          content:
            'Distinct Cloud Labs is a leading back-end development company ⚡ Our experts create effective solutions to cover all your business requirements.',
        });
        this.title.setTitle("Backend Development Services - Distinct Cloud Labs");
      } else if (this.pageType === 'mobile-app-development') {
        //metaTags

        this.meta.updateTag({
          name: 'title',
          content: 'Mobile App Development Services - Distinct Cloud Labs',
        });
        this.meta.updateTag({
          name: 'description',
          content:
            'A leading mobile app development company. 50+ mobile projects. Native iOS and Android apps. Cross-platform apps on React, Xamarin, and Flutter.',
        });

        this.title.setTitle("Mobile App Development Services - Distinct Cloud Labs");


      } else if (this.pageType === 'ai-platform-engineering') {
        //metaTags
        this.meta.updateTag({
          name: 'title',
          content: 'AI Platform Engineering Services - Distinct Cloud Labs',
        });
        this.meta.updateTag({
          name: 'description',
          content:
            'Unlock top-tier engineering expertise to craft scalable end-to-end solutions with modular architectures and reusable components.',
        });
        this.title.setTitle("AI Platform Engineering Services - Distinct Cloud Labs");

      } else if (this.pageType === 'saas-development') {
        //metaTags
        this.meta.updateTag({
          name: 'title',
          content: 'SaaS Development Services: 50+ Experts Ready To Help - Distinct Cloud Labs',
        });
        this.meta.updateTag({
          name: 'description',
          content:
            'Choose from our world-class SaaS development services to get performant, business-centric, and profitable SaaS products.',
        });
        this.title.setTitle("SaaS Development Services: 50+ Experts Ready To Help - Distinct Cloud Labs");
      }

      this.getSolutions();
      // this.getCaseStudies();
      if (this.common.isBrowser()) {
        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth',
        });
      }
    });
  }

  setTitle(newTitle: string) {
    this.title.setTitle(newTitle);
  }

  swiperinit() {
    if (this.common.isBrowser()) {
      window.setTimeout(() => {
        var swiper = new Swiper('.case-study-slider', {
          slidesPerView: 1,
          speed: 1500,
          spaceBetween: 30,
          loop: true,

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
  swiperinitTestimonial() {
    if (this.common.isBrowser()) {
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

  getSolutions() {
    this.solutionsService
      .getSolutions()
      .then((res) => {
        this.loading = false;
        this.swiperinitTestimonial();
        this.swiperinit();
        this.solutions = res?.items.filter((item: any) => {
          return item.data['identifier-slug'].iv === this.pageType;
        });
      })
      .catch((err: any) => {
        console.log(err);
        this.loading = false;
      });
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
