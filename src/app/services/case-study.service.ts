import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { CommonService } from './common.service';
import { switchMap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CaseStudyService {
  constructor(private common: CommonService, private http: HttpClient) {}
  private caseStudyApiUrl = environment.squidexApiUrl + 'case-studies';
  private portfolioApiUrl = environment.squidexApiUrl + 'portfolio';

  fetchPosts() {
    return this.common.generateAccessToken().pipe(
      switchMap((token) => {
        var headers = new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
          .set('Authorization', 'Bearer ' + token);
        return this.http.get(this.caseStudyApiUrl, {
          headers,
        });
      })
    );
  }

  fetchPortfolio() {
    return this.common.generateAccessToken().pipe(
      switchMap((token) => {
        var headers = new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
          .set('Authorization', 'Bearer ' + token);
        return this.http.get(this.portfolioApiUrl, {
          headers,
        });
      })
    );
  }

  getCaseStudyBySlug(slug: string) {
    return this.common.generateAccessToken().pipe(
      switchMap((token) => {
        var headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
        return this.http.get(
          this.caseStudyApiUrl + "?$filter=data/slug/iv eq '" + slug + "'",
          {
            headers,
          }
        );
      })
    );
  }

  getPortfolioBySlug(slug: string) {
    return this.common.generateAccessToken().pipe(
      switchMap((token) => {
        var headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
        return this.http.get(
          this.portfolioApiUrl + "?$filter=data/slug/iv eq '" + slug + "'",
          {
            headers,
          }
        );
      })
    );
  }
}
