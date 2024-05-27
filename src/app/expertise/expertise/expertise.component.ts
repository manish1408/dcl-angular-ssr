import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CaseStudySliderComponent } from '../../common/case-study-slider/case-study-slider.component';
import { ServiceBannerComponent } from '../../common/service-banner/service-banner.component';
import { HomeTestimonialsComponent } from '../../common/home-testimonials/home-testimonials.component';
import { ScheduleCallCTAComponent } from '../../common/schedule-call-cta/schedule-call-cta.component';
import { EngagementModelsComponent } from '../../common/engagement-models/engagement-models.component';
import { HiringProcessComponent } from '../../common/hiring-process/hiring-process.component';
import { HomeService } from '../../services/home.service';
import { TestimonialService } from '../../services/testimonial.service';
import { CommonModule } from '@angular/common';
import { CommonService } from '../../services/common.service';
import { ExpertiseBannerComponent } from '../../common/expertise-banner/expertise-banner.component';

declare var Swiper: any;

@Component({
  selector: 'app-expertise',
  standalone: true,
  imports: [
    CaseStudySliderComponent,
    HomeTestimonialsComponent,
    ExpertiseBannerComponent,
    RouterModule,
    ServiceBannerComponent,
    EngagementModelsComponent,
    ScheduleCallCTAComponent,
    HiringProcessComponent,
    CommonModule,
  ],
  templateUrl: './expertise.component.html',
  styleUrl: './expertise.component.scss',
})
export class ExperiseComponent {
  constructor(
    private meta: Meta,
    private route: ActivatedRoute,
    private testimonialService: TestimonialService,
    private homeService: HomeService,
    private title: Title,
    private common: CommonService
  ) {
    this.meta.addTag({ name: 'title', content: 'Home page' });
  }

  posts: any = [];
  currentIndex: number = 0;
  id!: string;
  isLoading: boolean = false;
  pageType: any;
  initialHeader: string = '';
  mainHeader: string = '';
  description: string = '';
  buttonCta: string = '';
  solutions: any = [];
  loading: boolean = true;
  testimonialsArray: any = [];
  reversedTestimonials: any = [];

  testimonials: any = [];
  currentTestimonial: any;
  ctaDetails: any = [];
  engagementModels: any = [];

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
        this.title.setTitle(
          'Front-End Development Services - Distinct Cloud Labs'
        );
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
        this.title.setTitle(
          'Backend Development Services - Distinct Cloud Labs'
        );
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

        this.title.setTitle(
          'Mobile App Development Services - Distinct Cloud Labs'
        );
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
        this.title.setTitle(
          'AI Platform Engineering Services - Distinct Cloud Labs'
        );
      } else if (this.pageType === 'saas-development') {
        //metaTags
        this.meta.updateTag({
          name: 'title',
          content:
            'SaaS Development Services: 50+ Experts Ready To Help - Distinct Cloud Labs',
        });
        this.meta.updateTag({
          name: 'description',
          content:
            'Choose from our world-class SaaS development services to get performant, business-centric, and profitable SaaS products.',
        });
        this.title.setTitle(
          'SaaS Development Services: 50+ Experts Ready To Help - Distinct Cloud Labs'
        );
      }

      this.testimonialService.fetchTestimonials().subscribe((res: any) => {
        this.testimonials = res.items;
        this.swiperinitTestimonial();
      });
      this.getCTA();

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
}
