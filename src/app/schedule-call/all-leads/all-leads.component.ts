import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ScheduleCallService } from '../../services/schedule-call.service';
import { log } from 'node:console';

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
  openDetailsModal: boolean = false;
  ngOnInit(): void {
    this.scheduleCallService.getAllLeads().subscribe((res: any) => {
      if (res.msg === 'SUCCESS') {
        this.allLeads = res?.data;
      }
      // console.log('all leads:', this.allLeads);
    });
  }
  openModal() {
    this.openDetailsModal = true;
    console.log(this.openDetailsModal);
  }

  // Assuming leadsData contains the JSON data provided

  // Convert JSON data to CSV format
  convertToCSV(data: any[]) {
    const header = Object.keys(data[0]).join(',') + '\n';
    const rows = data.map((entry) => Object.values(entry).join(',') + '\n');
    return header + rows.join('');
  }

  downloadCSV(allLeads: any) {
    const csvData = this.convertToCSV(allLeads);

    const blob = new Blob([csvData], { type: 'text/csv' });

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', 'leads.csv');
    a.click();
    window.URL.revokeObjectURL(url);
  }
}
