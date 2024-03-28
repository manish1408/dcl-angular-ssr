import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { FormDataService } from '../../services/form-data.service';

@Component({
  selector: 'app-start-date',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './start-date.component.html',
  styleUrl: './start-date.component.scss',
})
export class StartDateComponent implements OnInit {
  showMonths: boolean = false;
  savedFormData: any;
  startDateForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private formDataService: FormDataService
  ) {
    this.startDateForm = this.fb.group({
      startDate: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.savedFormData = this.formDataService.getFormData();
    console.log('retrieve form:', this.savedFormData);
  }

  onSubmit() {
    this.startDateForm.markAllAsTouched();
    if (this.startDateForm.valid) {
      console.log(this.startDateForm.value);
      this.formDataService.setFormData(this.startDateForm.value);
      this.router.navigate(['/schedule-call/technologies']);
    }
  }

  specifyDate() {
    this.showMonths = !this.showMonths;
  }
}
