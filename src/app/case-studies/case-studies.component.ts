import { Component, OnInit } from '@angular/core';
import { CaseStudyService } from '../services/case-study.service';

@Component({
  selector: 'app-case-studies',
  standalone: true,
  imports: [],
  templateUrl: './case-studies.component.html',
  styleUrl: './case-studies.component.scss'
})
export class CaseStudiesComponent implements OnInit{
  constructor(private caseStudyService: CaseStudyService) { }
  posts: any[] = [];

  async ngOnInit() {
    this.caseStudyService.fetchPosts().then((resp:any) => {
    
      console.log(resp);
      this.posts = resp?.items;

      console.log("************", resp?.items.data)
    })
    .catch((err: any) => {
      console.log(err)
    })
  }

}
