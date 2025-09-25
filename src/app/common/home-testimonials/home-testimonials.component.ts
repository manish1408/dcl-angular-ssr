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

  // Method to get initials for avatar placeholder
  getInitials(name: string): string {
    if (!name) return '?';
    
    const names = name.trim().split(' ');
    if (names.length === 1) {
      return names[0].charAt(0).toUpperCase();
    }
    
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
  }
}
