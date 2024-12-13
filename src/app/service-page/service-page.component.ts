import { CommonModule } from '@angular/common';
import { Component, ElementRef } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { OurServicesService } from '../services/our-services.service';
import { environment } from '../environments/environment';
import { CommonService } from '../services/common.service';
import { Meta, Title } from '@angular/platform-browser';

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
    private route: ActivatedRoute,
    private common: CommonService,
    private meta: Meta,
    private title: Title
  ) {}

  ngOnInit() {
    this.route.params.subscribe((param) => {
      this.isLoading = true;
      this.slugName = param['slug'];

      this.ourServicesService
        .getServiceBySlug(this.slugName)
        .subscribe((resp: any) => {
          this.service = resp?.items[0].data;
          this.updateMetaTags(resp?.items[0].data);
          this.isLoading = false;
        });
      if (this.common.isBrowser()) {
        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth',
        });
      }
    });
  }

  updateMetaTags(blog: any) {
    const sanitizedContent = this.stripHtmlTags(blog.section1Desc.iv);
    this.title.setTitle(`Distinct Cloud Labs |  ${blog.pageTitle.iv}`);
    this.meta.addTags([
      {
        name: "description",
        content: sanitizedContent.substring(0, 160),
      },
      { property: "og:title", content: `${blog.pageTitle.iv}` },
      {
        property: "og:description",
        content: sanitizedContent.substring(0, 160),
      },
      {
        property: "twitter:title",
        content: `Distinct Cloud Labs | ${blog.pageTitle.iv}`,
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
