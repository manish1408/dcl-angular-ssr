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
  selector: 'app-budget',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './budget.component.html',
  styleUrl: './budget.component.scss',
})
export class BudgetComponent implements OnInit {
  savedFormData: any;
  budgetForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private formDataService: FormDataService,
    private toastr: ToastrService
  ) {
    this.budgetForm = this.fb.group({
      budget: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.savedFormData = this.formDataService.getFormData();
  }
  hasError(controlName: keyof typeof this.budgetForm.controls) {
    const control = this.budgetForm.controls[controlName];
    return control.invalid && control.touched;
  }

  onSubmit() {
    this.budgetForm.markAllAsTouched();
    if (this.budgetForm.valid) {
      this.formDataService.setFormData(this.budgetForm.value);
      this.router.navigate(['/schedule-call/start-date']);
    } else {
      this.toastr.error('Please select budget');
    }
  }
}
