import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TestimonialService } from '../services/testimonial.service';
import { CommonService } from '../services/common.service';
import { Meta, Title } from '@angular/platform-browser';
import { HomeService } from '../services/home.service';
import { ProductPageService } from '../services/product-page.service';

declare var Swiper: any;

@Component({
  selector: 'app-product-page',
  standalone: true,
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss',
  imports: [
    CommonModule,
    RouterModule,
  ],
  host: {
    'ngSkipHydration': 'true'
  }
})
export class ProductPageComponent implements OnInit, AfterViewInit, OnDestroy {

  testimonials: any = [];
  ctaDetails: any = [];
  productName: string = '';
  productData: any;
  private swiperInstance: any;

  // Product page sections
  heroSection: any = null;
  featuresSection: any = null;
  statsSection: any = null;
  servicesSection: any = null;
  clientsSection: any = null;
  testimonialsSection: any = null;
  whyUsSection: any = null;
  pricingSection: any = null;
  ctaSection: any = null;
  faqSection: any = null;
  integrationSection: any = null;
  blogsSection: any = null;
  projectManagementSection: any = null;

  // Processed pricing data
  monthlyPlans: any[] = [];
  yearlyPlans: any[] = [];

  constructor(
    private testimonialService: TestimonialService,
    private common: CommonService,
    private meta: Meta,
    private title: Title,
    private homeService: HomeService,
    private route: ActivatedRoute,
    private productPageService: ProductPageService
  ) {
    this.meta.addTag({ name: 'title', content: 'Product page' });
  }

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      this.productName = param['productName'];
    });
    
    this.productPageService.getProduct().subscribe((res: any) => {
      this.productData = res.items[0].data;
      console.log("Page data", this.productData);
      
      // Bind all sections from the API response
      this.bindProductData();
    });
    
    this.testimonialService.fetchTestimonials().subscribe((res: any) => {
      this.testimonials = res.items;
      // Initialize Swiper after data is loaded
      this.initializeSwiper();
    });
    
    this.getCTA();

    if (this.common.isBrowser()) {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    }
  }

  ngAfterViewInit(): void {
    // Additional initialization after view is ready
    if (this.common.isBrowser()) {
      this.initializeSwiper();
    }
  }

  private initializeSwiper(): void {
    if (!this.common.isBrowser()) return;
    
    // Wait for DOM to be ready and data to be loaded
    setTimeout(() => {
      try {
        // Destroy existing instance if it exists
        if (this.swiperInstance) {
          this.swiperInstance.destroy(true, true);
        }

        // Check if the element exists before initializing
        const swiperElement = document.querySelector('.home3-testimonial-slider');
        if (swiperElement && typeof Swiper !== 'undefined') {
          this.swiperInstance = new Swiper('.home3-testimonial-slider', {
            slidesPerView: 1,
            speed: 1500,
            spaceBetween: 30,
            loop: true,
            autoplay: {
              delay: 5000,
              disableOnInteraction: false,
            },
            navigation: {
              nextEl: '.home3-testimonial-next',
              prevEl: '.home3-testimonial-prev',
            },
            pagination: {
              el: '.swiper-pagination',
              clickable: true,
            },
            on: {
              init: function () {
                console.log('Swiper initialized successfully');
              },
              error: function (error: any) {
                console.error('Swiper initialization error:', error);
              }
            }
          });
        } else {
          console.warn('Swiper element not found or Swiper not loaded');
        }
      } catch (error) {
        console.error('Error initializing Swiper:', error);
      }
    }, 200);
  }

  private bindProductData(): void {
    if (this.productData) {
      // Extract all sections from the API response
      this.heroSection = this.productData['hero-section']?.iv || null;
      this.featuresSection = this.productData['features-section']?.iv || null;
      this.statsSection = this.productData['stats-section']?.iv || null;
      this.servicesSection = this.productData['services-section']?.iv || null;
      this.clientsSection = this.productData['clients-section']?.iv || null;
      this.testimonialsSection = this.productData['testimonials-section']?.iv || null;
      this.whyUsSection = this.productData['why-us']?.iv || null;
      this.pricingSection = this.productData['pricing-section']?.iv || null;
      this.ctaSection = this.productData['CTA-section']?.iv || null;
      this.faqSection = this.productData['faq-section']?.iv || null;
      this.integrationSection = this.productData['integration-section']?.iv || null;
      this.blogsSection = this.productData['blogs-section']?.iv || null;
      
      this.projectManagementSection = this.productData['project-management-section']?.iv || null;

      // Process pricing section to separate monthly and yearly plans
      if (this.pricingSection) {
        this.processPricingData();
      }

      // Update page title and meta if hero section exists
      if (this.heroSection?.title) {
        this.title.setTitle(this.heroSection.title.title || 'Product Page');
        this.meta.updateTag({ name: 'description', content: this.heroSection.title.subtitle || '' });
      }

      console.log('All sections bound successfully:', {
        hero: !!this.heroSection,
        features: !!this.featuresSection,
        stats: !!this.statsSection,
        services: !!this.servicesSection,
        clients: !!this.clientsSection,
        testimonials: !!this.testimonialsSection,
        whyUs: !!this.whyUsSection,
        pricing: !!this.pricingSection,
        cta: !!this.ctaSection,
        faq: !!this.faqSection,
        integration: !!this.integrationSection,
        blogs: !!this.blogsSection
      });
    }
  }

  private processPricingData(): void {
    if (!this.pricingSection || !this.pricingSection['pricing-plan']) {
      console.log('No pricing data found:', this.pricingSection);
      return;
    }

    const allPlans = this.pricingSection['pricing-plan'];
    console.log('All plans from API:', allPlans);

    // Separate plans by billing cycle
    const monthlyPlans = allPlans.filter((plan: any) => 
      plan['billing-cycle']?.toLowerCase() === 'monthly'
    );
    
    const yearlyPlans = allPlans.filter((plan: any) => 
      plan['billing-cycle']?.toLowerCase() === 'yearly'
    );

    console.log('Filtered plans:', { monthlyPlans, yearlyPlans });

    // Sort monthly plans by index and process them
    this.monthlyPlans = monthlyPlans
      .sort((a: any, b: any) => a.index - b.index)
      .map((plan: any) => ({
        name: plan['plan-name'],
        price: parseInt(plan['plan-amount']),
        period: plan['billing-cycle'],
        features: plan.features?.map((feature: any) => {
          console.log('Monthly plan feature data:', feature);
          return {
            name: feature.feature,
            included: feature.isEnabled === true || feature.isEnabled === 'true'
          };
        }) || [],
        ctaText: plan['CTA-label'],
        ctaLink: plan['CTA-url'],
        isPopular: plan['plan-name'] === 'Standard Plan', // Mark Standard as popular
        discountValue: plan['discounted-value'] || null
      }));

    // Sort yearly plans by index and process them
    this.yearlyPlans = yearlyPlans
      .sort((a: any, b: any) => a.index - b.index)
      .map((plan: any) => ({
        name: plan['plan-name'],
        price: parseInt(plan['plan-amount']),
        period: plan['billing-cycle'],
        features: plan.features?.map((feature: any) => {
          console.log('Yearly plan feature data:', feature);
          return {
            name: feature.feature,
            included: feature.isEnabled === true || feature.isEnabled === 'true'
          };
        }) || [],
        ctaText: plan['CTA-label'],
        ctaLink: plan['CTA-url'],
        isPopular: plan['plan-name'] === 'Standard Plan', // Mark Standard as popular
        discountValue: plan['discounted-value'] || null
      }));

    console.log('Pricing data processed:', {
      monthlyPlans: this.monthlyPlans,
      yearlyPlans: this.yearlyPlans
    });
  }

  getCTA() {
    this.homeService.getCTA().then((res: any) => {
      this.ctaDetails = res.items;
    });
  }

  ngOnDestroy(): void {
    // Clean up Swiper instance when component is destroyed
    if (this.swiperInstance) {
      this.swiperInstance.destroy(true, true);
    }
  }

 

  // Method to get plan amount display
  getPlanAmount(plan: any): string {
    const amount = plan['plan-amount'];
    if (amount === null || amount === undefined || amount === '') {
      return 'Contact Us';
    }
    const numAmount = parseFloat(amount);
    return numAmount > 0 ? `$${numAmount}` : 'Free';
  }

  // Method to check if plan has a valid amount
  hasValidAmount(plan: any): boolean {
    const amount = plan['plan-amount'];
    if (amount === null || amount === undefined || amount === '') {
      return false;
    }
    return parseFloat(amount) > 0;
  }

  // Method to check if plan is free
  isFreePlan(plan: any): boolean {
    const amount = plan['plan-amount'];
    if (amount === null || amount === undefined || amount === '') {
      return false;
    }
    return parseFloat(amount) === 0;
  }

  // Method to check if plan should show contact us
  isContactUsPlan(plan: any): boolean {
    const amount = plan['plan-amount'];
    return amount === null || amount === undefined || amount === '';
  }

  // Method to format date from ISO string to readable format
  formatDate(isoDateString: string): { date: string, month: string } {
    if (!isoDateString) {
      return { date: '', month: '' };
    }

    try {
      const date = new Date(isoDateString);
      
      // Get day of month
      const day = date.getDate();
      
      // Get month name
      const monthNames = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
      ];
      const month = monthNames[date.getMonth()];
      
      return {
        date: day.toString(),
        month: month
      };
    } catch (error) {
      console.error('Error formatting date:', error);
      return { date: '', month: '' };
    }
  }

  // Alternative method to get just the day
  getBlogDate(isoDateString: string): string {
    if (!isoDateString) return '';
    
    try {
      const date = new Date(isoDateString);
      return date.getDate().toString();
    } catch (error) {
      console.error('Error getting blog date:', error);
      return '';
    }
  }

  // Alternative method to get just the month
  getBlogMonth(isoDateString: string): string {
    if (!isoDateString) return '';
    
    try {
      const date = new Date(isoDateString);
      const monthNames = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
      ];
      return monthNames[date.getMonth()];
    } catch (error) {
      console.error('Error getting blog month:', error);
      return '';
    }
  }


}
