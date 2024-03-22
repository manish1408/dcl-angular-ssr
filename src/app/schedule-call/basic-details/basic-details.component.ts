import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-basic-details',
  standalone: true,
  imports: [],
  templateUrl: './basic-details.component.html',
  styleUrl: './basic-details.component.scss'
})
export class BasicDetailsComponent {

  constructor(private route: ActivatedRoute){}

  contactDetails(){

  }

}
