import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
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
  id!: string;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private formDataService: FormDataService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {
    this.budgetForm = this.fb.group({
      budget: ['', Validators.required],
      id: [],
    });
  }
  ngOnInit(): void {
    this.savedFormData = this.formDataService.getFormData();
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });

    // get api
    this.formDataService.getScheduleCallById(this.id).subscribe((res) => {
      this.budgetForm.patchValue({
        budget: res.data.budget,
        id: res.data._id,
      });
    });
  }
  hasError(controlName: keyof typeof this.budgetForm.controls) {
    const control = this.budgetForm.controls[controlName];
    return control.invalid && control.touched;
  }

  onSubmit() {
    this.budgetForm.markAllAsTouched();
    if (this.budgetForm.valid) {
      this.formDataService.setFormData(this.budgetForm.value);

      this.formDataService
        .updateScheduleCall(this.budgetForm.value)
        .subscribe((res) => {
          if (res.result === 1) {
            this.id = res.data._id;
            this.router.navigate(['/schedule-call/start-date', this.id]);
          }
        }),
        (error: any) => {
          console.error('Error occurred:', error);
          this.toastr.error('Something went wrong. Please try again.');
        };
    } else {
      this.toastr.error('Please select budget');
    }
  }
  back() {
    this.router.navigate(['/schedule-call/duration', this.id]);
  }
}
