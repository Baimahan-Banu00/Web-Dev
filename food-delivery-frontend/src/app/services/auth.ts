// src/app/services/auth.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login/`, { username, password }).pipe(
      tap(res => {
        localStorage.setItem('token', res.token);
        // Получаем роль пользователя
        this.loadProfile();
      })
    );
  }

  loadProfile() {
    const token = localStorage.getItem('token');
    if (!token) return;
    this.http.get<any>(`${this.apiUrl}/me/`, {
      headers: { Authorization: `Token ${token}` }
    }).subscribe({
      next: (user) => {
        const role = user.profile?.role || 'customer';
        localStorage.setItem('role', role);
        localStorage.setItem('username', user.username);
      }
    });
  }

  register(username: string, password: string, email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register/`, { username, password, email });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('username');
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRole(): string {
    return localStorage.getItem('role') || 'customer';
  }

  getUsername(): string {
    return localStorage.getItem('username') || '';
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  isAdmin(): boolean {
    return this.getRole() === 'admin';
  }

  isCourier(): boolean {
    return this.getRole() === 'courier';
  }

  isRestaurantOwner(): boolean {
    return this.getRole() === 'restaurant';
  }
}