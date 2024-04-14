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
  id!: string;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private formDataService: FormDataService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {
    this.startDateForm = this.fb.group({
      startDate: ['', Validators.required],
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
      this.startDateForm.patchValue({
        startDate: res.data.startDate,
        id: res.data._id,
      });
    });
  }
  hasError(controlName: keyof typeof this.startDateForm.controls) {
    const control = this.startDateForm.controls[controlName];
    return control.invalid && control.touched;
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
