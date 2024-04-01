import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  input,
} from '@angular/core';
import { TestimonialService } from '../../services/testimonial.service';
import { environment } from '../../environments/environment';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-testimonial-card',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './testimonial-card.component.html',
  styleUrl: './testimonial-card.component.scss',
})
export class TestimonialCardComponent implements OnInit {
  @Input() testimonials: any = [];
  @Input() currentIndex!: number;
  @Output() nextClick: EventEmitter<void> = new EventEmitter<void>();
  @Output() prevClick: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}
  onNextClick(): void {
    console.log('next');

    this.nextClick.emit();
  }

  onPrevClick(): void {
    console.log('prev');

    this.prevClick.emit();
  }
}
