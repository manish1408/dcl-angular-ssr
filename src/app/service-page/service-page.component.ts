import { CommonModule } from '@angular/common';
import { Component, ElementRef } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-service-page',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './service-page.component.html',
  styleUrl: './service-page.component.scss',
})
export class ServicePageComponent {
  isLoading: boolean = false;
  constructor(private el: ElementRef) {}

  scrollToSection() {
    const section = this.el.nativeElement.querySelector('#blog-grid');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }
  aiTech = [
    { title: 'Generative AI', icon: '/assets/icons/gen-ai-color.svg' },
    { title: 'Deep Learning', icon: '/assets/icons/dl-color.svg' },
    { title: 'Predictive Analytics', icon: '/assets/icons/pa-color.svg' },
    { title: 'Vision AI', icon: '/assets/icons/vision-color.svg' },
    {
      title: 'Natural Language processing',
      icon: '/assets/icons/nlp-color.svg',
    },
  ];
  aiServices = [
    {
      title: 'Precise estimates',
      desc: 'based on analysis of project goals and requirements',
      icon: '/assets/icons/p-estimates.svg',
    },
    {
      title: 'Compliance requirements',
      desc: 'taken into account at the design stage',
      icon: '/assets/icons/c-req.svg',
    },
    {
      title: 'Accurate results of AI solutions',
      desc: 'thanks to training and testing on customized datasets',
      icon: '/assets/icons/mark.svg',
    },
    {
      title: 'Cybersecurity in mind',
      desc: 'to ensure top-level data protection',
      icon: '/assets/icons/cs-mind.svg',
    },
  ];
  industry = [
    { title: 'Healthcare', icon: '/assets/icons/healthcare.svg' },
    { title: 'Retail & E-Commerce', icon: '/assets/icons/e-com.svg' },
    { title: 'Telecom', icon: '/assets/icons/telecom.svg' },
    { title: 'Edtech', icon: '/assets/icons/edtech.svg' },
    { title: 'Financial', icon: '/assets/icons/fin.svg' },
    { title: 'IT', icon: '/assets/icons/it.svg' },
    { title: 'Manufacturing', icon: '/assets/icons/manu.svg' },
    { title: 'Logistics', icon: '/assets/icons/logistics.svg' },
    { title: 'Hotel Management', icon: '/assets/icons/h-manage.svg' },
    { title: 'System Integrators', icon: '/assets/icons/sys-integration.svg' },
    { title: 'Technology Partners', icon: '/assets/icons/tech-partner.svg' },
    { title: 'Media', icon: '/assets/icons/media.svg' },
  ];
}
