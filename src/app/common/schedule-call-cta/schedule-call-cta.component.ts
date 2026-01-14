import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ContactService } from '../../services/contact.service';
import { PhoneDropdownComponent } from '../phone-dropdown/phone-dropdown.component';

@Component({
  selector: 'app-schedule-call-cta',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, ReactiveFormsModule, PhoneDropdownComponent],
  templateUrl: './schedule-call-cta.component.html',
  styleUrl: './schedule-call-cta.component.scss',
})
export class ScheduleCallCTAComponent implements OnInit {
  @Input() services: any = [];
  contactForm!: FormGroup;
  isLoading: boolean = false;
  selectedCountry: any;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private contactService: ContactService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      company: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  onCountrySelected(country: any) {
    this.selectedCountry = country;
  }

  allowOnlyNumbers(event: KeyboardEvent): void {
    const char = event.key;
    const regex = /^[0-9]*$/;
    if (!regex.test(char)) {
      event.preventDefault();
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
    if (this.contactForm.invalid || !this.selectedCountry) {
      this.isLoading = false;
      if (!this.selectedCountry) {
        this.toastr.error('Please select a country code');
      } else {
        this.toastr.error('Please provide all the details');
      }
      return;
    }

    const reqObj = {
      ...this.contactForm.value,
      phone: this.selectedCountry.phone[0] + ' ' + this.contactForm.value.phone,
    };

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
}
