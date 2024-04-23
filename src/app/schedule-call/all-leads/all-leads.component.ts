import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ScheduleCallService } from '../../services/schedule-call.service';

@Component({
  selector: 'app-all-leads',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './all-leads.component.html',
  styleUrl: './all-leads.component.scss',
})
export class AllLeadsComponent implements OnInit {
  constructor(private scheduleCallService: ScheduleCallService) {}
  allLeads: any = [];
  ngOnInit(): void {
    this.scheduleCallService.getAllLeads().subscribe((res: any) => {
      if (res.msg === 'SUCCESS') {
        this.allLeads = res?.data;
      }
      // console.log('all leads:', this.allLeads);
    });
  }
}
