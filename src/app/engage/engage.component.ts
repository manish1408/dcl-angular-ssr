import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { TestimonialCardComponent } from '../common/testimonial-card/testimonial-card.component';
import { TestimonialService } from '../services/testimonial.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CaseStudySliderComponent } from '../common/case-study-slider/case-study-slider.component';
import { CaseStudyService } from '../services/case-study.service';
import { ServiceBannerComponent } from '../common/service-banner/service-banner.component';
import { FormDataService } from '../services/form-data.service';
import { ToastrService } from 'ngx-toastr';
import { ScheduleCallCTAComponent } from '../common/schedule-call-cta/schedule-call-cta.component';
import { OurServicesService } from '../services/our-services.service';
import { CommonModule } from '@angular/common';
import { CommonService } from '../services/common.service';

declare var Swiper: any;

@Component({
  selector: 'app-engage',
  standalone: true,
  imports: [
    CaseStudySliderComponent,
    TestimonialCardComponent,
    RouterModule,
    ServiceBannerComponent,
    ScheduleCallCTAComponent,
    CommonModule,
  ],
  templateUrl: './engage.component.html',
  styleUrl: './engage.component.scss',
})
export class EngageComponent {
  constructor(
    private meta: Meta,
    private testimonialService: TestimonialService,
    private route: ActivatedRoute,
    private caseStudyService: CaseStudyService,
    private formDataService: FormDataService,
    private router: Router,
    private toastr: ToastrService,
    private ourServices: OurServicesService,
    private common: CommonService,
    private title: Title
  ) {
    // this.setTitle('Services');
  }
  setTitle(newTitle: string) {
    this.title.setTitle(newTitle);
  }

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
  services: any = [];
  loading: boolean = true;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.pageType = params?.['type'];
      if (this.pageType === 'staff-augmentation') {
        //metaTags
        this.meta.updateTag({
          name: 'title',
          content: 'What Is Staff Augmentation? | DistinctCloudLabs',
        });
        this.meta.updateTag({
          name: 'description',
          content:
            'Staff augmentation is a powerful model that organizations can leverage to increase agility and respond to the changing needs of the enterprise.',
        });
      } else if (this.pageType === 'dedicated-teams') {
        //metaTags
        this.meta.updateTag({
          name: 'title',
          content:
            'Dedicated Development Team: What Is It And ... - DistinctCloudLabs',
        });
        this.meta.updateTag({
          name: 'description',
          content:
            'A dedicated development team is a popular partnership model in software development, facilitating remote collaboration between clients and developers.',
        });
      } else if (this.pageType === 'software-outsourcing') {
        //metaTags

        this.meta.updateTag({
          name: 'title',
          content:
            'Software Development Outsourcing: Everything You Need … - DistinctCloudLabs',
        });
        this.meta.updateTag({
          name: 'description',
          content:
            'Outsource your project to a leading IT company and get your needs met. End-to-end software development outsourcing services. ⭐ 360+ successful projects.',
        });
      }
      // fetch services
      this.getServices();

      if (this.common.isBrowser()) {
        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth',
        });
      }
    });

    // this.testimonialService.fetchTestimonials().subscribe((res) => {
    //   this.testimonials = res?.items;
    //   this.swiperinitTestimonial();
    // });
    // this.caseStudyService
    //   .fetchPosts()
    //   .then((resp: any) => {
    //     this.posts = resp?.items;

    //     this.swiperinit();
    //   })
    //   .catch((err: any) => {
    //   });
  }

  getServices() {
    this.ourServices.getServices().subscribe((res: any) => {
      this.loading = false;
      this.swiperinitTestimonial();
      this.swiperinit();
      this.services = res?.items.filter((item: any) => {
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
