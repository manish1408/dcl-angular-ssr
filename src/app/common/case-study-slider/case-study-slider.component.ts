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
  @Output() nextClick: EventEmitter<void> = new EventEmitter<void>();
  @Output() prevClick: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  swiperNext(): void {
    this.nextClick.emit();
  }

  swiperPrev(): void {
    this.prevClick.emit();
  }
}
