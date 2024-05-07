import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import {
  IDropdownSettings,
  NgMultiSelectDropDownModule,
} from 'ng-multiselect-dropdown';
import { FormDataService } from '../../services/form-data.service';
import { ToastrService } from 'ngx-toastr';
import { log } from 'node:console';

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
  // encapsulation: ViewEncapsulation.None,
})
export class TechnologiesComponent implements OnInit {
  dropdownList: any = [];
  selectedItems: any = [];
  dropdownSettings: any = {};
  technologiesForm!: FormGroup;
  technologyArray: any = [];

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
    this.technologiesForm = this.fb.group({
      technologyNeeded: ['', Validators.required],
    });
  }
  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });

    this.dropdownList = [
      { id: 1, value: 'ReactJs' },
      { id: 2, value: 'React Native' },
      { id: 3, value: 'JavaScript' },
      { id: 4, value: 'TypeScript' },
      { id: 5, value: 'Angular' },
      { id: 6, value: 'HTML/CSS' },
      { id: 7, value: 'ASP.NET Core' },
      { id: 8, value: '.NET' },
      { id: 9, value: 'NodeJs' },
      { id: 10, value: 'Microservices' },
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

      console.log('formData:', formData);

      this.formDataService
        .saveScheduleCall(this.savedFormData)
        .subscribe((res) => {
          console.log(res);
        });

      this.router.navigate(['/thank-you']);
      sessionStorage.clear();
    } else {
      this.toastr.error('Please select technologies required');
    }
  }
  back() {
    this.router.navigate(['/schedule-call/start-date', this.id]);
  }
}
