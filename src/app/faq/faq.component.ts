import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { FaqService } from '../services/faq.service';


@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss'
})
export class FaqComponent {
  faqs: any;

  constructor(private faqService: FaqService) {}

  ngOnInit(): void {
    this.getFAQ();
  }

  getFAQ(): void {
    
    this.faqService.getFAQ()
      .subscribe((response: any) => {
        // console.log('resp', response)
        this.faqs = response?.items ;
       
      });
  }

    
    
      toggleFaq(index: number) {
        this.faqs[index].isOpen = !this.faqs[index].isOpen;
      }
    }