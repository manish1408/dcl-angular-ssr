import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { environment } from '../../environments/environment';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-blog-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  providers: [DatePipe],
  templateUrl: './blog-details.component.html',
  styleUrl: './blog-details.component.scss',
})
export class BlogDetailsComponent implements OnInit {
  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private el: ElementRef
  ) {}

  imgCDN: string = environment.squidexAssets;
  post: any;
  slugName: string = '';
  isLoading: boolean = false;
  posts: any = [];
  date: any;
  formattedDate: any;

  async ngOnInit() {
    this.route.params.subscribe((param) => {
      this.isLoading = true;
      this.slugName = param['type'];
    });
    this.blogService.getBlogBySlug(this.slugName).subscribe((resp: any) => {
      this.post = resp?.items[0].data;
      this.isLoading = false;

      this.date = resp.items[0].created;

      this.formatDate(this.date);
      this.getAllBlogs();
    });
  }

  getAllBlogs() {
    this.isLoading = true;
    this.blogService.fetchPosts().subscribe((resp: any) => {
      console.log(resp);

      this.posts = resp?.items.filter((item: any) => {
        return item.data.slug.iv !== this.slugName;
      });

      this.isLoading = false;
      console.log('All blog details:', this.posts);
    });
  }

  formatDate(date: any) {
    let receivedDate: Date = new Date(date);
    this.formattedDate = this.datePipe.transform(receivedDate, 'd MMM, yyyy');
  }
  scrollToSection() {
    const section = this.el.nativeElement.querySelector('#blog-details');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
