import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  @Output() submit: EventEmitter<void> = new EventEmitter<void>();
  isLoading: boolean = false;
  detailsForm!: FormGroup;
  id!: string;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private formDataService: FormDataService,
    private toastr: ToastrService
  ) {
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
      this.submit.emit(this.detailsForm.value);
      this.formDataService
        .saveScheduleCall(this.detailsForm.value)
        .subscribe((res) => {
          console.log(res);
          if (res.result === 1) {
            this.id = res.data._id;
            this.router.navigate([
              '/schedule-call/contact-information',
              this.id,
            ]);
          }
        }),
        (error: any) => {
          console.error('Error occurred:', error);
          this.toastr.error('Something went wrong. Please try again.');
        };
    }
  }
}
