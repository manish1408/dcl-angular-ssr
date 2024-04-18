import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private http: HttpClient
  ) {}

  public isBrowser() {
    return isPlatformBrowser(this.platformId);
  }

  generateAccessToken() {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );

    const body = new URLSearchParams();
    body.set('grant_type', 'client_credentials');
    body.set('client_id', environment.squidexClientId);
    body.set('client_secret', environment.squidexClientSecret);
    body.set('scope', 'squidex-api');

    return this.http
      .post<any>(
        'https://cloud.squidex.io/identity-server/connect/token',
        body.toString(),
        { headers }
      )
      .pipe(
        map(({ access_token: token }) => {
          // console.log('generateAccessToken -> token', token);
          return token as string;
        })
      );
  }
}
