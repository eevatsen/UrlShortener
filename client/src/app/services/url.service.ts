import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UrlService {
  private http = inject(HttpClient)
  private apiUrl = `${environment.apiUrl}`;

  getUrls() {
    return this.http.get(`${this.apiUrl}/api/Urls`);
  }
}
