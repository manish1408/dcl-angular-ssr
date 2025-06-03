import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OurServicesService } from '../../services/our-services.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-landing-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './landing-header.component.html',
  styleUrl: './landing-header.component.scss',
})
export class LandingHeaderComponent {
  serviceNav: any[] = [];
  productNav: any[] = [];
  isSidebarVisible = false;

  constructor(
    private ourServicesService: OurServicesService,
    private productService: ProductsService
  ) {}

  showSidebar() {
    this.isSidebarVisible = true;
  }

  hideSidebar() {
    this.isSidebarVisible = false;
  }

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

  ngOnInit() {
    this.serviceNav = [{"title":"Large Language Model & GPT Integration Services","slug":"llm-integration"},{"title":"AI-Powered App and Web Development Services","slug":"ai-app-development"},{"title":"Machine Learning Product Development Services","slug":"machine-learning"},{"title":"Agentic AI Development Services","slug":"agentic-ai"},{"title":"Generative AI Development Services","slug":"generative-ai"}];
    this.productNav = [{"title":"Milo Assistant","slug":"milo"}]; 
  }
} 