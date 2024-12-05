import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SolutionsService {
  constructor() {}
  private solutions_api_url = environment.squidexApiUrl + 'solutions';


  async getSolutions(): Promise<any> {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
    const jsonResp = await fetch(this.solutions_api_url, {
      headers: myHeaders,
    });
    const posts = jsonResp.json();
    return posts;
  }
}
