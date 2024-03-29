import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-thank-you',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './thank-you.component.html',
  styleUrl: './thank-you.component.scss',
})
export class ThankYouComponent implements OnInit {
  constructor(private router: Router) {}
  countdown: number = 10;
  countdownText: string = `${this.countdown} seconds`;
  ngOnInit(): void {
    this.startCountdown();
  }

  startCountdown(): void {
    const countdownInterval = setInterval(() => {
      this.countdown--;
      this.countdownText = `${this.countdown} second${
        this.countdown !== 1 ? 's' : ''
      }`;

      if (this.countdown <= 0) {
        clearInterval(countdownInterval);
        this.router.navigate(['/blog']);
      }
    }, 1000);
  }
}
