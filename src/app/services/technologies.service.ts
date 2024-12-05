import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { switchMap } from 'rxjs';
import { environment } from '../environments/environment';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root',
})
export class TechnologiesService {
  constructor(private http: HttpClient, private common: CommonService) {}
  private servicesApiURL = environment.squidexApiUrl + 'technologies';

  getTechnologies() {
    var headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );
    return this.http.get(this.servicesApiURL, {
      headers,
    });
  }
}
