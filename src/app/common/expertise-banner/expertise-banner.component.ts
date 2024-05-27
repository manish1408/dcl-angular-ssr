import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-expertise-banner',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './expertise-banner.component.html',
  styleUrl: './expertise-banner.component.scss',
})
export class ExpertiseBannerComponent implements OnInit {
  @Output() submit: EventEmitter<any> = new EventEmitter<any>();
  @Input() isLoading: boolean = false;
  @Input() initialHeader!: string;
  @Input() mainHeader!: string;
  @Input() description!: string;
  @Input() buttonCta!: string;
  @Input() services: any = [];

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
    this.detailsForm.markAllAsTouched();
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
