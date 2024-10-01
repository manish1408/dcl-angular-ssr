import { Component, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
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

@Component({
  selector: 'app-ai-development',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    SummaryPipe,
  ],
  templateUrl: './ai-development.component.html',
  styleUrl: './ai-development.component.scss',
})
export class AiDevelopmentComponent {
  testimonials: any = [];
  newsEmail: string = '';
  constructor(
    private testimonialService: TestimonialService,
    private fb: FormBuilder,
    private toastr: ToastrService,

    private el: ElementRef
  ) {}

  ngOnInit(): void {
    this.testimonialService.fetchTestimonials().subscribe((res: any) => {
      this.testimonials = res.items;
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
