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
    private formDataService: FormDataService
  ) {
    this.budgetForm = this.fb.group({
      budget: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.savedFormData = this.formDataService.getFormData();
    console.log('retrieve form:', this.savedFormData);
  }

  onSubmit() {
    this.budgetForm.markAllAsTouched();
    if (this.budgetForm.valid) {
      console.log(this.budgetForm.value);
      this.formDataService.setFormData(this.budgetForm.value);
      this.router.navigate(['/schedule-call/start-date']);
    }
  }
}
