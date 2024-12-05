import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor() {}
  private cta_api_url = environment.squidexApiUrl + 'footer-cta';
  private engagement_api_url = environment.squidexApiUrl + 'engagement-models';


  async getCTA(): Promise<any> {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

    const jsonResp = await fetch(this.cta_api_url, {
      headers: myHeaders,
    });
    const posts = jsonResp.json();
    return posts;
  }

  async getEngagementModels(): Promise<any> {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
    const jsonResp = await fetch(this.engagement_api_url, {
      headers: myHeaders,
    });
    const posts = jsonResp.json();
    return posts;
  }
}
