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
    private formDataService: FormDataService
  ) {
    this.contactInfoForm = this.fb.group({
      company: ['', Validators.required],
      phone: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.savedFormData = this.formDataService.getFormData();
    console.log('retrieve form:', this.savedFormData);
  }

  onSubmit() {
    this.contactInfoForm.markAllAsTouched();
    if (this.contactInfoForm.valid) {
      console.log(this.contactInfoForm.value);
      this.formDataService.setFormData(this.contactInfoForm.value);
      this.router.navigate(['/schedule-call/it-professionals']);
    }
  }
}
