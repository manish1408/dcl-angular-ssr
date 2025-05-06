import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { CaseStudyService } from '../services/case-study.service';
import { ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';
import { environment } from '../environments/environment';
import { CommonModule } from '@angular/common';
import { CommonService } from '../services/common.service';
import { Meta, Title } from '@angular/platform-browser';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-case-details',
  standalone: true,
  imports: [RouterModule, RouterOutlet, CommonModule],
  templateUrl: './case-details.component.html',
  styleUrl: './case-details.component.scss',
})
export class CaseDetailsComponent implements OnInit {
  constructor(
    private caseStudyService: CaseStudyService,
    private route: ActivatedRoute,
    private renderer: Renderer2,
    private el: ElementRef,
    private common: CommonService,
    private meta: Meta,
    private title: Title
  ) {}
  post: any;
  posts: any = [];
  slugName: string = '';
  imgCDN: string = environment.squidexAssets;
  isLoading: boolean = false;
  timeline:any;
  async ngOnInit() {
    this.route.params.subscribe((param) => {
      this.isLoading = true;
      this.slugName = param['type'];

      this.caseStudyService
        .getCaseStudyBySlug(this.slugName)
        .subscribe((resp: any) => {
          this.post = resp?.items[0].data;
          this.updateMetaTags(resp?.items[0].data)
          this.timeline = resp?.items[0].data.devTrack.iv;
          this.isLoading = false;

          this.getAllCaseStudies();
        });
      if (this.common.isBrowser()) {
        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth',
        });
      }
    });
  }

  getAllCaseStudies() {
    this.isLoading = true;
    this.caseStudyService.fetchPosts().subscribe((resp: any) => {
      this.posts = resp?.items.filter((item: any) => {
        return item.data.slug.iv !== this.slugName;
      });
      this.posts = this.posts.slice(0,3);
      this.isLoading = false;
    });
  }

  scrollToSection() {
    const section = this.el.nativeElement.querySelector(
      '#case-details-section1'
    );
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }
  updateMetaTags(blog: any) {
    const sanitizedContent = this.stripHtmlTags(blog.description.iv);
    this.title.setTitle(`Distinct Cloud Labs |  ${blog.projectName.iv}`);
    this.meta.addTags([
      {
        name: "description",
        content: sanitizedContent.substring(0, 160),
      },
      { property: "og:title", content: `Distinct Cloud Labs | ${blog.projectName.iv}` },
      {
        property: "og:description",
        content: sanitizedContent.substring(0, 160),
      },
      {
        property: "twitter:title",
        content: `Distinct Cloud Labs | ${blog.projectName.iv}`,
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

  // downloadPdf() {
  //   const fileUrl = 'https://cms.distinctcloud.io/api/assets/distinct-cloud-labs/e45ced4c-794d-48fd-bda7-94c1ff001cfa';
  //   const fileName = 'document.pdf';
  // fetch(fileUrl)
  //   .then(response => response.blob())
  //   .then(blob => {
  //     saveAs(blob, fileName);
  //   })
  //   .catch(err => console.error('Download failed', err));
  // }
  downloadPdf() {
    const fileId = this.post?.thumbnail?.iv?.[0]; 
    const fileName = this.post?.slug?.iv + '.pdf'; 
  
    if (fileId && fileName) {
      const fileUrl = `https://cms.distinctcloud.io/api/assets/distinct-cloud-labs/${fileId}`;
  
      fetch(fileUrl)
        .then(response => response.blob())
        .then(blob => {
          saveAs(blob, fileName);
        })
        .catch(err => console.error('Download failed', err));
    } else {
      console.error('Missing fileId or fileName');
    }
}
}
