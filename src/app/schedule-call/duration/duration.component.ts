import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-duration',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './duration.component.html',
  styleUrl: './duration.component.scss'
})
export class DurationComponent {

}
