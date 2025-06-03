import { Component, ElementRef, OnInit } from '@angular/core';
import { CaseStudyService } from '../services/case-study.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-case-studies',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './case-studies.component.html',
  styleUrl: './case-studies.component.scss',
})
export class CaseStudiesComponent implements OnInit {
  constructor(
    private caseStudyService: CaseStudyService,
    private el: ElementRef,
    private meta: Meta,
    private title: Title
  ) {}

  posts: any[] = [];
  isLoading: boolean = false;

  async ngOnInit() {
    this.isLoading = true;
    this.caseStudyService.fetchPosts().subscribe((resp: any) => { 
      this.posts = resp?.items;
      this.isLoading = false;
    });

    this.title.setTitle(`Distinct Cloud Labs |  Case studies`);
    this.meta.addTags([
      {
        name: "description",
        content: 'Explore AI solutions with Distinct Cloud Labs, from virtual assistants to customer behavior analysis and AI-powered learning platforms. Get a free assessment to see how AI can transform your business.',
      },
      { property: "og:title", content: `Distinct Cloud Labs |  Case studies` },
      {
        property: "og:description",
        content: 'Explore AI solutions with Distinct Cloud Labs, from virtual assistants to customer behavior analysis and AI-powered learning platforms. Get a free assessment to see how AI can transform your business.',
      },
      {
        property: "twitter:title",
        content: `Distinct Cloud Labs |  Case studies`,
      },
      {
        property: "twitter:description",
        content: 'Explore AI solutions with Distinct Cloud Labs, from virtual assistants to customer behavior analysis and AI-powered learning platforms. Get a free assessment to see how AI can transform your business.',
      },
    ]);
  }
  scrollToSection() {
    const section = this.el.nativeElement.querySelector(
      '#case-study-card-section'
    );
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }
   downloadPdf(post: any) {
      const fileId = post?.data?.PDF?.iv?.[0];
      const fileName = post?.data?.slug?.iv + '.pdf';
    
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
