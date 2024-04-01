import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormDataService } from '../../services/form-data.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact-information',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './contact-information.component.html',
  styleUrl: './contact-information.component.scss',
})
export class ContactInformationComponent implements OnInit {
  savedFormData: any;
  contactInfoForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private formDataService: FormDataService,
    private toastr: ToastrService
  ) {
    this.contactInfoForm = this.fb.group({
      company: ['', Validators.required],
      phone: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.savedFormData = this.formDataService.getFormData();
  }
  hasError(controlName: keyof typeof this.contactInfoForm.controls) {
    const control = this.contactInfoForm.controls[controlName];
    return control.invalid && control.touched;
  }

  onSubmit() {
    this.contactInfoForm.markAllAsTouched();
    if (this.contactInfoForm.valid) {
      this.formDataService.setFormData(this.contactInfoForm.value);
      this.router.navigate(['/schedule-call/it-professionals']);
    } else {
      this.toastr.error('Please provide all details');
    }
  }
}
