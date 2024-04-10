import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonService } from './common.service';
import { switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TestimonialService {
  constructor(private http: HttpClient, private common: CommonService) {}
  private testimonialApiUrl = environment.squidexApiUrl + 'testimonials';

  fetchTestimonials() {
    return this.common.generateAccessToken().pipe(
      switchMap((token) => {
        var headers = new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
          .set('Authorization', 'Bearer ' + token);
        return this.http.get(this.testimonialApiUrl, {
          headers,
        });
      })
    );
  }
}
