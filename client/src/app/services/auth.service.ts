import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { jwtDecode } from 'jwt-decode';

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

  isLoggedIn(): boolean {
    return localStorage.getItem('token') != null;
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  getRole(): string | null {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      // The claim for role is often a long URL, so we split it.
      console.log(decodedToken);
      const role = decodedToken['role'];
      return role;
    }
    return null;
  }
  
  isAdmin(): boolean {
    return this.getRole() === 'Admin';
  }
}