import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
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
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private formDataService: FormDataService,
    private toastr: ToastrService
  ) {
    this.itForm = this.fb.group({
      noOfPersonsNeeded: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.savedFormData = this.formDataService.getFormData();
  }

  onSubmit() {
    this.itForm.markAllAsTouched();
    if (this.itForm.valid) {
      this.formDataService.setFormData(this.itForm.value);
      this.router.navigate(['/schedule-call/duration']);
    } else {
      this.toastr.error('Please select requirement');
    }
  }
}
