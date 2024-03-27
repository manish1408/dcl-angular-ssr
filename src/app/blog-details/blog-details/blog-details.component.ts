import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { environment } from '../../environments/environment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blog-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog-details.component.html',
  styleUrl: './blog-details.component.scss',
})
export class BlogDetailsComponent implements OnInit {
  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute
  ) {}

  imgCDN: string = environment.squidexAssets;
  post: any;
  slugName: string = '';
  isLoading: boolean = false;
  posts: any = [];

  async ngOnInit() {
    this.route.params.subscribe((param) => {
      this.slugName = param['type'];
      console.log(this.slugName);
    });
    this.blogService
      .getBlogBySlug(this.slugName)
      .then((resp: any) => {
        console.log(resp);
        this.post = resp?.items[0].data;

        console.log('Blog details:', this.post);
        this.getAllBlogs();
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  getAllBlogs() {
    this.isLoading = true;
    this.blogService
      .fetchPosts()
      .then((resp: any) => {
        console.log(resp);

        this.posts = resp?.items.filter((item: any) => {
          return item.data.slug.iv !== this.slugName;
        });

        this.isLoading = false;
        console.log('All blog details:', this.posts);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }
}
