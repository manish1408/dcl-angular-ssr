import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import {
  IDropdownSettings,
  NgMultiSelectDropDownModule,
} from 'ng-multiselect-dropdown';
import { FormDataService } from '../../services/form-data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-technologies',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    NgMultiSelectDropDownModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './technologies.component.html',
  styleUrl: './technologies.component.scss',
})
export class TechnologiesComponent implements OnInit {
  dropdownList: any = [];
  selectedItems: any = [];
  dropdownSettings: any = {};
  technologiesForm!: FormGroup;
  technologyArray: any = [];

  savedFormData: any;
  itForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private formDataService: FormDataService,
    private toastr: ToastrService
  ) {
    this.technologiesForm = this.fb.group({
      technologyNeeded: ['', Validators.required],
    });
  }
  ngOnInit() {
    this.savedFormData = this.formDataService.getFormData();

    this.dropdownList = [
      { id: 1, value: '.NET' },
      { id: 2, value: '.NET Core' },
      { id: 3, value: 'ABAP' },
      { id: 4, value: 'ActionScript' },
      { id: 5, value: 'Active Directory' },
      { id: 6, value: 'Amazon EC2' },
      { id: 7, value: 'Amazon ECS' },
      { id: 8, value: 'Angular 2' },
      { id: 9, value: 'Angular JS' },
      { id: 10, value: 'Ansible' },
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'value',
      selectAllText: '',
      unSelectAllText: '',
      itemsShowLimit: 4,
      allowSearchFilter: true,
      enableCheckAll: false,
    };
  }
  hasError(controlName: keyof typeof this.technologiesForm.controls) {
    const control = this.technologiesForm.controls[controlName];
    return control.invalid && control.touched;
  }

  onSubmit() {
    this.technologiesForm.markAllAsTouched();
    if (this.technologiesForm.valid) {
      this.technologyArray = this.technologiesForm.value.technologyNeeded;
      const convertedValues = {
        technologyNeeded: this.technologyArray.map((item: any) => item.value),
      };

      this.formDataService.setFormData(convertedValues);

      const formData = (this.savedFormData =
        this.formDataService.getFormData());
      // console.log('Final form to send:', this.savedFormData);

      this.formDataService
        .saveScheduleCall(this.savedFormData)
        .subscribe((res) => {
          console.log(res);
        });

      this.router.navigate(['/thank-you']);
    } else {
      this.toastr.error('Please select technologies required');
    }
  }
}
