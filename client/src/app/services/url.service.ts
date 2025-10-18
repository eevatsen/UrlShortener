// Add this method to services/url.service.ts

import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/api/urls`;

  getUrls() {
    return this.http.get(this.apiUrl);
  }
  
  addUrl(originalUrl: string) {
    return this.http.post(this.apiUrl, { originalUrl });
  }

  deleteUrl(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}