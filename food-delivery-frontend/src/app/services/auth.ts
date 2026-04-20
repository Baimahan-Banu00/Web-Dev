import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<any> {
  return this.http.post(`${this.apiUrl}/login/`, { username, password });
}

  register(username: string, password: string, email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register/`, { username, password, email });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}