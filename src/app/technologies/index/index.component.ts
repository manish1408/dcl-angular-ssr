import { Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { TestimonialCardComponent } from '../../common/testimonial-card/testimonial-card.component';
import { TestimonialService } from '../../services/testimonial.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CaseStudySliderComponent } from '../../common/case-study-slider/case-study-slider.component';
import { CaseStudyService } from '../../services/case-study.service';
import { ServiceBannerComponent } from '../../common/service-banner/service-banner.component';
import { FormDataService } from '../../services/form-data.service';
import { ToastrService } from 'ngx-toastr';
import { ScheduleCallCTAComponent } from '../../common/schedule-call-cta/schedule-call-cta.component';
import { TechnologiesService } from '../../services/technologies.service';
import { CommonModule } from '@angular/common';
import { EngagementModelsComponent } from '../../common/engagement-models/engagement-models.component';

declare var Swiper: any;

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    CaseStudySliderComponent,
    TestimonialCardComponent,
    RouterModule,
    ServiceBannerComponent,
    EngagementModelsComponent,
    ScheduleCallCTAComponent,
    CommonModule,
  ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss',
})
export class IndexComponent {
  constructor(
    private meta: Meta,
    private testimonialService: TestimonialService,
    private route: ActivatedRoute,
    private caseStudyService: CaseStudyService,
    private formDataService: FormDataService,
    private router: Router,
    private toastr: ToastrService,
    private technologyService: TechnologiesService
  ) {}

  testimonials: any = [];
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
  technologies: any = [];
  loading: boolean = true;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.pageType = params?.['type'];
      if (this.pageType === 'react') {
        //metaTags
        this.meta.addTags([
          {
            name: 'title',
            content: 'Trusted React JS Development Company',
          },
          {
            name: 'description',
            content:
              'Discover ReactJS application development services for crafting highly adaptable and dynamic solutions, leveraging a robust component-based architecture.',
          },
        ]);
      } else if (this.pageType === 'angular') {
        //metaTags
        this.meta.addTags([
          {
            name: 'title',
            content: 'AngularJS Development Company',
          },
          {
            name: 'description',
            content:
              'Hire Angular developers from DistinctCloud ✓ Angular development services ✓ 5 years in web development ✓ Agile-driven culture ✓ Rich tech stack',
          },
        ]);
      } else if (this.pageType === 'react-native') {
        //metaTags
        this.meta.addTags([
          {
            name: 'title',
            content: 'React Native App Development Company',
          },
          {
            name: 'description',
            content:
              'React Native combines the best parts of native development with React, a best-in-class JavaScript library for building user interfaces',
          },
        ]);
      } else if (this.pageType === 'node') {
        //metaTags
        this.meta.addTags([
          {
            name: 'title',
            content: 'Node JS Development Company',
          },
          {
            name: 'description',
            content:
              'Boost your web applications with our Node.JS development services, offering dynamic and customised solutions for your business needs.',
          },
        ]);
      } else if (this.pageType === 'net') {
        //metaTags
        this.meta.addTags([
          {
            name: 'title',
            content: 'Custom .NET Software Development Company',
          },
          {
            name: 'description',
            content:
              'DistinctCloudLabs is a renowned .NET development company that offers a complete suite of .NET software development services you need for digital transformation.',
          },
        ]);
      }

      this.getTechnologies();
      // this.getCaseStudies();

      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    });
  }

  getTechnologies() {
    this.technologyService.getTechnologies().subscribe((res: any) => {
      this.loading = false;
      this.swiperinitTestimonial();
      this.swiperinit();
      this.technologies = res?.items.filter((item: any) => {
        return item.data['identifier-slug'].iv === this.pageType;
      });
    });
    // console.log('technology:', this.technologies);
  }
  // getCaseStudies() {
  //   this.caseStudyService
  //     .fetchPosts()
  //     .then((resp: any) => {
  //       this.posts = resp?.items;

  //       this.swiperinit();
  //     })
  //     .catch((err: any) => {
  //       console.log(err);
  //     });
  // }

  swiperinit() {
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
