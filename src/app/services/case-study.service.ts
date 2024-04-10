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

  fetchPosts() {
    return this.common.generateAccessToken().pipe(
      switchMap(({ access_token: token }) => {
        console.log('fetchPosts -> token', token);
        var headers = new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
          .set('Authorization', 'Bearer ' + token);
        return this.http.get(this.caseStudyApiUrl, {
          headers,
        });
      })
    );
  }

  async getCaseStudyBySlug(slug: string): Promise<any> {
    const resp = await this.generateAccessToken();
    var myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + resp);
    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };
    const jsonResp = await fetch(
      this.caseStudyApiUrl + "?$filter=data/slug/iv eq '" + slug + "'",
      {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      }
    );
    const post = await jsonResp.json();
    return post;
  }
  async generateAccessToken() {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

    var urlencoded = new URLSearchParams();
    urlencoded.append('grant_type', 'client_credentials');
    urlencoded.append('client_id', environment.squidexClientId);
    urlencoded.append('client_secret', environment.squidexClientSecret);
    urlencoded.append('scope', 'squidex-api');
    const jsonRsp = await fetch(
      'https://cloud.squidex.io/identity-server/connect/token',
      {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow',
      }
    );
    const data = await jsonRsp.json();
    return data.access_token;
  }
}
