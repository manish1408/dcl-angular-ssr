import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { switchMap } from 'rxjs';
import { environment } from '../environments/environment';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  constructor(private common: CommonService, private http: HttpClient) {}

  private blogApiUrl = environment.squidexApiUrl + 'posts';

  fetchPosts() {
    var headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );
    return this.http.get(this.blogApiUrl, {
      headers,
    });
  }
  getBlogBySlug(slug: string) {
    var headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );
    return this.http.get(
      this.blogApiUrl + "?$filter=data/slug/iv eq '" + slug + "'",
      {
        headers,
      }
    );
  }
}
