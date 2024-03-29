import { ɵBrowserAnimationBuilder } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ContactService } from '../services/contact.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;
  isLoading: boolean = false;
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private contactService: ContactService
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
        if (res.msg == 'SUCCESS') this.toastr.success('Thanks for submitting');
        else this.toastr.error('An error occurred while submitting');
      },
      (error) => {
        this.isLoading = false;
        console.error('Error occurred:', error);
        this.toastr.error('An error occurred while submitting');
      }
    );
  }
}
