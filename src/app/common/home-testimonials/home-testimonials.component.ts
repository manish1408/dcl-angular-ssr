import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home-testimonials',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './home-testimonials.component.html',
  styleUrl: './home-testimonials.component.scss',
})
export class HomeTestimonialsComponent {
  constructor() {}

  @Input() testimonials: any = [];
}
