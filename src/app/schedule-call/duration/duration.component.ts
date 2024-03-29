import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
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
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private formDataService: FormDataService,
    private toastr: ToastrService
  ) {
    this.durationForm = this.fb.group({
      projectDuration: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.savedFormData = this.formDataService.getFormData();
  }

  onSubmit() {
    this.durationForm.markAllAsTouched();
    if (this.durationForm.valid) {
      this.formDataService.setFormData(this.durationForm.value);
      this.router.navigate(['/schedule-call/budget']);
    } else {
      this.toastr.error('Please select duration');
    }
  }
}
