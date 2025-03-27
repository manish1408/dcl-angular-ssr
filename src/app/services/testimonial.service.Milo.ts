import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TestimonialServiceMilo {

  private apiUrl = environment.squidexApiUrlMilo + 'testimonials' ; 
  constructor(private http: HttpClient) { }

  getTestimonials(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
