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

@Component({
  selector: 'app-ai-development',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './ai-development.component.html',
  styleUrl: './ai-development.component.scss',
})
export class AiDevelopmentComponent {
  testimonials: any = [];
  contactForm!: FormGroup;
  isLoading: boolean = false;
  constructor(
    private testimonialService: TestimonialService,
    private fb: FormBuilder,
    private toastr: ToastrService,

    private el: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      company: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.testimonialService.fetchTestimonials().subscribe((res: any) => {
      this.testimonials = res.items;
    });
  }
  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      // window.REQUIRED_CODE_ERROR_MESSAGE = 'Please choose a country code';
      // window.LOCALE = 'en';
      // window.EMAIL_INVALID_MESSAGE = window.SMS_INVALID_MESSAGE =
      //   'The information provided is invalid. Please review and try again.';
      // window.REQUIRED_ERROR_MESSAGE = 'Required. ';
      // window.GENERIC_INVALID_MESSAGE =
      //   'The information provided is invalid. Please review and try again.';
      // window.translation = {
      //   common: {
      //     selectedList: '{quantity} list selected',
      //     selectedLists: '{quantity} lists selected',
      //   },
      // };
      // var AUTOHIDE = Boolean(0);
      // const script = document.createElement('script');
      // script.src = 'https://sibforms.com/forms/end-form/build/main.js';
      // script.defer = true;
      // document.body.appendChild(script);
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
  // onSubmit() {
  //   this.isLoading = true;

  //   this.contactForm.markAllAsTouched();
  //   if (this.contactForm.invalid) {
  //     this.isLoading = false;
  //     this.toastr.error('Please provide all the details');
  //     return;
  //   }
  // }
  // scrollToSection(section:string) {
  //   const sectionEle = this.el.nativeElement.querySelector(section);
  //   if (sectionEle) {
  //     section.scrollIntoView({ behavior: 'smooth' });
  //   }
  // }
}
