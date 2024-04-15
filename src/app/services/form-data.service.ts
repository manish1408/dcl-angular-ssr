import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormDataService {
  private formData: any = {};
  constructor(private http: HttpClient) {}
  setFormData(data: any) {
    this.formData = { ...this.formData, ...data };
  }

  getFormData() {
    return this.formData;
  }

  saveScheduleCall(data: any): Observable<any> {
    return this.http.post(
      'https://api.distinctcloud.io/api/v1/save/scheduleCall',
      data
    );
  }
  updateScheduleCall(data: any): Observable<any> {
    return this.http.put(
      'https://api.distinctcloud.io/api/v1/save/scheduleCall',
      data
    );
  }
  getScheduleCallById(id: any): Observable<any> {
    return this.http.get(
      `https://api.distinctcloud.io/api/v1/save/scheduleCall/${id}`
    );
  }
}
