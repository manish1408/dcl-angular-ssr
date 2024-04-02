import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-case-study-slider',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './case-study-slider.component.html',
  styleUrl: './case-study-slider.component.scss',
})
export class CaseStudySliderComponent {
  @Input() currentCaseStudy: any;
  @Input() currentIndexCaseStudy!: number;

  constructor() {}

}
