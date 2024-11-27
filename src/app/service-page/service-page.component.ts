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

  ngOnInit() {
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
    const forward = ['green', 'gray', 'brown'];
    const reverse = ['brown', 'gray', 'green'];

    const sequence = Math.floor(index / 3) % 2 === 0 ? forward : reverse;

    return sequence[index % 3];
  }

  getColumnClass(index: number): string {
    const group = Math.floor(index / 7);
    const position = index % 7;

    if (position <= 1 || (position >= 5 && position <= 6)) {
      return 'col-lg-6';
    } else if (position >= 2 && position <= 4) {
      return 'col-lg-4';
    }

    return '';
  }
  isMidGroup(index: number): boolean {
    const position = index % 7;
    return position >= 2 && position <= 4;
  }

  scrollToSection() {
    const section = this.el.nativeElement.querySelector('#blog-grid');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
