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
  searchForm!: FormGroup;
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
    this.filteredCountries = this.PHONE_BOOK;

    this.contactInfoForm = this.fb.group({
      company: ['', Validators.required],
      phoneCode: ['', Validators.required],
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
  }

  onSearchInput(event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value;
    this.filterCountries(searchTerm);
  }

  filterCountries(searchTerm: string) {
    this.filteredCountries = this.PHONE_BOOK.filter(
      (country) =>
        country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        country.phone.some((code: any) => code.includes(searchTerm))
    );
  }
  phoneCode: string = '';
  selectCountry(value: any) {
    // console.log('selected country:', value);
    this.phoneCode = value.phone[0];
    const phoneCodeControl = this.contactInfoForm.get('phoneCode');
    if (phoneCodeControl) {
      phoneCodeControl.setValue(this.phoneCode);
    }

    const dropdownButton = document.getElementById('dropdownMenuButton');
    if (dropdownButton) {
      dropdownButton.innerHTML = `
        <img src="${value.image}" alt="${value.name} flag" style="width: 20px; margin-right: 5px;">
        (${this.phoneCode}) 
      `;
    }
  }

  onSubmit() {
    this.contactInfoForm.markAllAsTouched();
    const dataToSend = {
      company: this.contactInfoForm.value.company,
      phone:
        this.contactInfoForm.value.phoneCode + this.contactInfoForm.value.phone,
    };
    // console.log('Final data:', dataToSend);

    if (this.contactInfoForm.valid) {
      this.formDataService.setFormData(dataToSend);

      this.formDataService.updateScheduleCall(dataToSend).subscribe((res) => {
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
