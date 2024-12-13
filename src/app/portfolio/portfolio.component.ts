import { Component, ElementRef, OnInit } from '@angular/core';
import { CaseStudyService } from '../services/case-study.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss',
})
export class PortfolioComponent {
  constructor(
    private caseStudyService: CaseStudyService,
    private el: ElementRef,
    private meta: Meta,
    private title: Title
  ) {}
  posts: any[] = [];
  isLoading: boolean = false;
  clientServices: any;

  async ngOnInit() {
    this.isLoading = true;
    this.caseStudyService.fetchPortfolio().subscribe((resp: any) => {
      this.posts = resp?.items;
      this.isLoading = false;
    });
    this.title.setTitle(`Distinct Cloud Labs |  AI Demos`);
    this.meta.addTags([
      {
        name: "description",
        content: 'Take a glimpse of the work that we have done for our clients recently',
      },
      { property: "og:title", content: `Distinct Cloud Labs | AI Demos` },
      {
        property: "og:description",
        content: 'Take a glimpse of the work that we have done for our clients recently',
      },
      {
        property: "twitter:title",
        content: `Distinct Cloud Labs | AI Demos`,
      },
      {
        property: "twitter:description",
        content: 'Take a glimpse of the work that we have done for our clients recently',
      },
    ]);
  }
  scrollToSection() {
    const section = this.el.nativeElement.querySelector(
      '#case-study-card-section'
    );
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
