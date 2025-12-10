import { Component, AfterViewInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormDataService } from '../../services/form-data.service';
import { ToastrService } from 'ngx-toastr';
import { ScheduleCallCTAComponent } from '../../common/schedule-call-cta/schedule-call-cta.component';
import { CommonModule } from '@angular/common';
import { CommonService } from '../../services/common.service';
import { HomeTestimonialsComponent } from '../../common/home-testimonials/home-testimonials.component';
import { HomeService } from '../../services/home.service';
import { FaqService } from '../../services/faq.service';
import { TestimonialService } from '../../services/testimonial.service';
import { MvpPortfolioComponent } from '../../common/mvp-portfolio/mvp-portfolio.component';

declare var Swiper: any;
declare var jQuery: any;

@Component({
  selector: 'app-rag-as-a-service',
  standalone: true,
  imports: [
    RouterModule,
    ScheduleCallCTAComponent,
    CommonModule,
    HomeTestimonialsComponent,
    MvpPortfolioComponent
  ],
  templateUrl: './rag-as-a-service.component.html',
  styleUrl: './rag-as-a-service.component.scss',
})
export class RagAsAServiceComponent implements AfterViewInit { 
  constructor(
    private meta: Meta,
    private formDataService: FormDataService,
    private router: RouterModule,
    private toastr: ToastrService,
    private title: Title,
    private common: CommonService,
    private homeService: HomeService,
    private faqService: FaqService,
    private testimonialService: TestimonialService
  ) {
    this.meta.addTag({ name: 'title', content: 'RAG as a Service - Distinct Cloud Labs' });
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
  testimonials: any = [];
  ctaDetails: any = [];
  faqs: any = [];

  // FAQ accordion state
  activeFaqId: string | null = 'faqcollapseOne';

  toggleFaq(faqId: string): void {
    this.activeFaqId = this.activeFaqId === faqId ? null : faqId;
  }

  isFaqOpen(faqId: string): boolean {
    return this.activeFaqId === faqId;
  }

  ngOnInit(): void {
    this.meta.updateTag({
      name: 'title',
      content: 'RAG as a Service - Build Your RAG in Minutes | Distinct Cloud Labs',
    });
    this.meta.updateTag({
      name: 'description',
      content: 'Build your RAG in minutes and deploy in your own cloud. Get enterprise-grade Retrieval-Augmented Generation infrastructure with our RAG as a Service solution.',
    });

    this.getTestimonials();
    if (this.common.isBrowser()) {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    }
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
            280: { slidesPerView: 1 },
            386: { slidesPerView: 1 },
            576: { slidesPerView: 1 },
            768: { slidesPerView: 2, spaceBetween: 15 },
            992: { slidesPerView: 1, spaceBetween: 20 },
            1200: { slidesPerView: 2, spaceBetween: 15 },
            1400: { slidesPerView: 2 },
          },
        });
      }, 100);
    }
  }

  swiperinitTestimonial() {
    if (this.common.isBrowser()) {
      window.setTimeout(() => {
        var swiper = new Swiper('.home3-testimonial-slider', {
          slidesPerView: 3,
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

  swiperinitProcessSlider() {
    if (this.common.isBrowser()) {
      window.setTimeout(() => {
        try {
          const swiperElement = document.querySelector('.process-slider');
          if (swiperElement && typeof Swiper !== 'undefined') {
            const existingSwiper = (swiperElement as any).swiper;
            if (existingSwiper) {
              existingSwiper.destroy(true, true);
            }

            var swiper = new Swiper('.process-slider', {
              slidesPerView: 1,
              speed: 1500,
              spaceBetween: 25,
              loop: true,
              navigation: {
                nextEl: '.process-slider-next',
                prevEl: '.process-slider-prev',
              },
              breakpoints: {
                280: { slidesPerView: 1 },
                576: { slidesPerView: 1 },
                768: { slidesPerView: 2, spaceBetween: 20 },
                992: { slidesPerView: 3, spaceBetween: 25 },
                1200: { slidesPerView: 3, spaceBetween: 25 },
              },
            });
          }
        } catch (error) {
          console.error('Error initializing process slider:', error);
        }
      }, 200);
    }
  }

  getTestimonials() {
    this.testimonialService.fetchTestimonials().subscribe((res: any) => {
      this.testimonials = res.items;
      this.swiperinitTestimonial();
    });
  }

  ngAfterViewInit(): void {
    if (this.common.isBrowser()) {
      setTimeout(() => {
        this.initializeMarquee();
        this.swiperinitProcessSlider();
      }, 100);
    }
  }

  initializeMarquee(): void {
    if (this.common.isBrowser() && typeof jQuery !== 'undefined' && jQuery.fn.marquee) {
      const marqueeElement = jQuery('app-rag-as-a-service .marquee_text');
      if (marqueeElement.length > 0) {
        try {
          marqueeElement.marquee('destroy');
        } catch (e) {}
        marqueeElement.marquee({
          duration: 20000,
          gap: 50,
          duplicated: true,
          direction: 'left',
          pauseOnHover: true,
          startVisible: true
        });
      }
    }
  }
}

