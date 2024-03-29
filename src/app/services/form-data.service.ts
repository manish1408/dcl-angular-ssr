import { HttpClient, HttpClientModule } from '@angular/common/http';
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
      'http://api.distinctcloud.io/api/v1/save/scheduleCall',
      data
    );
  }
}
