import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ScheduleCallService {
  constructor(private http: HttpClient) {}

  getAllLeads(): Observable<any> {
    return this.http.get<any>(
      'https://api.distinctcloud.io/api/v1/save/getAllScheduleCall'
    );
  }
}
