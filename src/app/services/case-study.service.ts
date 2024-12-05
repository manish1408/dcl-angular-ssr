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
    var headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );
    return this.http.get(this.caseStudyApiUrl, {
      headers,
    });
  }

  fetchPortfolio() {
    var headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );
    return this.http.get(this.portfolioApiUrl, {
      headers,
    });
  }

  getCaseStudyBySlug(slug: string) {
    var headers = new HttpHeaders();
    return this.http.get(
      this.caseStudyApiUrl + "?$filter=data/slug/iv eq '" + slug + "'",
      {
        headers,
      }
    );
  }

  getPortfolioBySlug(slug: string) {
    var headers = new HttpHeaders();
    return this.http.get(
      this.portfolioApiUrl + "?$filter=data/slug/iv eq '" + slug + "'",
      {
        headers,
      }
    );
  }
}
