import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormDataService } from '../../services/form-data.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-it-professionals',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './it-professionals.component.html',
  styleUrl: './it-professionals.component.scss',
})
export class ItProfessionalsComponent implements OnInit {
  savedFormData: any;
  itForm!: FormGroup;
  id!: string;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private formDataService: FormDataService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {
    this.itForm = this.fb.group({
      noOfPersonsNeeded: ['', Validators.required],
      id: [],
    });
  }
  ngOnInit(): void {
    this.savedFormData = this.formDataService.getFormData();
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      console.log(this.id);
    });

    // get api
    this.formDataService.getScheduleCallById(this.id).subscribe((res) => {
      console.log('get data in CI:', res);
      this.itForm.patchValue({
        noOfPersonsNeeded: res.data.noOfPersonsNeeded,
        id: res.data._id,
      });
    });
  }
  hasError(controlName: keyof typeof this.itForm.controls) {
    const control = this.itForm.controls[controlName];
    return control.invalid && control.touched;
  }

  onSubmit() {
    this.itForm.markAllAsTouched();
    if (this.itForm.valid) {
      this.formDataService.setFormData(this.itForm.value);

      this.formDataService
        .updateScheduleCall(this.itForm.value)
        .subscribe((res) => {
          console.log(res);
          if (res.result === 1) {
            this.id = res.data._id;
            this.router.navigate(['/schedule-call/duration', this.id]);
          }
        }),
        (error: any) => {
          console.error('Error occurred:', error);
          this.toastr.error('Something went wrong. Please try again.');
        };
    } else {
      this.toastr.error('Please select requirement');
    }
  }
  back() {
    this.router.navigate(['/schedule-call/contact-information', this.id]);
  }
}
