import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
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
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { ContactService } from '../services/contact.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { PhoneDropdownComponent } from '../common/phone-dropdown/phone-dropdown.component';
declare var Swiper: any;
@Component({
  selector: 'app-ai-agency',
  standalone: true,
  templateUrl: './ai-agency.component.html',
  styleUrl: './ai-agency.component.scss',
  imports: [
    PhoneDropdownComponent,
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
  selectedCountry: any;
  isLoading: boolean = false;
  pageTitle: string = 'AI Development Services';
  pageDescription: string = "Partner with Distinct Clould Labs to launch intelligent, scalable solutions that streamline operations and boost performance - all backed by industry leaders-leading AI expertise.";
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private contactService: ContactService,
    private testimonialService: TestimonialService,
    private homeService: HomeService,
    private common: CommonService,
    private meta: Meta,
    private title: Title,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.title.setTitle(
      'Distinct Cloud Labs | AI development services '
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
        content: 'Distinct Cloud Labs | AI development services',
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

  // Custom validator for business email
  private businessEmailValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }

    const email = control.value.toLowerCase();
    const commonPersonalDomains = [
      'gmail.com',
      'yahoo.com',
      'hotmail.com',
      'outlook.com',
      'aol.com',
      'icloud.com',
      'mail.com',
      'protonmail.com',
      'zoho.com',
      'yandex.com',
      'live.com',
      'inbox.com',
      'gmx.com'
    ];

    const domain = email.split('@')[1];
    if (domain && commonPersonalDomains.includes(domain)) {
      return { personalEmail: true };
    }

    return null;
  }

  ngOnInit(): void {
    const currentUrl = this.router.url;
    if (currentUrl.includes('n8n')) {
      this.pageTitle = 'Trusted n8n automation experts.';
      this.pageDescription = 'We build n8n automations for your business that works flawless for years. Contact us if you are looking to automate your business using n8n.';
      this.meta.updateTag({ name: 'description', content: this.pageDescription });
      this.meta.updateTag({ property: 'og:description', content: this.pageDescription });
      this.meta.updateTag({ property: 'twitter:description', content: this.pageDescription });
      this.meta.updateTag({ property: 'og:title', content: "Distinct Cloud Labs: " + this.pageTitle });
      this.meta.updateTag({ property: 'twitter:title', content: this.pageTitle });
      this.title.setTitle("Distinct Cloud Labs: " + this.pageTitle.replace(/<br>/g, ' '));
    }

    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      company: [''],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, this.businessEmailValidator.bind(this)]],
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
    const emailControl = this.contactForm.controls['email'];
    return (
      (emailControl.hasError('email') || emailControl.hasError('personalEmail')) &&
      emailControl.touched
    );
  }

  onSubmit() {
    console.log(  this.selectedCountry)
    this.isLoading = true;

    this.contactForm.markAllAsTouched();
    if (this.contactForm.invalid) {
      this.isLoading = false;
      this.toastr.error('Please provide all the details');
      return;
    }
    const reqObj={
      ...this.contactForm.value,
      phone: this.selectedCountry?.phone[0] + ' ' + this.contactForm.value.phone,
      subject:''
    }
    this.contactService.postContact(reqObj).subscribe(
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

  allowOnlyNumbers(event: KeyboardEvent): void {
    const charCode = event.key;
    if (!/^[0-9]$/.test(charCode)) {
      event.preventDefault();
    }
  }

  onCountrySelected(country: any) {
    this.selectedCountry = country;
  }
  allowOnlyAlphabets(event: KeyboardEvent): void {
    const char = event.key;
    const regex = /^[a-zA-Z\s]*$/;
    if (!regex.test(char)) {
      event.preventDefault();
    }
  }
  
  sanitizeAlphabetPaste(event: ClipboardEvent): void {
    event.preventDefault();
    const pastedInput: string = event.clipboardData
      ?.getData('text')
      .replace(/[^a-zA-Z\s]/g, '') || '';
  
    const input = event.target as HTMLInputElement;
    const start = input.selectionStart || 0;
    const end = input.selectionEnd || 0;
    const value = input.value;
  
    input.value =
      value.substring(0, start) + pastedInput + value.substring(end);
    input.setSelectionRange(start + pastedInput.length, start + pastedInput.length);
  
    // Also update form control if needed
    this.contactForm?.get('name')?.setValue(input.value);
  }
    
  
}
