import { Component } from '@angular/core';
import { BlogService } from '../services/blog.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.scss',
})
export class BlogsComponent {
  posts: any[] = [];
  isLoading: boolean = false;

  constructor(private blogService: BlogService) {}

  async ngOnInit() {
    this.isLoading = true;
    this.blogService
      .fetchPosts()
      .then((resp: any) => {
        console.log(resp);
        this.posts = resp?.items;
        this.isLoading = false;
        console.log('All Blogs', this.posts);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }
}
