import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-start-date',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './start-date.component.html',
  styleUrl: './start-date.component.scss'
})
export class StartDateComponent {
  showMonths: boolean = false

  specifyDate(){
    this.showMonths = !this.showMonths
  }
}
