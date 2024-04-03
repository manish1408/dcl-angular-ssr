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
  selector: 'app-contact-information',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './contact-information.component.html',
  styleUrl: './contact-information.component.scss',
})
export class ContactInformationComponent implements OnInit {
  savedFormData: any;
  contactInfoForm!: FormGroup;
  id!: string;
  hideBack: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,

    private formDataService: FormDataService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {
    this.contactInfoForm = this.fb.group({
      company: ['', Validators.required],
      phone: ['', Validators.required],
      id: [],
    });

    this.route.queryParams.subscribe((params) => {
      console.log(params);
      if (params['services']) {
        this.hideBack = true;
      } else {
        this.hideBack = false;
      }
    });
  }

  ngOnInit(): void {
    this.savedFormData = this.formDataService.getFormData();
    this.route.params.subscribe((params) => {
      console.log(params);
      this.id = params['id'];
      console.log(this.id);
    });

    // get api
    this.formDataService.getScheduleCallById(this.id).subscribe((res) => {
      this.contactInfoForm.patchValue({
        company: res.data.company,
        phone: res.data.phone,
        id: res.data._id,
      });
    });
  }
  hasError(controlName: keyof typeof this.contactInfoForm.controls) {
    const control = this.contactInfoForm.controls[controlName];
    return control.invalid && control.touched;
  }

  onSubmit() {
    this.contactInfoForm.markAllAsTouched();
    console.log(this.contactInfoForm.value);

    if (this.contactInfoForm.valid) {
      this.formDataService.setFormData(this.contactInfoForm.value);

      this.formDataService
        .updateScheduleCall(this.contactInfoForm.value)
        .subscribe((res) => {
          console.log(res);
          if (res.result === 1) {
            this.id = res.data._id;
            this.router.navigate(['/schedule-call/it-professionals', this.id]);
          }
        }),
        (error: any) => {
          console.error('Error occurred:', error);
          this.toastr.error('Something went wrong. Please try again.');
        };
    } else {
      this.toastr.error('Please provide all details');
    }
  }
  back() {
    this.router.navigate(['/schedule-call/basic-details', this.id]);
  }
}
