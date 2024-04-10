import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { switchMap } from 'rxjs';
import { environment } from '../environments/environment';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root',
})
export class OurServicesService {
  constructor(private http: HttpClient, private common: CommonService) {}
  private servicesApiURL = environment.squidexApiUrl + 'page-services';

  getServices() {
    return this.common.generateAccessToken().pipe(
      switchMap((token) => {
        var headers = new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
          .set('Authorization', 'Bearer ' + token);
        return this.http.get(this.servicesApiURL, {
          headers,
        });
      })
    );
  }
}
