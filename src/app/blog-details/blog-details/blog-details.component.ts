import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-blog-details',
  standalone: true,
  imports: [],
  templateUrl: './blog-details.component.html',
  styleUrl: './blog-details.component.scss'
})
export class BlogDetailsComponent implements OnInit {
  constructor(private blogService: BlogService, private route: ActivatedRoute) { }
  posts: any[] = [];
  slugName: string=''

  async ngOnInit() {

    this.route.params.subscribe(param => {
      this.slugName = param['type'];
      console.log(this.slugName); 
    });
    this.blogService.getBlogBySlug(this.slugName).then((resp:any) => {
    
      console.log(resp);
      this.posts = resp?.items;

      console.log("************", resp)
    })
    .catch((err: any) => {
      console.log(err)
    })
  }

}
