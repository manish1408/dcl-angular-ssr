import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormDataService } from '../../services/form-data.service';

@Component({
  selector: 'app-it-professionals',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './it-professionals.component.html',
  styleUrl: './it-professionals.component.scss',
})
export class ItProfessionalsComponent {
  savedFormData: any;
  constructor(private formDataService: FormDataService) {
    this.savedFormData = this.formDataService.getFormData();
    console.log('retrieve form:', this.savedFormData);
  }
}
