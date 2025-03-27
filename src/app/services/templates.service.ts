import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { switchMap } from 'rxjs';
import { CommonService } from './common.service';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root',
})
export class TemplateService {
  constructor(private http: HttpClient) {}

  private _url = environment.squidexApiUrlMilo + 'templates';

  

  getAiUsecases() {
    var headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );
    return this.http.get(this._url, {
      headers,
    });
  }
  getUseCaseBySlug(slug: string) {
    var headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );
    return this.http.get(
      this._url + "?$filter=data/SEOSlug/iv eq '" + slug + "'",
      {
        headers,
      }
    );
  }
  getUseCaseeByTitle(filterString: any) {
    var headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );
  return this.http.get(`${this._url}${filterString}`, { headers });

  }
  getPopularUseCasees() {
    var headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );
    return this.http.get(
      this._url + "?$filter=data/IsPopular/iv eq true",
      {
        headers,
      }
    );
  }

  getData(): Observable<any> {
    return this.http.get<any>(this._url);
  }
  
}