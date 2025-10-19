import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AboutService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/about`;

  getContent() {
    return this.http.get(this.apiUrl, { responseType: 'text' });
  }

  updateContent(newContent: string) {
    return this.http.post(this.apiUrl, JSON.stringify(newContent), {
      headers: { 'Content-Type': 'application/json' }
    });
  }
}