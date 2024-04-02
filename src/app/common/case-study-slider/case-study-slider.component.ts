import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { RouterModule } from '@angular/router';
declare var Swiper: any;

@Component({
  selector: 'app-case-study-slider',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './case-study-slider.component.html',
  styleUrl: './case-study-slider.component.scss',
})
export class CaseStudySliderComponent {
  @Input() currentCaseStudy: any;

  constructor() {}
}
