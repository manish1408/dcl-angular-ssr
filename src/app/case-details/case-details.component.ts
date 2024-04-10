import { Component, OnInit } from '@angular/core';
import { CaseStudyService } from '../services/case-study.service';
import { ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';
import { environment } from '../environments/environment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-case-details',
  standalone: true,
  imports: [RouterModule, RouterOutlet, CommonModule],
  templateUrl: './case-details.component.html',
  styleUrl: './case-details.component.scss',
})
export class CaseDetailsComponent implements OnInit {
  constructor(
    private caseStudyService: CaseStudyService,
    private route: ActivatedRoute
  ) {}
  post: any;
  posts: any = [];
  slugName: string = '';
  imgCDN: string = environment.squidexAssets;
  isLoading: boolean = false;

  async ngOnInit() {
    this.route.params.subscribe((param) => {
      this.isLoading = true;
      this.slugName = param['type'];

      this.caseStudyService
        .getCaseStudyBySlug(this.slugName)
        .then((resp: any) => {
          this.post = resp?.items[0].data;
          this.isLoading = false;

          this.getAllCaseStudies();
        })
        .catch((err: any) => {
          console.log(err);
        });
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    });
  }

  getAllCaseStudies() {
    this.isLoading = true;
    this.caseStudyService.fetchPosts().subscribe((resp: any) => {
      this.posts = resp?.items.filter((item: any) => {
        return item.data.slug.iv !== this.slugName;
      });

      this.isLoading = false;
    });
  }
}
