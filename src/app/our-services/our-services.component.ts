import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonService } from '../services/common.service';
import { ToastrService } from 'ngx-toastr';
import { OurServicesService } from '../services/our-services.service';
import { TestimonialService } from '../services/testimonial.service';
import { CommonModule } from '@angular/common';
import { HomeTestimonialsComponent } from '../common/home-testimonials/home-testimonials.component';
import { TestimonialCardComponent } from '../common/testimonial-card/testimonial-card.component';
import { ServiceBannerComponent } from '../common/service-banner/service-banner.component';
declare var Swiper: any;

@Component({
  selector: 'app-our-services',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TestimonialCardComponent,
    ServiceBannerComponent,
  ],
  templateUrl: './our-services.component.html',
  styleUrl: './our-services.component.scss',
})
export class OurServicesComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private meta: Meta,
    private title: Title,
    private common: CommonService,
    private toastr: ToastrService,
    private ourServices: OurServicesService,
    private testimonialService: TestimonialService
  ) {}
  pageType: any;
  services: any = [];
  loading: boolean = true;
  testimonialsArray: any = [];
  reversedTestimonials: any = [];
  testimonials: any = [];
  isLoading: boolean = false;
  isProductDiscovery: boolean = false;
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.pageType = params?.['type'];

      if (this.pageType === 'product-discovery') {
        this.isProductDiscovery = true;
        //metaTags
        this.meta.updateTag({
          name: 'title',
          content: 'Product Discovery',
        });
        this.meta.updateTag({
          name: 'description',
          content: 'Rapidly Validate Your Idea Using Product Discovery.',
        });
        this.setTitle('What Is Product Discovery? | Distinct Cloud Labs');
      }
      // else if (this.pageType === 'design') {
      //   //metaTags
      //   this.meta.updateTag({
      //     name: 'title',
      //     content: 'Design',
      //   });
      //   this.meta.updateTag({
      //     name: 'description',
      //     content:
      //       'A dedicated development team is a popular partnership model in software development, facilitating remote collaboration between clients and developers.',
      //   });
      //   this.setTitle(
      //     'Dedicated Development Team: What Is It And ... - Distinct Cloud Labs'
      //   );
      // }

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
  }
  setTitle(newTitle: string) {
    this.title.setTitle(newTitle);
  }

  getServices() {
    this.ourServices.getServices().subscribe((res: any) => {
      // console.log('services:', res);
      this.loading = false;
      this.swiperinitTestimonial();
      this.swiperinit();

      this.services = res?.items.filter((item: any) => {
        if (
          item.data.testimonials &&
          item.data['identifier-slug'].iv === this.pageType
        ) {
          this.testimonialsArray.push(item.data);
          for (let i = item.data.testimonials.iv.length - 1; i >= 0; i--) {
            this.reversedTestimonials.push(item.data.testimonials.iv[i]);
          }
        }
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
}
