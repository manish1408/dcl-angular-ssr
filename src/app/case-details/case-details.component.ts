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
  isLoading: boolean = true;

  async ngOnInit() {
    this.route.params.subscribe((param) => {
      this.slugName = param['type'];
      console.log(this.slugName);

      this.caseStudyService
        .getCaseStudyBySlug(this.slugName)
        .then((resp: any) => {
          console.log(resp);
          this.post = resp?.items[0].data;

          console.log('************', this.post);
          this.getAllCaseStudies();
        })
        .catch((err: any) => {
          console.log(err);
        });
    });
  }

  getAllCaseStudies() {
    this.caseStudyService
      .fetchPosts()
      .then((resp: any) => {
        console.log(resp);

        this.posts = resp?.items.filter((item: any) => {
          return item.data.slug.iv !== this.slugName;
        });

        console.log('All case studies:', this.posts);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }
}
