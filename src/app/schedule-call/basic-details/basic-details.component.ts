import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {  NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-basic-details',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './basic-details.component.html',
  styleUrl: './basic-details.component.scss'
})
export class BasicDetailsComponent {

  constructor(){
  
  }

  

}
