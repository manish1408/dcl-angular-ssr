import { Component, Input } from '@angular/core';
import { SummaryPipe } from '../../../app/_pipes/summary.pipe';
import { NgOptimizedImage } from '@angular/common'
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { environment } from '../../../app/environments/environment';

@Component({
  selector: 'app-template-card',
  standalone: true,
  imports: [SummaryPipe, CommonModule,RouterModule, NgOptimizedImage],
  templateUrl: './template-card.component.html',
  styleUrl: './template-card.component.scss'
})
export class TemplateCardComponent {
@Input() case: any
  cdn = `${environment.squidexAssetsMilo}/`;

includesChannel(channelIv: string, keyword: string): boolean {
  return channelIv.toLowerCase().includes(keyword.toLowerCase());
}
}
