import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CaseStudyService {

  constructor() { }
  private caseStudyApiUrl = environment.squidexApiUrl + 'case-studies';


  async fetchPosts(): Promise<any> {
    const token = await this.generateAccessToken();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Authorization", 'Bearer ' + token)

    const jsonResp =  await fetch(this.caseStudyApiUrl, {
      headers: myHeaders
    })
    const posts = jsonResp.json();
    return posts
  }

  async generateAccessToken() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("grant_type", "client_credentials");
    urlencoded.append("client_id", environment.squidexClientId);
    urlencoded.append(
      "client_secret",
      environment.squidexClientSecret
    );
    urlencoded.append("scope", "squidex-api");
    const jsonRsp = await fetch(
      "https://cloud.squidex.io/identity-server/connect/token",
      {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow",
      }
    );
    const data = await jsonRsp.json();
    return data.access_token;
  };
}
