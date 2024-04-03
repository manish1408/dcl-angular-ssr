import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { FormDataService } from '../../services/form-data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-service-banner',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './service-banner.component.html',
  styleUrl: './service-banner.component.scss',
})
export class ServiceBannerComponent implements OnInit {
  @Output() submit: EventEmitter<any> = new EventEmitter<any>();
  @Input() isLoading: boolean = false;

  detailsForm!: FormGroup;
  id!: string;
  constructor(private fb: FormBuilder, private toastr: ToastrService) {
    this.detailsForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      serviceMessage: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}
  hasError(controlName: keyof typeof this.detailsForm.controls) {
    const control = this.detailsForm.controls[controlName];
    return control.invalid && control.touched;
  }
  hasEmailFormatError() {
    return (
      this.detailsForm.controls['email'].hasError('email') &&
      this.detailsForm.controls['email'].touched
    );
  }
  onSubmit() {
    if (this.detailsForm.valid) {
      this.submit.emit(this.detailsForm);
    } else if (this.detailsForm.invalid) {
      if (this.detailsForm.controls['email'].errors?.['email']) {
        this.toastr.error('Invalid email format');
      } else {
        this.toastr.error('Please provide all the details');
      }
    }
  }
}
