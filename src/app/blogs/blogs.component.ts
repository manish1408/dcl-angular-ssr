import { Component } from '@angular/core';
import { BlogService } from '../services/blog.service';

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.scss'
})
export class BlogsComponent {
  posts: any[] = [];

  constructor(private blogService: BlogService) { }

  async ngOnInit() {
    this.blogService.fetchPosts().then((resp:any) => {
      console.log(resp);
      this.posts = resp?.items;

      console.log("************", resp?.items[0]?.data?.title?.iv)
    })
    .catch((err: any) => {
      console.log(err)
    })
  }
}
