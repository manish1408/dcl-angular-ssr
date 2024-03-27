import { Component, OnInit } from '@angular/core';
import { CaseStudyService } from '../services/case-study.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-case-details',
  standalone: true,
  imports: [],
  templateUrl: './case-details.component.html',
  styleUrl: './case-details.component.scss'
})
export class CaseDetailsComponent implements OnInit {

  constructor(private caseStudyService: CaseStudyService, private route: ActivatedRoute) { }
  posts: any[] = [];
  slugName: string=''

  async ngOnInit() {

    this.route.params.subscribe(param => {
      this.slugName = param['type'];
      console.log(this.slugName); 
    });
    this.caseStudyService.getCaseStudyBySlug(this.slugName).then((resp:any) => {
    
      console.log(resp);
      this.posts = resp?.items;

      console.log("************", resp)
    })
    .catch((err: any) => {
      console.log(err)
    })
  }

}
