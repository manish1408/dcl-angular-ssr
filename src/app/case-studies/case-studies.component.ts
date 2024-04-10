import { Component, OnInit } from '@angular/core';
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
  constructor(private caseStudyService: CaseStudyService) {}
  posts: any[] = [];
  isLoading: boolean = false;

  async ngOnInit() {
    this.isLoading = true;
    this.caseStudyService.fetchPosts().subscribe((resp: any) => {
      console.log(resp);
      this.posts = resp?.items;
      this.isLoading = false;
    });
  }

  // transformUrl(url: string): string {
  //   return url.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and');
  // }
}
