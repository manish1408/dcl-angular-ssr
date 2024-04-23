import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { log } from 'node:console';
declare var Swiper: any;

@Component({
  selector: 'app-testimonial-card',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './testimonial-card.component.html',
  styleUrl: './testimonial-card.component.scss',
})
export class TestimonialCardComponent implements OnInit {
  @Input() testimonials: any = [];

  @Input() services: any = [];

  constructor() {}

  ngOnInit(): void {}
}
