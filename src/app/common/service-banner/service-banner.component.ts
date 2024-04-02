import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-service-banner',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './service-banner.component.html',
  styleUrl: './service-banner.component.scss',
})
export class ServiceBannerComponent implements OnInit {
  isLoading: boolean = false;
  basicDetailsForm!: FormGroup;
  constructor(private fb: FormBuilder) {
    this.basicDetailsForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      serviceMessage: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}
  hasError(controlName: keyof typeof this.basicDetailsForm.controls) {
    const control = this.basicDetailsForm.controls[controlName];
    return control.invalid && control.touched;
  }
  hasEmailFormatError() {
    return (
      this.basicDetailsForm.controls['email'].hasError('email') &&
      this.basicDetailsForm.controls['email'].touched
    );
  }
  onSubmit() {}
}
