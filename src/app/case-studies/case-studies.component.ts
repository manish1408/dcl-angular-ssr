import { Component, ElementRef, OnInit } from '@angular/core';
import { CaseStudyService } from '../services/case-study.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-case-studies',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './case-studies.component.html',
  styleUrl: './case-studies.component.scss',
})
export class CaseStudiesComponent implements OnInit {
  constructor(
    private caseStudyService: CaseStudyService,
    private el: ElementRef
  ) {}
  posts: any[] = [];
  isLoading: boolean = false;
  clientServices:any;

  async ngOnInit() {
    this.isLoading = true;
    this.caseStudyService.fetchPosts().subscribe((resp: any) => { 
      this.posts = resp?.items;
      this.clientServices = this.posts[0].data?.ClientServices.iv.split(',')
      console.log(this.clientServices);
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
