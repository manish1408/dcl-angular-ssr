import { Component, ElementRef } from '@angular/core';
import { BlogService } from '../services/blog.service';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

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
    private el: ElementRef,
    private meta: Meta,
    private title: Title
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.blogService.fetchPosts().subscribe((resp: any) => {
      this.posts = resp?.items;
      this.isLoading = false;

      this.formatDates();
    });

    this.title.setTitle(`Distinct Cloud Labs | Blogs - Company Updates & Technology Articles`);
    this.meta.addTags([
      {
        name: "description",
        content: 'Stay updated with the latest insights, trends, and success stories in AI and ML. Explore expert articles, case studies, and innovative solutions from Distinct Cloud Labs to drive growth and transformation in your business.',
      },
      { property: "og:title", content: `Distinct Cloud Labs | Blogs - Company Updates & Technology Articles` },
      {
        property: "og:description",
        content: 'Stay updated with the latest insights, trends, and success stories in AI and ML. Explore expert articles, case studies, and innovative solutions from Distinct Cloud Labs to drive growth and transformation in your business.',
      },
      {
        property: "twitter:title",
        content: `Distinct Cloud Labs | Blogs - Company Updates & Technology Articles`,
      },
      {
        property: "twitter:description",
        content: 'Stay updated with the latest insights, trends, and success stories in AI and ML. Explore expert articles, case studies, and innovative solutions from Distinct Cloud Labs to drive growth and transformation in your business.',
      },
    ]);
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
