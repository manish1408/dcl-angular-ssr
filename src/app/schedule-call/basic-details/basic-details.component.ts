import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
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

  

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private formDataService: FormDataService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
  }
}
