import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { OurServicesService } from '../../services/our-services.service';
import { ProductsService } from '../../services/products.service';
import { CaseStudyService } from '../../services/case-study.service';
import { BlogService } from '../../services/blog.service';
import { MegamenuComponent, MegaMenuItem, MegaMenuSection, MegaMenuGuide, MegaMenuRightPanel } from '../megamenu/megamenu.component';
import { filter, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule, MegamenuComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
  serviceNav: any[] = [];
  productNav: any[] = [];
  isSidebarVisible = false;
  isServiceExpanded = false;
  isProductExpanded = false;
  expandedMenuType: string | null = null;
  
  // Megamenu properties
  menuItems: MegaMenuItem[] = [];
  isMegamenuOpen = false;
  activeMenuType: string | null = null;
  megamenuCloseTimer: any = null;
  isTouchDevice: boolean = false;
  menuJustOpened: boolean = false; 

  // Route tracking
  isProductPage: boolean = false;
  private routerSubscription?: Subscription;
  
  // Case studies for header menu
  caseStudies: any[] = [];
  
  // Blogs for header menu
  blogs: any[] = [];

  constructor(
    private ourServicesService: OurServicesService,
    private productService: ProductsService,
    private caseStudyService: CaseStudyService,
    private blogService: BlogService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  showSidebar() {
    this.isSidebarVisible = true;
  }

  hideSidebar() {
    this.isSidebarVisible = false;
    // Reset expansion state when sidebar is closed
    this.isServiceExpanded = false;
    this.isProductExpanded = false;
    this.expandedMenuType = null;
  }

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

  toggleServices() {
    this.isServiceExpanded = !this.isServiceExpanded;
    // Close other section when this one is opened
    if (this.isServiceExpanded) {
      this.isProductExpanded = false;
    }
  }

  toggleProducts() {
    this.isProductExpanded = !this.isProductExpanded;
    // Close other section when this one is opened
    if (this.isProductExpanded) {
      this.isServiceExpanded = false;
    }
  }

  toggleMobileMenu(menuType: string) {
    if (this.expandedMenuType === menuType) {
      this.expandedMenuType = null;
    } else {
      this.expandedMenuType = menuType;
      this.buildMenuItems(menuType);
    }
  }

  isMobileMenuExpanded(menuType: string): boolean {
    return this.expandedMenuType === menuType;
  }

  getMobileMenuItems(menuType: string): MegaMenuItem[] {
    if (this.expandedMenuType === menuType) {
      return this.menuItems;
    }
    return [];
  }

  ngOnInit() {
    this.serviceNav = [{"title":"Large Language Model & GPT Integration Services","slug":"llm-integration"},{"title":"AI-Powered App and Web Development Services","slug":"ai-app-development"},{"title":"Machine Learning Product Development Services","slug":"machine-learning"},{"title":"Agentic AI Development Services","slug":"agentic-ai"},{"title":"Generative AI Development Services","slug":"generative-ai"}];
    this.productNav = [{"title":"Milo Assistant","slug":"milo"}]; 

    // Fetch first 4 case studies for header menu
    this.fetchCaseStudies();
    
    // Fetch first 4 blogs for header menu
    this.fetchBlogs();

    // Detect touch device (only in browser)
    if (isPlatformBrowser(this.platformId)) {
      this.isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    }

    // Check initial route
    this.checkProductRoute(this.router.url);

    // Subscribe to route changes
    this.routerSubscription = this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(event => event as NavigationEnd)
      )
      .subscribe((event: NavigationEnd) => {
        this.checkProductRoute(event.urlAfterRedirects);
      });

    // this.getServices();
    // this.getProducts();
  }
  
  fetchCaseStudies() {
    this.caseStudyService.fetchPosts().subscribe((resp: any) => {
      // Get first 4 case studies
      this.caseStudies = resp?.items?.slice(0, 4) || [];
    });
  }
  
  fetchBlogs() {
    this.blogService.fetchPosts().subscribe((resp: any) => {
      // Get first 4 blogs
      this.blogs = resp?.items?.slice(0, 4) || [];
    });
  }
  
  truncateDescription(text: string, maxWords: number = 6): string {
    if (!text) return '';
    const words = text.trim().split(/\s+/);
    if (words.length <= maxWords) {
      return text;
    }
    return words.slice(0, maxWords).join(' ') + '...';
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  checkProductRoute(url: string): void {
    this.isProductPage = url.includes('/product');
  }

  // Megamenu methods
  showMegamenu(menuType: string) {
    // Clear any pending close timer
    if (this.megamenuCloseTimer) {
      clearTimeout(this.megamenuCloseTimer);
      this.megamenuCloseTimer = null;
    }

    // If it's the same menu type and already open, do nothing
    if (this.activeMenuType === menuType && this.isMegamenuOpen) {
      return;
    }

    this.activeMenuType = menuType;
    this.buildMenuItems(menuType);
    this.isMegamenuOpen = true;
    
    // On touch devices, set a flag to prevent immediate closing
    if (this.isTouchDevice) {
      this.menuJustOpened = true;
      setTimeout(() => {
        this.menuJustOpened = false;
      }, 300);
    }
  }

  hideMegamenu() {
    // On touch devices, don't close immediately if menu was just opened
    if (this.isTouchDevice && this.menuJustOpened) {
      return;
    }
    
    // On touch devices, use a longer delay to prevent flickering
    const delay = this.isTouchDevice ? 300 : 150;
    
    // Add a delay before closing to allow mouse movement or touch interaction
    this.megamenuCloseTimer = setTimeout(() => {
      this.isMegamenuOpen = false;
      this.activeMenuType = null;
      this.megamenuCloseTimer = null;
    }, delay);
  }

  keepMegamenuOpen() {
    // Clear close timer when mouse enters megamenu
    if (this.megamenuCloseTimer) {
      clearTimeout(this.megamenuCloseTimer);
      this.megamenuCloseTimer = null;
    }
  }

  closeMegamenuImmediately() {
    // Immediately close the menu (used when clicking links)
    if (this.megamenuCloseTimer) {
      clearTimeout(this.megamenuCloseTimer);
      this.megamenuCloseTimer = null;
    }
    this.isMegamenuOpen = false;
    this.activeMenuType = null;
  }

  handleMenuClick(menuType: string, event: Event) {
    // On touch devices, toggle menu on click
    if (this.isTouchDevice) {
      // Only prevent default if clicking on the menu header itself, not links
      const target = event.target as HTMLElement;
      if (target.closest('a') === null) {
        event.preventDefault();
        event.stopPropagation();
        
        if (this.activeMenuType === menuType && this.isMegamenuOpen) {
          // If same menu is open, close it
          this.closeMegamenuImmediately();
        } else {
          // Open the menu
          this.showMegamenu(menuType);
        }
      }
    }
    // On non-touch devices, mouseenter/mouseleave handle it
  }

  buildMenuItems(menuType: string) {
    const menuItem: MegaMenuItem = {
      title: menuType,
      children: []
    };

    if (menuType.toLowerCase() === 'services') {
      menuItem.children = [
        {
          sections: [
            {
              title: 'Product Development',
              items: [
                {
                  title: 'AI Driven MVP Development',
                  description: 'Within a budget of 5K - 10K, we launch your MVP in 3-4 weeks.',
                  icon: 'bi bi-puzzle',
                  iconColor: '#10b981',
                  routerLink: ['/solutions/ai-powered-mvp-development'],
                  imageUrl: 'assets/img/mvp-dev-header-dcl.jpg'
                },
                {
                  title: 'AI powered Product Development',
                  description: 'Within a budget of 10K - 50K, we launch your product in 3-4 months.',
                  icon: 'bi bi-code-slash',
                  iconColor: '#8b5cf6',
                  routerLink: ['/solutions/ai-powered-product-development'],
                  imageUrl: 'assets/img/dcl-services.jpg'
                },
                {
                  title: 'AI Agents Development',
                  description: 'You start the vibe, we finish it.',
                  icon: 'bi bi-gear',
                  iconColor: '#f59e0b',
                  routerLink: ['/solutions/ai-agents-development'],
                  imageUrl: 'assets/img/product-development.jpg'
                }
              ]
            },
            {
              title: 'Staff Augmentation',
              items: [
                {
                  title: 'Hire Vibe Coders',
                  description: 'Experienced Engineers who have mastered AI driven development.',
                  icon: 'bi bi-puzzle',
                  iconColor: '#10b981',
                  routerLink: ['/solutions/hire-vibe-coders'],
                  imageUrl: 'assets/img/dcl-services.jpg'
                },
                {
                  title: 'Hire Fractional CTO',
                  description: 'Tailored AI solutions for your specific needs.',
                  icon: 'bi bi-code-slash',
                  iconColor: '#8b5cf6',
                  routerLink: ['/solutions/hire-fractional-cto'],
                  imageUrl: 'assets/img/dcl-services.jpg'
                },
                {
                  title: 'Hire AI and ML experts',
                  description: 'Automate workflows with intelligent AI agents.',
                  icon: 'bi bi-gear',
                  iconColor: '#f59e0b',
                  routerLink: ['/solutions/hire-ai-ml-experts'],
                  imageUrl: 'assets/img/dcl-services.jpg'
                }
              ]
            },
            {
              title: 'AI Automation',
              items: [
                {
                  title: 'Using N8n and Make.com for Automation',
                  description: 'Explore successful AI implementations.',
                  icon: 'bi bi-file-earmark-text',
                  iconColor: '#ef4444',
                  routerLink: ['/solutions/n8n-make-automation'],
                  imageUrl: 'assets/img/dcl-services.jpg'
                },
                {
                  title: 'Enterprise AI Automation with Distributed Systems',
                  description: 'RPA and AI Automation for Enterprise',
                  icon: 'bi bi-play-circle',
                  iconColor: '#06b6d4',
                  routerLink: ['/solutions/enterprise-ai-automation'],
                  imageUrl: 'assets/img/dcl-services.jpg'
                }
              ]
            }
          ],
          // guide: {
          //   question: 'What is AI Development?',
          //   linkText: 'Read more',
          //   routerLink: ['/ai-development']
          // }
        }
      ];

      // Right Panel
      menuItem.rightPanel = {
        title: 'AI Development Services',
        description: 'Transform your business with cutting-edge AI solutions tailored to your needs.',
        imageUrl: 'assets/img/dcl-services.jpg',
        notifications: []
      };
    } else if (menuType.toLowerCase() === 'products') {
      menuItem.children = [
        {
          sections: [
            {
              title: 'OUR PRODUCTS',
              items: [
                {
                  title: 'RAG as a Service',
                  description: 'Build your RAG in minutes and deploy in your own cloud.',
                  icon: 'bi bi-database',
                  iconColor: '#3b82f6',
                  routerLink: ['/product/rag-as-a-service'],
                  imageUrl: 'assets/img/chatbot.webp'
                },
                {
                  title: 'AI Voice calling Agents',
                  description: 'Setup your voice calling Agents in cloud in 3~5 days.',
                  icon: 'bi bi-telephone',
                  iconColor: '#10b981',
                  routerLink: ['/product/ai-voice-calling-agents'],
                  imageUrl: 'assets/img/chatbot.webp'
                },
                {
                  title: 'AI Search Implementation',
                  description: 'Connect your data, and get AI search up and running',
                  icon: 'bi bi-search',
                  iconColor: '#8b5cf6',
                  routerLink: ['/product/ai-search-implementation'],
                  imageUrl: 'assets/img/chatbot.webp'
                },
                {
                  title: 'AI Customer Support',
                  description: 'Implement AI auto replies in your existing stack using APIs',
                  icon: 'bi bi-headset',
                  iconColor: '#f59e0b',
                  routerLink: ['/product/ai-customer-support'],
                  imageUrl: 'assets/img/chatbot.webp'
                },
                {
                  title: 'Whatsapp Business AI Agent',
                  description: 'Grow your business on WhatsApp',
                  icon: 'bi bi-whatsapp',
                  iconColor: '#25d366',
                  routerLink: ['/product/whatsapp-business-ai-agent'],
                  imageUrl: 'assets/img/chatbot.webp'
                }
              ]
            }
          ]
        }
      ];

      // Right Panel
      menuItem.rightPanel = {
        title: 'AI Products & Services',
        description: 'Transform your business with our cutting-edge AI products and services designed for modern enterprises.',
        imageUrl: 'assets/img/chatbot.webp',
        notifications: []
      };
    } else if (menuType.toLowerCase() === 'case-studies') {
      // Build case study items from fetched data (first 4 case studies)
      const caseStudyItems = this.caseStudies.slice(0, 4).map((caseStudy, index) => {
        const icons = ['bi bi-folder2-open', 'bi bi-cpu', 'bi bi-building', 'bi bi-lightbulb'];
        const iconColors = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b'];
        const defaultImages = [
          'assets/img/innerpage/case-study-img1.jpg',
          'assets/img/innerpage/case-study-img2.jpg',
          'assets/img/innerpage/case-study-img3.jpg',
          'assets/img/innerpage/case-study-img4.jpg'
        ];
        
        // Get thumbnail if available
        let imageUrl = defaultImages[index] || 'assets/img/innerpage/case-study-img1.jpg';
        if (caseStudy?.data?.thumbnail?.iv && Array.isArray(caseStudy.data.thumbnail.iv) && caseStudy.data.thumbnail.iv.length > 0) {
          imageUrl = `https://cms.distinctcloud.io/api/assets/distinct-cloud-labs/${caseStudy.data.thumbnail.iv[0]}`;
        }
        
        const subheading = caseStudy?.data?.projectSubheading?.iv || 'Explore our successful implementation.';
        return {
          title: caseStudy?.data?.projectName?.iv || 'Case Study',
          description: this.truncateDescription(subheading, 6),
          icon: icons[index] || 'bi bi-file-earmark-text',
          iconColor: iconColors[index] || '#3b82f6',
          routerLink: ['/case-study', caseStudy?.data?.slug?.iv],
          imageUrl: imageUrl
        };
      });
      
      // Add "All Case Studies" as first item
      caseStudyItems.unshift({
        title: 'All Case Studies',
        description: 'Browse all our successful client implementations.',
        icon: 'bi bi-folder2-open',
        iconColor: '#3b82f6',
        routerLink: ['/case-studies'],
        imageUrl: 'assets/img/innerpage/case-study-img1.jpg'
      });
      
      // Fallback if no case studies are loaded yet
      if (caseStudyItems.length === 1) {
        // Only "All Case Studies" is present, add placeholder items
        for (let i = 0; i < 3; i++) {
          caseStudyItems.push({
            title: 'AI Solutions',
            description: 'See how AI transformed businesses.',
            icon: 'bi bi-cpu',
            iconColor: '#10b981',
            routerLink: ['/case-studies'],
            imageUrl: 'assets/img/innerpage/case-study-img2.jpg'
          });
        }
      }
      
      menuItem.children = [
        {
          sections: [
            {
              title: 'FEATURED',
              items: caseStudyItems
            }
          ],
          // guide: {
          //   question: 'Want to see your success story here?',
          //   linkText: 'Get started',
          //   routerLink: ['/contact']
          // }
        }
      ];

      // Right Panel
      menuItem.rightPanel = {
        title: 'Success Stories',
        description: 'Discover how leading companies transformed their business with our AI solutions.',
        imageUrl: 'assets/img/home1/case-study-img1.jpg',
        notifications: []
      };
    } else if (menuType.toLowerCase() === 'blog') {
      // Build blog items from fetched data (first 4 blogs)
      const blogItems = this.blogs.slice(0, 4).map((blog, index) => {
        const icons = ['bi bi-journal-text', 'bi bi-cpu', 'bi bi-laptop', 'bi bi-lightbulb'];
        const iconColors = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b'];
        const defaultImages = [
          'assets/img/innerpage/blog-img1.jpg',
          'assets/img/innerpage/blog-img2.jpg',
          'assets/img/innerpage/blog-img3.jpg',
          'assets/img/innerpage/blog-details-img1.jpg'
        ];
        
        // Get thumbnail if available
        let imageUrl = defaultImages[index] || 'assets/img/innerpage/blog-img1.jpg';
        if (blog?.data?.thumbnail?.iv && Array.isArray(blog.data.thumbnail.iv) && blog.data.thumbnail.iv.length > 0) {
          imageUrl = `https://cms.distinctcloud.io/api/assets/distinct-cloud-labs/${blog.data.thumbnail.iv[0]}`;
        }
        
        const metaDesc = blog?.data?.metaDesc?.iv || 'Read our latest insights and updates.';
        return {
          title: blog?.data?.title?.iv || 'Blog Post',
          description: this.truncateDescription(metaDesc, 6),
          icon: icons[index] || 'bi bi-journal-text',
          iconColor: iconColors[index] || '#3b82f6',
          routerLink: ['/blog', blog?.data?.slug?.iv],
          imageUrl: imageUrl
        };
      });
      
      // Add "All Articles" as first item
      blogItems.unshift({
        title: 'All Articles',
        description: 'Browse all our blog posts and insights.',
        icon: 'bi bi-journal-text',
        iconColor: '#3b82f6',
        routerLink: ['/blog'],
        imageUrl: 'assets/img/innerpage/blog-img1.jpg'
      });
      
      // Fallback if no blogs are loaded yet
      if (blogItems.length === 1) {
        // Only "All Articles" is present, add placeholder items
        for (let i = 0; i < 3; i++) {
          blogItems.push({
            title: 'Latest Posts',
            description: 'Read our most recent articles.',
            icon: 'bi bi-clock-history',
            iconColor: '#ef4444',
            routerLink: ['/blog'],
            imageUrl: 'assets/img/innerpage/blog-details-img2.jpg'
          });
        }
      }
      
      menuItem.children = [
        {
          sections: [
            {
              title: 'FEATURED',
              items: blogItems
            }
          ],
          // guide: {
          //   question: 'Have a topic you\'d like us to cover?',
          //   linkText: 'Suggest an article',
          //   routerLink: ['/contact']
          // }
        }
      ];

      // Right Panel
      menuItem.rightPanel = {
        title: 'Latest Insights',
        description: 'Stay informed with the latest trends, tips, and insights from our AI experts.',
        imageUrl: 'assets/img/home1/blog-img1.jpg',
        notifications: []
      };
    }

    this.menuItems = [menuItem];
  }

  getServices() {
    this.ourServicesService.getServices().subscribe((resp: any) => {
      const res = resp.items.map((item: any) => ({
        title: item.data.pageTitle.iv,
        slug: item.data.slug.iv,
      }));
      
    });
  }
  getProducts() {
    this.productService.getProducts().subscribe((resp: any) => {
      const res = resp.items.map((item: any) => ({
        title: item.data.productName.iv,
        slug: item.data.slug.iv,
      }));
      this.productNav = [{"title":"Milo Assistant","slug":"milo"}]; 
    });
  }
}
