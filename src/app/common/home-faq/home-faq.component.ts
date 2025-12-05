import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-home-faq',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-faq.component.html',
  styleUrl: './home-faq.component.scss',
})
export class HomeFaqComponent {
  @Input() faqs: any = [];

  toggleFaq(index: number) {
    if (this.faqs && this.faqs[index]) {
      this.faqs[index].isOpen = !this.faqs[index].isOpen;
    }
  }
}

