import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TestimonialService } from '../services/testimonial.service';
import { CommonService } from '../services/common.service';
import { Meta, Title } from '@angular/platform-browser';
import { HomeService } from '../services/home.service';
import { ProductPageService } from '../services/product-page.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

declare var Swiper: any;

@Component({
  selector: 'app-product-page',
  standalone: true,
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss',
  imports: [CommonModule, RouterModule],
  host: {
    ngSkipHydration: 'true',
  },
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

  // Processed pricing data
  monthlyPlans: any[] = [];
  yearlyPlans: any[] = [];

  // Active tab tracking
  activeTabIndex: number = 0;

  // Video modal
  videoUrl: string = '';

  // Feature image modal
  selectedFeatureImage: string = '';
  isFeatureImageModalOpen: boolean = false;
  selectedFeature: any = null;

  setActiveTab(index: number): void {
    this.activeTabIndex = index;
  }

  constructor(
    private testimonialService: TestimonialService,
    private common: CommonService,
    private meta: Meta,
    private title: Title,
    private homeService: HomeService,
    private route: ActivatedRoute,
    private productPageService: ProductPageService,
    private sanitizer: DomSanitizer
  ) {
    this.meta.addTag({ name: 'title', content: 'Product page' });
  }

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      this.productName = param['productName'];
    });

    this.productPageService.getProduct().subscribe((res: any) => {
      this.productData = res.items[0].data;
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
      this.initializeBootstrapTabs();
      
      // Ensure pricing data is processed after view is ready
      setTimeout(() => {
        if (this.pricingSection && (this.monthlyPlans.length === 0 && this.yearlyPlans.length === 0)) {
          console.log('Re-processing pricing data after view init');
          this.processPricingData();
        }
      }, 500);
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
        const swiperElement = document.querySelector(
          '.home3-testimonial-slider'
        );
        if (swiperElement && typeof Swiper !== 'undefined') {
          this.swiperInstance = new Swiper('.home3-testimonial-slider', {
            slidesPerView: 3,
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
              error: function (error: any) {
                console.error('Swiper initialization error:', error);
              },
            },
          });
        }
      } catch (error) {
        console.error('Error initializing Swiper:', error);
      }
    }, 200);
  }

  private initializeBootstrapTabs(): void {
    if (!this.common.isBrowser()) return;

    // Wait for DOM to be ready and data to be loaded
    setTimeout(() => {
      try {
        const tabElements = document.querySelectorAll('[data-bs-toggle="tab"]');
        tabElements.forEach((tab) => {
          tab.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = tab.getAttribute('data-bs-target');
            if (targetId) {
              this.showTab(targetId);
            }
          });
        });
      } catch (error) {
        console.error('Error initializing Bootstrap tabs:', error);
      }
    }, 300);
  }

  private showTab(targetId: string): void {
    // Hide all tab panes
    const allTabPanes = document.querySelectorAll('.tab-pane');
    allTabPanes.forEach((pane) => {
      pane.classList.remove('show', 'active');
    });

    // Remove active class from all tab buttons
    const allTabButtons = document.querySelectorAll('.nav-link');
    allTabButtons.forEach((button) => {
      button.classList.remove('active');
      button.setAttribute('aria-selected', 'false');
    });

    // Show the target tab pane
    const targetPane = document.querySelector(targetId);
    if (targetPane) {
      targetPane.classList.add('show', 'active');
    }

    // Activate the clicked tab button
    const activeButton = document.querySelector(
      `[data-bs-target="${targetId}"]`
    );
    if (activeButton) {
      activeButton.classList.add('active');
      activeButton.setAttribute('aria-selected', 'true');
    }
  }

  private bindProductData(): void {
    if (this.productData) {
      // Extract all sections from the API response
      this.heroSection = this.productData['hero-section']?.iv || null;
      this.featuresSection = this.productData['features-section']?.iv || null;
      this.statsSection = this.productData['stats-section']?.iv || null;
      this.servicesSection = this.productData['services-section']?.iv || null;
      this.clientsSection = this.productData['clients-section']?.iv || null;
        this.testimonialsSection =
          this.productData['testimonials-section']?.iv || null;
        this.whyUsSection = this.productData['why-us']?.iv || null;
      this.pricingSection = this.productData['pricing-section']?.iv || null;
      console.log('Pricing section loaded:', this.pricingSection);
      this.ctaSection = this.productData['CTA-section']?.iv || null;
      this.faqSection = this.productData['faq-section']?.iv || null;
      this.integrationSection =
        this.productData['integration-section']?.iv || null;
      this.blogsSection = this.productData['blogs-section']?.iv || null;

      // Process pricing section to separate monthly and yearly plans
      if (this.pricingSection) {
        this.processPricingData();
      } else {
        console.log('No pricing section found, initializing empty arrays');
        this.monthlyPlans = [];
        this.yearlyPlans = [];
      }

      // Update page title and meta if hero section exists
      if (this.heroSection?.title) {
        this.title.setTitle(this.heroSection.title.title || 'Product Page');
        this.meta.updateTag({
          name: 'description',
          content: this.heroSection.title.subtitle || '',
        });
      }

      // Reinitialize Bootstrap tabs after data is loaded
      if (this.common.isBrowser()) {
        setTimeout(() => {
          this.initializeBootstrapTabs();
        }, 100);
      }

      // Auto-select first feature if available
      if (
        this.whyUsSection &&
        this.whyUsSection['more-features'] &&
        this.whyUsSection['more-features'].length > 0
      ) {
        setTimeout(() => {
          this.selectFirstFeature();
        }, 200);
      }
    }
  }

  private processPricingData(): void {
    if (!this.pricingSection || !this.pricingSection['pricing-plan']) {
      console.log('Pricing section or pricing-plan not found:', this.pricingSection);
      return;
    }

    const allPlans = this.pricingSection['pricing-plan'];
    console.log('All plans found:', allPlans);

    // Separate plans by billing cycle
    const monthlyPlans = allPlans.filter(
      (plan: any) => plan['billing-cycle']?.toLowerCase() === 'monthly'
    );

    const yearlyPlans = allPlans.filter(
      (plan: any) => plan['billing-cycle']?.toLowerCase() === 'yearly'
    );

    // Sort monthly plans by index and process them
    this.monthlyPlans = monthlyPlans
      .sort((a: any, b: any) => a.index - b.index)
      .map((plan: any) => ({
        name: plan['plan-name'],
        price: parseInt(plan['plan-amount']),
        period: plan['billing-cycle'],
        features:
          plan.features?.map((feature: any) => ({
            name: feature.feature,
            included:
              feature.isEnabled === true || feature.isEnabled === 'true',
          })) || [],
        ctaText: plan['CTA-label'],
        ctaLink: plan['CTA-url'],
        isPopular: plan['plan-name'] === 'Standard Plan', // Mark Standard as popular
        discountValue: plan['discounted-value'] || null,
      }));

    console.log('Processed monthly plans:', this.monthlyPlans);
    console.log('Processed yearly plans:', this.yearlyPlans);

    // Sort yearly plans by index and process them
    this.yearlyPlans = yearlyPlans
      .sort((a: any, b: any) => a.index - b.index)
      .map((plan: any) => ({
        name: plan['plan-name'],
        price: parseInt(plan['plan-amount']),
        period: plan['billing-cycle'],
        features:
          plan.features?.map((feature: any) => ({
            name: feature.feature,
            included:
              feature.isEnabled === true || feature.isEnabled === 'true',
          })) || [],
        ctaText: plan['CTA-label'],
        ctaLink: plan['CTA-url'],
        isPopular: plan['plan-name'] === 'Standard Plan', // Mark Standard as popular
        discountValue: plan['discounted-value'] || null,
      }));
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
  formatDate(isoDateString: string): { date: string; month: string } {
    if (!isoDateString) {
      return { date: '', month: '' };
    }

    try {
      const date = new Date(isoDateString);

      // Get day of month
      const day = date.getDate();

      // Get month name
      const monthNames = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ];
      const month = monthNames[date.getMonth()];

      return {
        date: day.toString(),
        month: month,
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
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ];
      return monthNames[date.getMonth()];
    } catch (error) {
      console.error('Error getting blog month:', error);
      return '';
    }
  }

  // Video modal methods
  openVideoModal(videoUrl: string): void {
    if (videoUrl) {
      this.videoUrl = videoUrl;
      console.log('Opening video modal with URL:', videoUrl);
      
      // Wait for DOM to be ready
      setTimeout(() => {
        const modalElement = document.getElementById('videoModal');
        console.log('Modal element found:', modalElement);
        
        if (modalElement) {
          // Check if Bootstrap is available
          if (typeof (window as any).bootstrap !== 'undefined') {
            const modal = new (window as any).bootstrap.Modal(modalElement);
            modal.show();
            console.log('Bootstrap modal opened');
          } else {
            console.error('Bootstrap is not available');
            // Fallback: show modal manually
            modalElement.style.display = 'block';
            modalElement.classList.add('show');
            document.body.classList.add('modal-open');
          }
        } else {
          console.error('Video modal element not found');
        }
      }, 100);
    }
  }

  // Close video modal
  closeVideoModal(): void {
    const modalElement = document.getElementById('videoModal');
    if (modalElement) {
      if (typeof (window as any).bootstrap !== 'undefined') {
        const modal = (window as any).bootstrap.Modal.getInstance(modalElement);
        if (modal) {
          modal.hide();
        }
      } else {
        // Fallback: hide modal manually
        modalElement.style.display = 'none';
        modalElement.classList.remove('show');
        document.body.classList.remove('modal-open');
      }
    }
    this.videoUrl = '';
  }

  // Handle modal backdrop click
  onModalBackdropClick(event: Event): void {
    if (event.target === event.currentTarget) {
      this.closeVideoModal();
    }
  }

  getSafeVideoUrl(url: string): SafeResourceUrl {
    if (!url) {
      return this.sanitizer.bypassSecurityTrustResourceUrl('');
    }

    console.log('Original video URL:', url);

    // Clean URL from HTML entities
    const cleanUrl = url.replace(/&amp;/g, '&');
    console.log('Cleaned URL:', cleanUrl);

    // Convert YouTube URL to embed format if needed
    let embedUrl = cleanUrl;
    
    // Handle YouTube watch URLs
    if (cleanUrl.includes('youtube.com/watch')) {
      const videoId = cleanUrl.split('v=')[1]?.split('&')[0];
      if (videoId) {
        embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
        console.log('YouTube embed URL:', embedUrl);
      }
    } 
    // Handle YouTube short URLs
    else if (cleanUrl.includes('youtu.be/')) {
      const videoId = cleanUrl.split('youtu.be/')[1]?.split('?')[0];
      if (videoId) {
        embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
        console.log('YouTube short embed URL:', embedUrl);
      }
    }
    // Handle Vimeo URLs
    else if (cleanUrl.includes('vimeo.com/')) {
      const videoId = cleanUrl.split('vimeo.com/')[1]?.split('?')[0];
      if (videoId) {
        embedUrl = `https://player.vimeo.com/video/${videoId}?autoplay=1`;
        console.log('Vimeo embed URL:', embedUrl);
      }
    }
    // If it's already an embed URL, use it as is
    else if (cleanUrl.includes('embed') || cleanUrl.includes('player')) {
      embedUrl = cleanUrl;
      console.log('Using existing embed URL:', embedUrl);
    }

    console.log('Final embed URL:', embedUrl);
    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }

  getVideoThumbnail(videoUrl: string): string {
    if (!videoUrl) {
      return 'assets/img/home3/banner-bottom-img1.png';
    }

    // Clean URL from HTML entities
    const cleanUrl = videoUrl.replace(/&amp;/g, '&');

    // Generate YouTube thumbnail URL
    if (cleanUrl.includes('youtube.com/watch')) {
      const videoId = cleanUrl.split('v=')[1]?.split('&')[0];
      if (videoId) {
        const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
        return thumbnailUrl;
      }
    } else if (cleanUrl.includes('youtu.be/')) {
      const videoId = cleanUrl.split('youtu.be/')[1]?.split('?')[0];
      if (videoId) {
        const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
        return thumbnailUrl;
      }
    }

    // Fallback to default image if not YouTube or invalid URL
    return 'assets/img/home3/banner-bottom-img1.png';
  }

  // Method to get image URL from UUID
  getImageUrl(uuid: string): string {
    if (!uuid) {
      return 'assets/img/home3/banner-bottom-img1.png';
    }

    // If it's already a full URL, return as is
    if (uuid.startsWith('http://') || uuid.startsWith('https://')) {
      return uuid;
    }

    // If it's a UUID, construct the image URL using the correct Squidex assets endpoint
    return `https://cms.distinctcloud.io/api/assets/${uuid}`;
  }

  // Feature image modal methods
  openFeatureImageModal(feature: any): void {
    this.selectedFeature = feature;
    if (feature.image && feature.image.length > 0) {
      this.selectedFeatureImage = this.getImageUrl(feature.image[0]);
      this.isFeatureImageModalOpen = true;
    }
  }

  closeFeatureImageModal(): void {
    this.isFeatureImageModalOpen = false;
    this.selectedFeatureImage = '';
    this.selectedFeature = null;
  }

  // Auto-select first feature
  selectFirstFeature(): void {
    if (
      this.whyUsSection &&
      this.whyUsSection['more-features'] &&
      this.whyUsSection['more-features'].length > 0
    ) {
      const firstFeature = this.whyUsSection['more-features'][0];
      this.openFeatureImageModal(firstFeature);
    }
  }

  // Handle CTA form submission
  handleCtaSubmit(): void {
    if (this.ctaSection && this.ctaSection['CTA-url']) {
      window.open(this.ctaSection['CTA-url'], '_blank');
    }
  }

  // Method to manually trigger pricing data processing
  public refreshPricingData(): void {
    console.log('Manually refreshing pricing data');
    if (this.pricingSection) {
      this.processPricingData();
    }
  }
}
