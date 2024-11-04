import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { SummaryPipe } from '../../_pipes/summary.pipe';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CaseStudyService } from '../../services/case-study.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-ai-demos',
  standalone: true,
  imports: [CommonModule, SummaryPipe, RouterModule],
  templateUrl: './ai-demos.component.html',
  styleUrl: './ai-demos.component.scss',
})
export class AiDemosComponent {
  portfolios: any[] = [];
  loading = false;
  constructor(
    private caseStudyService: CaseStudyService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}
  ngOnInit(): void {
    this.loading = true;

    this.caseStudyService
      .fetchPortfolio()
      .pipe(finalize(() => (this.loading = false)))
      .subscribe((resp: any) => {
        this.portfolios = resp?.items;
      });
  }
 
}
