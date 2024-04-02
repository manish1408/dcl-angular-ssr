import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-case-study-slider',
  standalone: true,
  imports: [],
  templateUrl: './case-study-slider.component.html',
  styleUrl: './case-study-slider.component.scss',
})
export class CaseStudySliderComponent {
  @Input() currentCaseStudy: any;
  @Input() currentIndex!: number;
  @Output() nextClick: EventEmitter<void> = new EventEmitter<void>();
  @Output() prevClick: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  onNextClick(): void {
    this.nextClick.emit();
  }

  onPrevClick(): void {
    this.prevClick.emit();
  }
}
