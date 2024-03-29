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
import { ToastrService } from 'ngx-toastr';

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
    private formDataService: FormDataService,
    private toastr: ToastrService
  ) {
    this.startDateForm = this.fb.group({
      startDate: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.savedFormData = this.formDataService.getFormData();
  }

  onSubmit() {
    this.startDateForm.markAllAsTouched();
    if (this.startDateForm.valid) {
      this.formDataService.setFormData(this.startDateForm.value);
      this.router.navigate(['/schedule-call/technologies']);
    } else {
      this.toastr.error('Please select start date');
    }
  }

  specifyDate() {
    this.showMonths = !this.showMonths;
  }
}
