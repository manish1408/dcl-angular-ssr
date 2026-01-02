import { Component, Input, AfterViewInit, OnDestroy, ElementRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CommonService } from '../../services/common.service';
import { CaseStudyService } from '../../services/case-study.service';
import { environment } from '../../environments/environment';

declare var Swiper: any;

interface PortfolioItem {
  id: number;
  slug: string;
  title: string;
  category: string;
  image: string;
  alt: string;
}

@Component({
  selector: 'app-mvp-portfolio',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './mvp-portfolio.component.html',
  styleUrl: './mvp-portfolio.component.scss',
})
export class MvpPortfolioComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() heading: string = 'Our MVP Portfolio';
  portfolioItems: PortfolioItem[] = [];
  private swiperInstance: any;

  constructor(
    private common: CommonService,
    private el: ElementRef,
    private caseStudyService: CaseStudyService
  ) {}

  ngOnInit(): void {
    this.caseStudyService.fetchPortfolio().subscribe({
      next: (resp: any) => {
        // Map API response to PortfolioItem structure
        this.portfolioItems = (resp?.items || []).map((item: any, index: number) => {
          const imageId = item?.data?.image?.iv?.[0];
          const imageUrl = imageId 
            ? `${environment.squidexAssets}distinct-cloud-labs/${imageId}`
            : '';
          
          return {
            id: index + 1,
            slug: item?.data?.slug?.iv || '',
            title: item?.data?.title?.iv || '',
            category: item?.data?.category?.iv || '',
            image: imageUrl,
            alt: item?.data?.title?.iv || 'Portfolio Image'
          };
        });
        
        // Reinitialize Swiper after data loads
        if (this.common.isBrowser()) {
          setTimeout(() => {
            this.swiperinitPortfolioSlider();
          }, 300);
        }
      },
      error: (error) => {
        console.error('Error loading portfolio data:', error);
      }
    });
  }

  ngAfterViewInit(): void {
    // Swiper initialization is now handled in ngOnInit after data loads
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

