import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  api_url = 'api.distinctcloud.io/api/v1/general/email/contact';
  constructor(private http: HttpClient) {}

  postContact(data: any): Observable<any> {
    return this.http.post(
      'http://api.distinctcloud.io/api/v1/general/email/contact',
      data
    );
  }
}
