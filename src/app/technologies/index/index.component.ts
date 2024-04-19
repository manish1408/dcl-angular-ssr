import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { TestimonialCardComponent } from '../../common/testimonial-card/testimonial-card.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CaseStudySliderComponent } from '../../common/case-study-slider/case-study-slider.component';
import { ServiceBannerComponent } from '../../common/service-banner/service-banner.component';
import { FormDataService } from '../../services/form-data.service';
import { ToastrService } from 'ngx-toastr';
import { ScheduleCallCTAComponent } from '../../common/schedule-call-cta/schedule-call-cta.component';
import { TechnologiesService } from '../../services/technologies.service';
import { CommonModule } from '@angular/common';
import { EngagementModelsComponent } from '../../common/engagement-models/engagement-models.component';
import { CommonService } from '../../services/common.service';

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
    private route: ActivatedRoute,
    private formDataService: FormDataService,
    private router: Router,
    private toastr: ToastrService,
    private technologyService: TechnologiesService,
    private title: Title,
    private common: CommonService
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

        this.meta.updateTag({
          name: 'title',
          content: 'Trusted ReactJS Development Company - Distinct Cloud Labs',
        });
        this.meta.updateTag({
          name: 'description',
          content:
            'Discover ReactJS application development services for crafting highly adaptable and dynamic solutions, leveraging a robust component-based architecture.',
        });
        this.title.setTitle("Trusted ReactJS Development Company - Distinct Cloud Labs");
      } else if (this.pageType === 'angular') {
        this.meta.updateTag({
          name: 'title',
          content: 'AngularJS Development Company - Distinct Cloud Labs',
        });
        this.meta.updateTag({
          name: 'description',
          content:
            'Hire Angular developers from DistinctCloud ✓ Angular development services ✓ 5 years in web development ✓ Agile-driven culture ✓ Rich tech stack',
        });

        this.title.setTitle("AngularJS Development Company' - Distinct Cloud Labs");
      } else if (this.pageType === 'react-native') {
        this.meta.updateTag({
          name: 'title',
          content: 'React Native App Development Company - Distinct Cloud Labs',
        });
        this.meta.updateTag({
          name: 'description',
          content:
            'React Native combines the best parts of native development with React, a best-in-class JavaScript library for building user interfaces',
        });
        this.title.setTitle("React Native App Development Company - Distinct Cloud Labs");

      } else if (this.pageType === 'node') {
        //metaTags
        this.meta.updateTag({
          name: 'title',
          content: 'Node JS Development Company - Distinct Cloud Labs',
        });
        this.meta.updateTag({
          name: 'description',
          content:
            'Boost your web applications with our Node.JS development services, offering dynamic and customised solutions for your business needs.',
        });

        this.title.setTitle("Node JS Development Company - Distinct Cloud Labs");


      } else if (this.pageType === 'net') {
        //metaTags
        this.meta.updateTag({
          name: 'title',
          content: 'Custom .NET Software Development Company - Distinct Cloud Labs',
        });
        this.meta.updateTag({
          name: 'description',
          content:
            'Distinct Cloud Labs is a renowned .NET development company that offers a complete suite of .NET software development services you need for digital transformation.',
        });

        this.title.setTitle("Custom .NET Software Development Company - Distinct Cloud Labs");

      }

      this.getTechnologies();
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

  getTechnologies() {
    this.technologyService.getTechnologies().subscribe((res: any) => {
      this.loading = false;
      this.swiperinitTestimonial();
      this.swiperinit();
      this.technologies = res?.items.filter((item: any) => {
        return item.data['identifier-slug'].iv === this.pageType;
      });
    });
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
