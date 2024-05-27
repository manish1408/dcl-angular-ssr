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
  id!: string;
  isLoading: boolean = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private formDataService: FormDataService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {
    this.basicDetailsForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      serviceMessage: ['', [Validators.required]],
      challenges: [''],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
    // get api
    if (this.id) {
      this.isLoading = true;
      this.formDataService.getScheduleCallById(this.id).subscribe((res) => {
        this.isLoading = false;
        this.basicDetailsForm.patchValue({
          name: res.data.name,
          email: res.data.email,
          serviceMessage: res.data.serviceMessage,
          challenges: res.data.challenges,
        });
      });
    }
  }
  hasError(controlName: keyof typeof this.basicDetailsForm.controls) {
    const control = this.basicDetailsForm.controls[controlName];
    return control.invalid && control.touched;
  }
  hasEmailFormatError() {
    return (
      this.basicDetailsForm.controls['email'].hasError('email') &&
      this.basicDetailsForm.controls['email'].touched
    );
  }

  onSubmit() {
    this.basicDetailsForm.markAllAsTouched();
    if (this.basicDetailsForm.valid) {
      this.formDataService
        .saveScheduleCall(this.basicDetailsForm.value)
        .subscribe((res) => {
          if (res.result === 1) {
            this.id = res.data._id;
            this.router.navigateByUrl('/thank-you');
          }
        }),
        (error: any) => {
          console.error('Error occurred:', error);
          this.toastr.error('Something went wrong. Please try again.');
        };

      this.formDataService.setFormData(this.basicDetailsForm.value);
    } else if (this.basicDetailsForm.invalid) {
      if (this.basicDetailsForm.controls['email'].errors?.['email']) {
        this.toastr.error('Invalid email format');
      } else {
        this.toastr.error('Please provide all the details');
      }
    }
  }
}
