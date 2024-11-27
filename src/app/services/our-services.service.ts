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
  private servicesApiURL = environment.squidexApiUrl + 'services';

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
  getServiceBySlug(slug: string) {
    return this.common.generateAccessToken().pipe(
      switchMap((token) => {
        var headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
        return this.http.get(
          this.servicesApiURL + "?$filter=data/slug/iv eq '" + slug + "'",
          {
            headers,
          }
        );
      })
    );
  }
}
