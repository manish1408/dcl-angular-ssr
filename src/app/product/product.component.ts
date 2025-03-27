import { Component, ElementRef } from '@angular/core';
import { environment } from '../environments/environment';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../services/products.service';
import { Meta, Title } from '@angular/platform-browser';
import { TemplateCardComponent } from "../common/template-card/template-card.component";
import { TemplateService } from '../services/templates.service';
import { finalize } from 'rxjs';
import { CtaAreaComponent } from "../cta-area/cta-area.component";
import { FaqComponent } from "../faq/faq.component";
import { TestimonialComponent } from "../common/testimonial/testimonial.component";

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RouterModule, CommonModule, TemplateCardComponent, CtaAreaComponent, FaqComponent, TestimonialComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  imageShown = 1;
  useCases:any[]=[];
  isLoading: boolean = false;
  imgCDN: string = environment.squidexAssets;
  product: any;
  slugName: string = '';
  posts: any = [];
  date: any;
  formattedDate: any;
  selectedTab: any;
  tabs = [
    {
      text: 'Milo in chat',
      value: 'milo-in-chat',
    },
    {
      text: 'Messaging',
      value: 'messaging',
    },
    {
      text: 'Benefits',
      value: 'benefits',
    },
    {
      text: 'Industries',
      value: 'industries',
    },
    {
      text: 'Safety',
      value: 'safety',
    },
    {
      text: 'Learn more',
      value: 'learn-more',
    },
  ];
  logos = [
    { name: 'Integration Logo', image: '/assets/img/integration/apple.svg' },
    { name: 'Integration Logo', image: '/assets/img/integration/chrome.svg' },
    { name: 'Integration Logo', image: '/assets/img/integration/discord.svg' },
    { name: 'Integration Logo', image: '/assets/img/integration/drive.svg' },
    { name: 'Integration Logo', image: '/assets/img/integration/instagram.svg' },
    { name: 'Integration Logo', image: '/assets/img/integration/linkedin.svg' },
    { name: 'Integration Logo', image: '/assets/img/integration/messenger.svg' },
    { name: 'Integration Logo', image: '/assets/img/integration/mongo.svg' },
    { name: 'Integration Logo', image: '/assets/img/integration/ms-sharepoint.svg' },
    { name: 'Integration Logo', image: '/assets/img/integration/phone-call.svg' },
    { name: 'Integration Logo', image: '/assets/img/integration/slack.svg' },
    { name: 'Integration Logo', image: '/assets/img/integration/sms.svg' },
    { name: 'Integration Logo', image: '/assets/img/integration/teams.svg' },
    { name: 'Integration Logo', image: '/assets/img/integration/telegram.svg' },
    { name: 'Integration Logo', image: '/assets/img/integration/whatsapp.svg' },
    { name: 'Integration Logo', image: '/assets/img/integration/windows.svg' }
  
  ];
  constructor(
    private el: ElementRef,
    private productService: ProductsService,
    private route: ActivatedRoute,
    private meta: Meta,
    private title: Title,
    private templateService: TemplateService
  ) {}
  animationState = {
    'animation-duration': `${this.logos.length * 1}s`
  };
  ngOnInit() {
    this.selectedTab = this.tabs[0].value;
    this.route.params.subscribe((param) => {
      this.isLoading = true;
      this.slugName = param['slug'];
 
    this.productService
      .getProductBySlug(this.slugName)
      .subscribe((resp: any) => {
        // console.log(resp);
        this.product = resp?.items[0].data;
        this.updateMetaTags(resp?.items[0].data);
        this.isLoading = false;
      });
    });
    this.getAiUsecases()
  }
  getAiUsecases(){
    this.isLoading = true;
    this.templateService.getAiUsecases()
    .pipe(finalize(()=>this.isLoading = false))
    .subscribe((resp: any) => {
      console.log('resp',resp);
      this.useCases = resp?.items.slice(0,4);
    });
  }
  onTabClick(tabValue: string): void {
    this.selectedTab = tabValue;
    const element = this.el.nativeElement.querySelector(`#${tabValue}`);
    console.log(element);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  scrollToSection() {
    const section = this.el.nativeElement.querySelector('#blog-grid');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }

  updateMetaTags(blog: any) {
    const sanitizedContent = this.stripHtmlTags(blog.section1Desc.iv);
    this.title.setTitle(`Distinct Cloud Labs |  ${blog.productName.iv}`);
    this.meta.addTags([
      {
        name: "description",
        content: sanitizedContent.substring(0, 160),
      },
      { property: "og:title", content: `Distinct Cloud Labs | ${blog.productName.iv}` },
      {
        property: "og:description",
        content: sanitizedContent.substring(0, 160),
      },
      {
        property: "twitter:title",
        content: `Distinct Cloud Labs | ${blog.productName.iv}`,
      },
      {
        property: "twitter:description",
        content: sanitizedContent.substring(0, 160),
      },
    ]);
  }

  stripHtmlTags(content: string): string {
    return content.replace(/<\/?[^>]+(>|$)/g, "");
  }
}
