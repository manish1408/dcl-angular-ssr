import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root',
})
export class CareersService {
  constructor(private common: CommonService, private http: HttpClient) {}

  private careersApiUrl = environment.squidexApiUrl + 'careers';

  fetchJobs() {
    var headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );
    return this.http.get(this.careersApiUrl, {
      headers,
    });
  }

  getJobBySlug(slug: string) {
    var headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );
    return this.http.get(
      this.careersApiUrl + "?$filter=data/slug/iv eq '" + slug + "'",
      {
        headers,
      }
    );
  }
}
