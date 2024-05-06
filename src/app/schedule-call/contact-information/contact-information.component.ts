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
import { PHONE_BOOK } from '../../common/consts/phone-code';

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
  PHONE_BOOK = PHONE_BOOK;
  filteredCountries: any[] = [];
  constructor(
    private fb: FormBuilder,
    private router: Router,

    private formDataService: FormDataService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {
    this.contactInfoForm = this.fb.group({
      company: ['', Validators.required],
      countryCode: [''],
      phone: [
        '',
        [
          Validators.required,
          Validators.maxLength(11),
          Validators.pattern(/^\d+$/),
        ],
      ],
      id: [],
    });

    this.route.queryParams.subscribe((params) => {
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
      this.id = params['id'];
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
  hasPhoneNumberError() {
    const phoneControl = this.contactInfoForm.get('phone');
    return (
      (phoneControl?.hasError('pattern') ||
        phoneControl?.hasError('maxLength')) &&
      phoneControl?.touched
    );

    // const control = this.contactInfoForm.get('phone');
    // if (!control) return false;

    // const phoneNumber = control.value || '';

    // const hasMaxLengthError = phoneNumber.length > 11;
    // const hasPatternError = !/^\d+$/.test(phoneNumber);

    // return (hasMaxLengthError || hasPatternError) && control.touched;
  }

  filterCountries(searchTerm: string) {
    this.filteredCountries = this.PHONE_BOOK.filter((country) =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  selectCountry(value: any) {
    console.log('selected country:', value);
    const phoneCode = value.phone[0];

    // this.contactInfoForm.patchValue({
    //   phone: phoneCode,
    // });

    const dropdownButton = document.getElementById('dropdownMenuButton');
    if (dropdownButton) {
      dropdownButton.innerHTML = `
        <img src="${value.image}" alt="${value.name} flag" style="width: 20px; margin-right: 5px;">
        (${phoneCode}) 
      `;
    }
  }

  onSubmit() {
    this.contactInfoForm.markAllAsTouched();
    console.log(this.contactInfoForm.value);
    return;

    if (this.contactInfoForm.valid) {
      this.formDataService.setFormData(this.contactInfoForm.value);

      this.formDataService
        .updateScheduleCall(this.contactInfoForm.value)
        .subscribe((res) => {
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
