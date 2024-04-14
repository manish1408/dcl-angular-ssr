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
  selector: 'app-duration',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './duration.component.html',
  styleUrl: './duration.component.scss',
})
export class DurationComponent implements OnInit {
  savedFormData: any;
  durationForm!: FormGroup;
  id!: string;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private formDataService: FormDataService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {
    this.durationForm = this.fb.group({
      projectDuration: ['', Validators.required],
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
      this.durationForm.patchValue({
        projectDuration: res.data.projectDuration,
        id: res.data._id,
      });
    });
  }
  hasError(controlName: keyof typeof this.durationForm.controls) {
    const control = this.durationForm.controls[controlName];
    return control.invalid && control.touched;
  }

  onSubmit() {
    this.durationForm.markAllAsTouched();
    if (this.durationForm.valid) {
      this.formDataService.setFormData(this.durationForm.value);

      this.formDataService
        .updateScheduleCall(this.durationForm.value)
        .subscribe((res) => {
          if (res.result === 1) {
            this.id = res.data._id;
            this.router.navigate(['/schedule-call/budget', this.id]);
          }
        }),
        (error: any) => {
          console.error('Error occurred:', error);
          this.toastr.error('Something went wrong. Please try again.');
        };
    } else {
      this.toastr.error('Please select duration');
    }
  }
  back() {
    this.router.navigate(['/schedule-call/it-professionals', this.id]);
  }
}
