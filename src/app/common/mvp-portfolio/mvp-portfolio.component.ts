import { Component, Input, AfterViewInit, OnDestroy, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CommonService } from '../../services/common.service';

declare var Swiper: any;

@Component({
  selector: 'app-mvp-portfolio',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './mvp-portfolio.component.html',
  styleUrl: './mvp-portfolio.component.scss',
})
export class MvpPortfolioComponent implements AfterViewInit, OnDestroy {
  @Input() heading: string = 'Our MVP Portfolio';
  private swiperInstance: any;

  constructor(
    private common: CommonService,
    private el: ElementRef
  ) {}

  ngAfterViewInit(): void {
    if (this.common.isBrowser()) {
      setTimeout(() => {
        this.swiperinitPortfolioSlider();
      }, 300);
    }
  }

  swiperinitPortfolioSlider() {
    if (this.common.isBrowser()) {
      window.setTimeout(() => {
        try {
          // Use ElementRef to scope the query to this component only
          const swiperElement = this.el.nativeElement.querySelector('.portfolio-slider');
          if (swiperElement && typeof Swiper !== 'undefined') {
            // Destroy existing instance if it exists
            if (this.swiperInstance) {
              this.swiperInstance.destroy(true, true);
              this.swiperInstance = null;
            }
            
            // Also check if Swiper already initialized on this element
            const existingSwiper = (swiperElement as any).swiper;
            if (existingSwiper) {
              existingSwiper.destroy(true, true);
            }
            
            this.swiperInstance = new Swiper(swiperElement, {
              slidesPerView: 1,
              speed: 1500,
              spaceBetween: 25,
              loop: true,
              autoplay: {
                delay: 2500,
                disableOnInteraction: false,
              },
              pagination: {
                el: this.el.nativeElement.querySelector('.pagination1'),
                clickable: true,
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
                  slidesPerView: 3,
                  spaceBetween: 15,
                },
                1200: {
                  slidesPerView: 3,
                  spaceBetween: 15,
                },
                1400: {
                  slidesPerView: 3,
                },
              },
            });
          }
        } catch (error) {
          console.error('Error initializing portfolio slider:', error);
        }
      }, 200);
    }
  }

  ngOnDestroy(): void {
    if (this.swiperInstance) {
      try {
        this.swiperInstance.destroy(true, true);
      } catch (error) {
        // Ignore errors during cleanup
      }
      this.swiperInstance = null;
    }
  }
}

