import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-schedule-call-cta',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './schedule-call-cta.component.html',
  styleUrl: './schedule-call-cta.component.scss',
})
export class ScheduleCallCTAComponent {
  @Input() services: any = [];

  constructor() {}
}
