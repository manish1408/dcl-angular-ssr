import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-engagement-models',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './engagement-models.component.html',
  styleUrl: './engagement-models.component.scss',
})
export class EngagementModelsComponent {
  constructor() {}
  @Input() services: any = [];
}
