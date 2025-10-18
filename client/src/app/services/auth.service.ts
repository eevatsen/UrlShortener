import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/api/auth`; 

  login(userData: any) {
    return this.http.post(`${this.apiUrl}/login`, userData);
  }

  register(userData: any) {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }
}