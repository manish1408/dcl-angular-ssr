import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-it-professionals',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './it-professionals.component.html',
  styleUrl: './it-professionals.component.scss'
})
export class ItProfessionalsComponent {

}
