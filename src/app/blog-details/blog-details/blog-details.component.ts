import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { environment } from '../../environments/environment';
import { CommonModule, DatePipe } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';

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
    private el: ElementRef,
    private meta: Meta,
    private title: Title
  ) {}

  imgCDN: string = environment.squidexAssets;
  post: any;
  slugName: string = '';
  isLoading: boolean = false;
  posts: any = [];
  date: any;
  formattedDate: any;
  currentPlayingIndex: number | null = null;
  async ngOnInit() {
    this.route.params.subscribe((param) => {
      this.isLoading = true;
      this.slugName = param['type'];
   
    this.blogService.getBlogBySlug(this.slugName).subscribe((resp: any) => {
      console.log(resp);
      this.post = resp?.items[0].data;
      this.updateMetaTags(resp?.items[0].data)
      this.isLoading = false;

      this.date = resp.items[0].created;
      console.log(this.post);
      this.formatDate(this.date);
      this.getAllBlogs();
    }); 
   });
  }

  getAllBlogs() {
    this.isLoading = true;
    this.blogService.fetchPosts().subscribe((resp: any) => {
      this.posts = resp?.items.filter((item: any) => {
        return item.data.slug.iv !== this.slugName;
      });

      this.isLoading = false;
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
  getBackgroundImage(thumbnainImage: string, index: number): string {
    const gradients = [
      '109deg, #22a76c 37.47%, rgba(102, 102, 102, 0.5) 100%',
      '109deg, #8B5CF6 37.47%, rgba(102, 102, 102, 0.50) 100%',
      '109deg, #F472B6 37.47%, rgba(102, 102, 102, 0.50) 100%',
    ];
    const gradient = gradients[index % gradients.length];
    const imageUrl = thumbnainImage
      ? `${this.imgCDN}${thumbnainImage}`
      : '/assets/icons/podcast-sample-img.png';

    return `linear-gradient(${gradient}), url('${imageUrl}')`;
  }
  toggleAudio(audioPlayer: any, index: number): void {
    if (this.currentPlayingIndex === index) {
      // If the current audio is already playing, stop it
      audioPlayer.pause();
      audioPlayer.currentTime = 0; // Reset the audio
      this.currentPlayingIndex = null;
    } else {
      // Stop the previously playing audio (if any)
      const previouslyPlayingAudio = document.querySelector('audio');
      if (previouslyPlayingAudio) {
        previouslyPlayingAudio.pause();
        previouslyPlayingAudio.currentTime = 0;
      }

      // Play the selected audio
      audioPlayer.play();
      this.currentPlayingIndex = index;
    }
  }

  updateMetaTags(blog: any) {
    const sanitizedContent = this.stripHtmlTags(blog.text.iv);
    this.title.setTitle(`Distinct Cloud Labs |  ${blog.title.iv}`);
    this.meta.addTags([
      {
        name: "description",
        content: sanitizedContent.substring(0, 160),
      },
      { property: "og:title", content: `Distinct Cloud Labs | ${blog.title.iv}` },
      {
        property: "og:description",
        content: sanitizedContent.substring(0, 160),
      },
      {
        property: "twitter:title",
        content: `Distinct Cloud Labs | ${blog.title.iv}`,
      },
      {
        property: "twitter:description",
        content: sanitizedContent.substring(0, 160),
      },
    ]);
  }

  stripHtmlTags(content: string): string {
    return content.replace(/<\/?[^>]+(>|$)/g, "");
  }
}
