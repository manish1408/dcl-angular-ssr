import { Component, ElementRef } from '@angular/core';
import { environment } from '../environments/environment';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
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
  constructor(
    private el: ElementRef,
    private productService: ProductsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.selectedTab = this.tabs[0].value;
    this.route.params.subscribe((param) => {
      this.isLoading = true;
      this.slugName = param['slug'];
    });
    this.productService
      .getProductBySlug(this.slugName)
      .subscribe((resp: any) => {
        console.log(resp);
        this.product = resp?.items[0].data;
        this.isLoading = false;
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
}
