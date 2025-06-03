import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OurServicesService } from '../../services/our-services.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  serviceNav: any[] = [];
  productNav: any[] = [];
  isSidebarVisible = false;
  isServiceExpanded = false;
  isProductExpanded = false;

  constructor(
    private ourServicesService: OurServicesService,
    private productService: ProductsService
  ) {}

  showSidebar() {
    this.isSidebarVisible = true;
  }

  hideSidebar() {
    this.isSidebarVisible = false;
    // Reset expansion state when sidebar is closed
    this.isServiceExpanded = false;
    this.isProductExpanded = false;
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

  ngOnInit() {
    this.serviceNav = [{"title":"Large Language Model & GPT Integration Services","slug":"llm-integration"},{"title":"AI-Powered App and Web Development Services","slug":"ai-app-development"},{"title":"Machine Learning Product Development Services","slug":"machine-learning"},{"title":"Agentic AI Development Services","slug":"agentic-ai"},{"title":"Generative AI Development Services","slug":"generative-ai"}];
    this.productNav = [{"title":"Milo Assistant","slug":"milo"}]; 

    // this.getServices();
    // this.getProducts();
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
      debugger
      console.log(JSON.stringify(res));
    });
  }
}
