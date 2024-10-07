import { Component } from '@angular/core';
import { CaseStudyService } from '../../services/case-study.service';
import { finalize } from 'rxjs';
import { SummaryPipe } from '../../_pipes/summary.pipe';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ai-projects',
  standalone: true,
  imports: [CommonModule, SummaryPipe, RouterModule],
  templateUrl: './ai-projects.component.html',
  styleUrl: './ai-projects.component.scss',
})
export class AiProjectsComponent {
  posts: any[] = [];
  clientServices: any;
  loading = false;
  constructor(private caseStudyService: CaseStudyService) {}
  ngOnInit(): void {
    this.loading = true;

    this.caseStudyService
      .fetchPosts()
      .pipe(finalize(() => (this.loading = false)))
      .subscribe((resp: any) => {
        this.posts = resp?.items;
        this.clientServices = this.posts[0].data?.ClientServices.iv.split(',');
      });
  }
}
