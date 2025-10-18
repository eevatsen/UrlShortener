import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
  private http = inject(HttpClient)
  private apiUrl = 'https://localhost:7090'

  getUrls() {
    return this.http.get(`${this.apiUrl}/api/Urls`);
  }
}
