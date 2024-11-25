import { Component, ElementRef, OnInit } from '@angular/core';
import { CaseStudyService } from '../services/case-study.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
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
    private el: ElementRef
  ) {}
  posts: any[] = [];
  isLoading: boolean = false;
  clientServices: any;

  async ngOnInit() {
    this.isLoading = true;
    this.caseStudyService.fetchPortfolio().subscribe((resp: any) => {
      console.log('resr', resp);
      this.posts = resp?.items;
      this.isLoading = false;
    });
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
