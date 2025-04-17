import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { EngagementModelsComponent } from '../common/engagement-models/engagement-models.component';
import { HiringProcessComponent } from '../common/hiring-process/hiring-process.component';
import { HomeTestimonialsComponent } from '../common/home-testimonials/home-testimonials.component';
import { ScheduleCallCTAComponent } from '../common/schedule-call-cta/schedule-call-cta.component';
import { TestimonialCardComponent } from '../common/testimonial-card/testimonial-card.component';
import { CommonService } from '../services/common.service';
import { HomeService } from '../services/home.service';
import { TestimonialService } from '../services/testimonial.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ContactService } from '../services/contact.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
declare var Swiper: any;
@Component({
  selector: 'app-ai-agency',
  standalone: true,
  templateUrl: './ai-agency.component.html',
  styleUrl: './ai-agency.component.scss',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    // TestimonialCardComponent,
    HomeTestimonialsComponent,
    RouterModule,
    // EngagementModelsComponent,
    ScheduleCallCTAComponent,
    HiringProcessComponent,
  ],
})
export class AIAgencyComponent implements OnInit {
  contactForm!: FormGroup;
  isLoading: boolean = false;
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private contactService: ContactService,
    private testimonialService: TestimonialService,
    private homeService: HomeService,
    private common: CommonService,
    private meta: Meta,
    private title: Title
  ) {
    this.title.setTitle(
      'Distinct Cloud Labs | Empower Your Business with AI and ML '
    );

    this.meta.addTags([
      {
        name: 'description',
        content:
          "Transform your business with Distinct Cloud Labs' AI enablement services. From tailored AI strategies to custom development, seamless integration, and expert training, we help you unlock growth and innovation with cutting-edge AI solutions.",
      },
      { property: 'og:title', content: 'Home' },
      {
        property: 'og:description',
        content:
          "Transform your business with Distinct Cloud Labs' AI enablement services. From tailored AI strategies to custom development, seamless integration, and expert training, we help you unlock growth and innovation with cutting-edge AI solutions.",
      },
      {
        property: 'twitter:title',
        content: 'Distinct Cloud Labs | Empower Your Business with AI and ML',
      },
      {
        property: 'twitter:description',
        content:
          "Transform your business with Distinct Cloud Labs' AI enablement services. From tailored AI strategies to custom development, seamless integration, and expert training, we help you unlock growth and innovation with cutting-edge AI solutions.",
      },
    ]);
  }

  testimonials: any = [];
  currentIndex: number = 0;
  currentTestimonial: any;
  ctaDetails: any = [];
  engagementModels: any = [];

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      company: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      // subject: ['', Validators.required],
      message: ['', Validators.required],
    });
    this.testimonialService.fetchTestimonials().subscribe((res: any) => {
      this.testimonials = res.items;
      this.swiperinitTestimonial();
    });
    this.getCTA();

    if (this.common.isBrowser()) {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    }
  }

  hasError(controlName: keyof typeof this.contactForm.controls) {
    const control = this.contactForm.controls[controlName];
    return control.invalid && control.touched;
  }
  hasEmailFormatError() {
    return (
      this.contactForm.controls['email'].hasError('email') &&
      this.contactForm.controls['email'].touched
    );
  }

  onSubmit() {
    this.isLoading = true;

    this.contactForm.markAllAsTouched();
    if (this.contactForm.invalid) {
      this.isLoading = false;
      this.toastr.error('Please provide all the details');
      return;
    }

    this.contactService.postContact(this.contactForm.value).subscribe(
      (res: any) => {
        this.isLoading = false;
        if (res.success) {
          this.toastr.success('Thanks for submitting');
          this.contactForm.reset();
        } else this.toastr.error('An error occurred while submitting');
      },
      (error) => {
        this.isLoading = false;
        console.error('Error occurred:', error);
        this.toastr.error('An error occurred while submitting');
      }
    );
  }

  swiperinitTestimonial() {
    if (this.common.isBrowser()) {
      window.setTimeout(() => {
        var swiper = new Swiper('.home3-testimonial-slider', {
          slidesPerView: 1,
          speed: 1500,
          spaceBetween: 30,
          navigation: {
            nextEl: '.home3-testimonial-next',
            prevEl: '.home3-testimonial-prev',
          },
        });
      }, 100);
    }
  }

  getCTA() {
    this.homeService.getCTA().then((res) => {
      this.ctaDetails = res.items;
    });
  }

  getEngagementModels() {
    this.homeService.getEngagementModels().then((res) => {
      this.engagementModels = res.items;
    });
  }
}
