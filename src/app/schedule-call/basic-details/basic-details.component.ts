import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormDataService } from '../../services/form-data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-basic-details',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './basic-details.component.html',
  styleUrl: './basic-details.component.scss',
})
export class BasicDetailsComponent implements OnInit {
  basicDetailsForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private formDataService: FormDataService,
    private toastr: ToastrService
  ) {
    this.basicDetailsForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      serviceRequested: ['', Validators.required],
      serviceMessage: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    console.log(this.basicDetailsForm);
    this.basicDetailsForm.markAllAsTouched();
    if (this.basicDetailsForm.valid) {
      this.formDataService.setFormData(this.basicDetailsForm.value);
      this.router.navigate(['/schedule-call/contact-information']);
    } else if (this.basicDetailsForm.invalid) {
      if (this.basicDetailsForm.controls['email'].errors?.['email']) {
        this.toastr.error('Invalid email format');
      } else {
        this.toastr.error('Please provide all the details');
      }
    }
  }
}
