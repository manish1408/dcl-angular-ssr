import {
  Component,
  ElementRef,
  Inject,
  PLATFORM_ID,
  Renderer2,
} from '@angular/core';
import { TestimonialService } from '../services/testimonial.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SummaryPipe } from '../_pipes/summary.pipe';
import { CaseStudyService } from '../services/case-study.service';
import { Router } from '@angular/router';
import { finalize, forkJoin } from 'rxjs';
import { AiProjectsComponent } from '../common/ai-projects/ai-projects.component';
import { AiDemosComponent } from '../common/ai-demos/ai-demos.component';
import { AiTestimonialsComponent } from '../common/ai-testimonials/ai-testimonials.component';
import { AiFooterComponent } from '../common/ai-footer/ai-footer.component';
import { LandingHeaderComponent } from '../common/landing-header/landing-header.component';
declare var Swiper: any;
@Component({
  selector: 'app-ai-development',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    SummaryPipe,
    AiProjectsComponent,
    AiDemosComponent,
    AiTestimonialsComponent,
    AiFooterComponent,
    LandingHeaderComponent,
  ],
  templateUrl: './ai-development.component.html',
  styleUrl: './ai-development.component.scss',
})
export class AiDevelopmentComponent {
  testimonials: any = [];
  newsEmail: string = '';
  posts: any[] = [];
  portfolios: any[] = [];
  clientServices: any;
  loading = false;
  private swiperInstance: any;
  constructor(
    private testimonialService: TestimonialService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private caseStudyService: CaseStudyService,
    private el: ElementRef,
    @Inject(PLATFORM_ID) private platformId: object,
    private renderer: Renderer2,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.caseStudyService
    .fetchPortfolio()
    .pipe(finalize(() => (this.loading = false)))
    .subscribe((resp: any) => {
      this.portfolios = resp?.items;
    });
  }



  scrollToSection(section: string) {
    const sectionEle = this.el.nativeElement.querySelector(section);
    if (sectionEle) {
      sectionEle.scrollIntoView({ behavior: 'smooth' });
    }
  }
  newsLetterSubmit() {
    if (!this.newsEmail) {
      this.toastr.error('Email is required');
      return;
    }
    this.toastr.success('Thankyou for subscribing');
  }
}
