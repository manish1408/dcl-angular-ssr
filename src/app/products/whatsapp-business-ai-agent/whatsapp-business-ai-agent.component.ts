import { Component, AfterViewInit, OnDestroy } from '@angular/core';
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
declare var Typed: any;
declare var gsap: any;
declare var ScrollTrigger: any;


declare var Swiper: any;
declare var jQuery: any;

@Component({
  selector: 'app-whatsapp-business-ai-agent',
  standalone: true,
  imports: [
    RouterModule,
    ScheduleCallCTAComponent,
    CommonModule,
    HomeTestimonialsComponent,
    MvpPortfolioComponent
  ],
  templateUrl: './whatsapp-business-ai-agent.component.html',
  styleUrl: './whatsapp-business-ai-agent.component.scss',
})
export class WhatsappBusinessAiAgentComponent implements AfterViewInit { 
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
    this.meta.addTag({ name: 'title', content: 'WhatsApp Business AI Agent - Automated Customer Support | Distinct Cloud Labs' });
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

  // Pricing state
  isYearlyBilling: boolean = false;

  // Pricing plans
  pricingPlans = {
    growth: {
      monthly: 148,
      yearly: 89
    },
    scale: {
      monthly: 328,
      yearly: 197
    },
    pro: {
      monthly: 628,
      yearly: 377
    }
  };

  getGrowthPrice(): number {
    return this.isYearlyBilling ? this.pricingPlans.growth.yearly : this.pricingPlans.growth.monthly;
  }

  getScalePrice(): number {
    return this.isYearlyBilling ? this.pricingPlans.scale.yearly : this.pricingPlans.scale.monthly;
  }

  getProPrice(): number {
    return this.isYearlyBilling ? this.pricingPlans.pro.yearly : this.pricingPlans.pro.monthly;
  }

  toggleBillingPeriod(): void {
    this.isYearlyBilling = !this.isYearlyBilling;
  }

  toggleFaq(faqId: string): void {
    this.activeFaqId = this.activeFaqId === faqId ? null : faqId;
  }

  isFaqOpen(faqId: string): boolean {
    return this.activeFaqId === faqId;
  }

