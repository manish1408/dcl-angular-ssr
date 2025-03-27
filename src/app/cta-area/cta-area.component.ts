import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-cta-area',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './cta-area.component.html',
  styleUrl: './cta-area.component.scss'
})
export class CtaAreaComponent {
  constructor() {
    
  }
}
