import { Component, ElementRef } from '@angular/core';
import { BlogService } from '../services/blog.service';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [RouterModule, CommonModule],
  providers: [DatePipe],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.scss',
})
export class BlogsComponent {
  posts: any[] = [];
  isLoading: boolean = false;

  formattedDate: any;

  constructor(
    private blogService: BlogService,
    private datePipe: DatePipe,
    private el: ElementRef
  ) {}

  async ngOnInit() {
    this.isLoading = true;
    this.blogService
      .fetchPosts()
      .then((resp: any) => {
        this.posts = resp?.items;
        this.isLoading = false;

        this.formatDates();
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  formatDates() {
    this.posts.forEach((post) => {
      let createdDate: Date = new Date(post.created);

      post.day = this.datePipe.transform(createdDate, 'd');
      post.month = this.datePipe.transform(createdDate, 'MMMM');
    });
  }

  scrollToSection() {
    const section = this.el.nativeElement.querySelector('#blog-grid');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
