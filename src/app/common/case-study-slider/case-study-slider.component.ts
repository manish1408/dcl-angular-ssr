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
  @Input() currentIndexCaseStudy!: number;
  @Output() nextClick: EventEmitter<void> = new EventEmitter<void>();
  @Output() prevClick: EventEmitter<void> = new EventEmitter<void>();

  constructor(private elementRef: ElementRef) {}
  currentIndex: number = 0;

  swiperNext(): void {
    // this.nextClick.emit();
    if (this.currentIndex < this.currentCaseStudy.length - 1) {
      this.currentIndex++;
      console.log(this.currentCaseStudy[this.currentIndex]);
    }
  }

  swiperPrev(): void {
    // this.prevClick.emit();
    if (this.currentIndex > 0) {
      this.currentIndex--;
      console.log(this.currentCaseStudy[this.currentIndex]);
    }
  }

  ngAfterViewInit() {
    window.setTimeout(() => {
      var swiper = new Swiper(
        this.elementRef.nativeElement.querySelector('.case-study-slider'),
        {
          slidesPerView: 1,
          speed: 1500,
          spaceBetween: 30,
          loop: true,
          navigation: {
            nextEl: '.case-study-slider-next',
            prevEl: '.case-study-slider-prev',
          },
          breakpoints: {
            280: { slidesPerView: 1 },
            386: { slidesPerView: 1 },
            576: { slidesPerView: 1, spaceBetween: 15 },
            768: { slidesPerView: 2, spaceBetween: 15 },
            992: { slidesPerView: 1, spaceBetween: 20 },
            1200: { slidesPerView: 2, spaceBetween: 15 },
            1400: { slidesPerView: 2 },
          },
        }
      );
    }, 500);
  }
}
