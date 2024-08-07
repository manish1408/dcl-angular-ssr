import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { CaseStudyService } from '../services/case-study.service';
import { ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';
import { environment } from '../environments/environment';
import { CommonModule } from '@angular/common';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-portfolio-details',
  standalone: true,
  imports: [RouterModule, RouterOutlet, CommonModule],
  templateUrl: './portfolio-details.component.html',
  styleUrl: './portfolio-details.component.scss'
})
export class PortfolioDetailsComponent {
  constructor(
    private caseStudyService: CaseStudyService,
    private route: ActivatedRoute,
    private renderer: Renderer2,
    private el: ElementRef,
    private common: CommonService
  ) {}
  post: any;
  posts: any = [];
  slugName: string = '';
  imgCDN: string = environment.squidexAssets;
  isLoading: boolean = false;
  timeline:any;
  async ngOnInit() {
    this.route.params.subscribe((param) => {
      this.isLoading = true;
      this.slugName = param['type'];

      this.caseStudyService
        .getPortfolioBySlug(this.slugName)
        .subscribe((resp: any) => {
          this.post = resp?.items[0].data;
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


  scrollToSection() {
    const section = this.el.nativeElement.querySelector(
      '#case-details-section1'
    );
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
