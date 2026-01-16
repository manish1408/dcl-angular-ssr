import { Component, ElementRef } from '@angular/core';
import { CareersService } from '../services/careers.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-careers',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './careers.component.html',
  styleUrl: './careers.component.scss',
})
export class CareersComponent {
  jobs: any[] = [];
  isLoading: boolean = false;

  constructor(
    private careersService: CareersService,
    private el: ElementRef,
    private meta: Meta,
    private title: Title
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.careersService.fetchJobs().subscribe({
      next: (resp: any) => {
        this.jobs = resp?.items && resp.items.length > 0 ? resp.items : this.getSampleJobs();
        this.isLoading = false;
      },
      error: () => {
        this.jobs = this.getSampleJobs();
        this.isLoading = false;
      }
    });

    this.title.setTitle(`Distinct Cloud Labs | Careers - Open Positions`);
    this.meta.addTags([
      {
        name: "description",
        content: "Join Distinct Cloud Labs and be part of a team that's shaping the future of AI and technology. Explore our open positions and find your next career opportunity.",
      },
      { property: "og:title", content: `Distinct Cloud Labs | Careers - Open Positions` },
      {
        property: "og:description",
        content: "Join Distinct Cloud Labs and be part of a team that's shaping the future of AI and technology. Explore our open positions and find your next career opportunity.",
      },
      {
        property: "twitter:title",
        content: `Distinct Cloud Labs | Careers - Open Positions`,
      },
      {
        property: "twitter:description",
        content: "Join Distinct Cloud Labs and be part of a team that's shaping the future of AI and technology. Explore our open positions and find your next career opportunity.",
      },
    ]);
  }

  scrollToSection() {
    const section = this.el.nativeElement.querySelector('#careers-grid');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }

  private getSampleJobs() {
    return [
      {
        data: {
          title: { iv: 'Senior AI Engineer' },
          description: { iv: 'Join our team to build cutting-edge AI solutions and work on innovative projects that transform businesses.' },
          thumbnail: { iv: [''] },
          applyUrl: { iv: 'mailto:careers@distinctcloud.io' },
          slug: { iv: 'senior-ai-engineer' }
        }
      },
      {
        data: {
          title: { iv: 'Full Stack Developer' },
          description: { iv: 'Develop scalable web applications using modern technologies and contribute to our growing product portfolio.' },
          thumbnail: { iv: [''] },
          applyUrl: { iv: 'mailto:careers@distinctcloud.io' },
          slug: { iv: 'full-stack-developer' }
        }
      },
      {
        data: {
          title: { iv: 'Machine Learning Specialist' },
          description: { iv: 'Design and implement ML models that solve real-world problems and drive business value for our clients.' },
          thumbnail: { iv: [''] },
          applyUrl: { iv: 'mailto:careers@distinctcloud.io' },
          slug: { iv: 'machine-learning-specialist' }
        }
      }
    ];
  }
}
