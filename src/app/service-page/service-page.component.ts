import { CommonModule } from '@angular/common';
import { Component, ElementRef } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { OurServicesService } from '../services/our-services.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-service-page',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './service-page.component.html',
  styleUrl: './service-page.component.scss',
})
export class ServicePageComponent {
  isLoading: boolean = false;
  imgCDN: string = environment.squidexAssets;
  service: any;
  slugName: string = '';
  posts: any = [];
  date: any;
  formattedDate: any;
  constructor(
    private el: ElementRef,
    private ourServicesService: OurServicesService,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    this.route.params.subscribe((param) => {
      this.isLoading = true;
      this.slugName = param['slug'];
    });
    this.ourServicesService
      .getServiceBySlug(this.slugName)
      .subscribe((resp: any) => {
        console.log(resp);
        this.service = resp?.items[0].data;
        this.isLoading = false;
      });
  }

  getCardColor(index: number): string {
    const forward = ['green', 'gray', 'brown']; // Forward sequence
    const reverse = ['brown', 'gray', 'green']; // Reverse sequence

    // Determine which sequence to use (alternates every 3 indices)
    const sequence = Math.floor(index / 3) % 2 === 0 ? forward : reverse;

    // Return the color based on the index within the sequence
    return sequence[index % 3];
  }

  getColumnClass(index: number): string {
    // Pattern: 0-1: col-lg-6, 2-4: col-lg-4, 5-6: col-lg-6, repeat
    const group = Math.floor(index / 7); // Determine the repeating group
    const position = index % 7; // Position within the group

    if (position <= 1 || (position >= 5 && position <= 6)) {
      return 'col-lg-6';
    } else if (position >= 2 && position <= 4) {
      return 'col-lg-4';
    }

    return ''; // Default class (if needed)
  }
  isMidGroup(index: number): boolean {
    const position = index % 7;
    return position >= 2 && position <= 4; // True for indexes 2, 3, 4 in the pattern
  }

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