  ngOnInit(): void {
    this.meta.updateTag({
      name: 'title',
      content: 'WhatsApp Business AI Agent - Automated Customer Support | Distinct Cloud Labs',
    });
    this.meta.updateTag({
      name: 'description',
      content: 'Integrate AI with WhatsApp Business to send automatic messages and respond to customers intelligently. Transform your customer support with AI-powered WhatsApp automation that understands context and provides accurate responses.',
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
        this.initializeTypedAnimation();
        // Initialize horizontal scrolling with a longer delay to ensure DOM is ready
        setTimeout(() => {
          this.initializeHorizontalScrolling();
        }, 300);
      }, 100);
    }
  }

  initializeTypedAnimation(): void {
    if (!this.common.isBrowser()) {
      return;
    }

    const textTypeElement = document.querySelector('app-whatsapp-business-ai-agent .text-type');
    if (!textTypeElement) {
      return;
    }

    // Function to initialize Typed after library is loaded
    const initTyped = () => {
      try {
        // Destroy existing instance if any
        if ((textTypeElement as any).typed) {
          (textTypeElement as any).typed.destroy();
        }
        
        // Initialize Typed.js animation with the specific element
        const TypedClass = (window as any).Typed || Typed;
        const typing = new TypedClass(textTypeElement, {
          strings: ['ecommerce', 'healthcare', 'education', 'finance', 'insurance', 'travel'],
          typeSpeed: 120,
          backSpeed: 70,
          loop: true,
          showCursor: false, // We have our own cursor
        });
        
        // Store reference for cleanup
        (textTypeElement as any).typed = typing;
      } catch (error) {
        console.error('Error initializing Typed animation:', error);
      }
    };

    // Check if Typed is already available
    if (typeof (window as any).Typed !== 'undefined') {
      initTyped();
      return;
    }

    // Try to load Typed.js dynamically
    const loadTypedScript = () => {
      return new Promise<void>((resolve, reject) => {
        // Check if script is already being loaded
        if (document.querySelector('script[src*="type.js"]')) {
          // Wait for it to load
          let attempts = 0;
          const checkTyped = setInterval(() => {
            attempts++;
            if (typeof (window as any).Typed !== 'undefined') {
              clearInterval(checkTyped);
              resolve();
            } else if (attempts > 50) { // 5 seconds max wait
              clearInterval(checkTyped);
              reject(new Error('Typed.js failed to load'));
            }
          }, 100);
          return;
        }

        // Create and load the script
        const script = document.createElement('script');
        script.src = 'assets/js/type.js';
        script.async = true;
        script.onload = () => {
          // Wait a bit for Typed to be available
          setTimeout(() => {
            if (typeof (window as any).Typed !== 'undefined') {
              resolve();
            } else {
              reject(new Error('Typed.js not available after script load'));
            }
          }, 100);
        };
        script.onerror = () => reject(new Error('Failed to load Typed.js script'));
        document.head.appendChild(script);
      });
    };

    // Load script and initialize
    loadTypedScript()
      .then(() => {
        initTyped();
      })
      .catch((error) => {
        console.error('Failed to load Typed.js:', error);
        // Fallback: try one more time after a delay in case it loads later
        setTimeout(() => {
          if (typeof (window as any).Typed !== 'undefined') {
            initTyped();
          }
        }, 1000);
      });
  }

  initializeMarquee(): void {
    if (this.common.isBrowser() && typeof jQuery !== 'undefined' && jQuery.fn.marquee) {
      const marqueeElement = jQuery('app-whatsapp-business-ai-agent .marquee_text');
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

  initializeHorizontalScrolling(): void {
    if (!this.common.isBrowser()) {
      return;
    }

    // Only run on desktop (>1200px)
    const deviceWidth = window.innerWidth;
    if (deviceWidth <= 1200) {
      return;
    }

    const workflowSection = document.querySelector('app-whatsapp-business-ai-agent .horizontal-scrolling-wrapper');
    if (!workflowSection) {
      return;
    }

    // Function to initialize horizontal scrolling after GSAP is loaded
    const initHorizontalScroll = () => {
      try {
        const gsapLib = (window as any).gsap || gsap;
        const ScrollTriggerLib = (window as any).ScrollTrigger || ScrollTrigger;

        if (!gsapLib || !ScrollTriggerLib) {
          console.error('GSAP or ScrollTrigger not available');
          return;
        }

        // Register ScrollTrigger plugin
        if (gsapLib.registerPlugin) {
          gsapLib.registerPlugin(ScrollTriggerLib);
        }

        // Configure GSAP
        if (gsapLib.config) {
          gsapLib.config({
            nullTargetWarn: false,
            trialWarn: false,
          });
        }

        let duration = 1;
        // Find sections within the component
        const componentElement = document.querySelector('app-whatsapp-business-ai-agent');
        const sections = componentElement 
          ? gsapLib.utils.toArray('.single-scroll', componentElement)
          : gsapLib.utils.toArray('app-whatsapp-business-ai-agent .single-scroll');
        
        if (sections.length === 0) {
          console.warn('No .single-scroll sections found');
          return;
        }
        const sectionIncrement = duration / (sections.length - 1);

        const tl = gsapLib.timeline({
          scrollTrigger: {
            trigger: workflowSection,
            pin: true,
            scrub: 1,
            start: '-80px top',
            end: '+=5000'
          }
        });

        tl.to(sections, {
          xPercent: -100 * (sections.length - 1),
          duration: duration,
          ease: 'none'
        });

        sections.forEach((section: any, index: number) => {
          const tween = gsapLib.from(section, {
            opacity: 0,
            scale: 1,
            duration: 0.5,
            force3D: true,
            paused: true
          });

          this.addSectionCallbacks(tl, {
            start: sectionIncrement * (index - 0.99),
            end: sectionIncrement * (index + 0.99),
            onEnter: () => tween.play(),
            onLeave: () => tween.reverse(),
            onEnterBack: () => tween.play(),
            onLeaveBack: () => tween.reverse()
          });

          if (index === 0) {
            tween.progress(1);
          }
        });
      } catch (error) {
        console.error('Error initializing horizontal scrolling:', error);
      }
    };

    // Check if GSAP and ScrollTrigger are already available
    if (typeof (window as any).gsap !== 'undefined' && typeof (window as any).ScrollTrigger !== 'undefined') {
      initHorizontalScroll();
      return;
    }

    // Load GSAP and ScrollTrigger scripts dynamically
    this.loadGSAPScripts()
      .then(() => {
        initHorizontalScroll();
      })
      .catch((error) => {
        console.error('Failed to load GSAP scripts:', error);
      });
  }

  loadGSAPScripts(): Promise<void> {
    return new Promise((resolve, reject) => {
      const gsapScript = document.querySelector('script[src*="gsap"]');
      const scrollTriggerScript = document.querySelector('script[src*="ScrollTrigger"]');

      // Check if scripts are already loaded or loading
      if (gsapScript && scrollTriggerScript) {
        let attempts = 0;
        const checkGSAP = setInterval(() => {
          attempts++;
          if (typeof (window as any).gsap !== 'undefined' && typeof (window as any).ScrollTrigger !== 'undefined') {
            clearInterval(checkGSAP);
            resolve();
          } else if (attempts > 50) {
            clearInterval(checkGSAP);
            reject(new Error('GSAP scripts failed to load'));
          }
        }, 100);
        return;
      }

      // Load GSAP first
      const loadGSAP = () => {
        return new Promise<void>((resolveGSAP, rejectGSAP) => {
          if (typeof (window as any).gsap !== 'undefined') {
            resolveGSAP();
            return;
          }

          const script = document.createElement('script');
          script.src = 'assets/js/gsap.min.js';
          script.async = true;
          script.onload = () => {
            setTimeout(() => {
              if (typeof (window as any).gsap !== 'undefined') {
                resolveGSAP();
              } else {
                rejectGSAP(new Error('GSAP not available after script load'));
              }
            }, 100);
          };
          script.onerror = () => rejectGSAP(new Error('Failed to load GSAP script'));
          document.head.appendChild(script);
        });
      };

      // Load ScrollTrigger after GSAP
      const loadScrollTrigger = () => {
        return new Promise<void>((resolveST, rejectST) => {
          if (typeof (window as any).ScrollTrigger !== 'undefined') {
            resolveST();
            return;
          }

          const script = document.createElement('script');
          script.src = 'assets/js/ScrollTrigger.min.js';
          script.async = true;
          script.onload = () => {
            setTimeout(() => {
              if (typeof (window as any).ScrollTrigger !== 'undefined') {
                resolveST();
              } else {
                rejectST(new Error('ScrollTrigger not available after script load'));
              }
            }, 100);
          };
          script.onerror = () => rejectST(new Error('Failed to load ScrollTrigger script'));
          document.head.appendChild(script);
        });
      };

      loadGSAP()
        .then(() => loadScrollTrigger())
        .then(() => resolve())
        .catch((error) => reject(error));
    });
  }

  addSectionCallbacks(timeline: any, { start, end, onEnter, onLeave, onEnterBack, onLeaveBack }: any): void {
    const trackDirection = (animation: any) => {
      const onUpdate = animation.eventCallback('onUpdate');
      let prevTime = animation.time();
      animation.direction = animation.reversed() ? -1 : 1;
      animation.eventCallback('onUpdate', () => {
        const time = animation.time();
        if (prevTime !== time) {
          animation.direction = time < prevTime ? -1 : 1;
          prevTime = time;
        }
        if (onUpdate) {
          onUpdate.call(animation);
        }
      });
    };

    const empty = (v: any) => v;
    if (!timeline.direction) {
      trackDirection(timeline);
    }
    if (start >= 0) {
      timeline.add(() => {
        const callback = timeline.direction < 0 ? onLeaveBack : onEnter;
        return (callback || empty)();
      }, start);
    }
    if (end <= timeline.duration()) {
      timeline.add(() => {
        const callback = timeline.direction < 0 ? onEnterBack : onLeave;
        return (callback || empty)();
      }, end);
    }
  }

  ngOnDestroy(): void {
    if (this.common.isBrowser()) {
      // Cleanup Typed animation
      const textTypeElement = document.querySelector('app-whatsapp-business-ai-agent .text-type');
      if (textTypeElement && (textTypeElement as any).typed) {
        try {
          (textTypeElement as any).typed.destroy();
          (textTypeElement as any).typed = null;
        } catch (error) {
          console.error('Error destroying Typed animation:', error);
        }
      }

      // Cleanup ScrollTrigger instances
      if (typeof (window as any).ScrollTrigger !== 'undefined') {
        try {
          (window as any).ScrollTrigger.getAll().forEach((st: any) => {
            if (st.trigger && st.trigger.closest('app-whatsapp-business-ai-agent')) {
              st.kill();
            }
          });
        } catch (error) {
          console.error('Error destroying ScrollTrigger instances:', error);
        }
      }
    }
  }
}

