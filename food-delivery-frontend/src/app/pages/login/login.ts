// src/app/pages/login/login.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';
  loading = false;

  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient, private router: Router) {}

  onLogin() {
    if (!this.username || !this.password) {
      this.error = 'Логин мен парольді енгізіңіз';
      return;
    }
    this.loading = true;
    this.error = '';

    // Шаг 1 — получаем токен
    this.http.post<any>(`${this.apiUrl}/login/`, {
      username: this.username,
      password: this.password
    }).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('username', this.username);

        // Шаг 2 — получаем роль
        this.http.get<any>(`${this.apiUrl}/me/`, {
          headers: { Authorization: `Token ${res.token}` }
        }).subscribe({
          next: (user) => {
            const role = user.profile?.role || 'customer';
            localStorage.setItem('role', role);
            this.loading = false;

            // Редирект по роли
            if (role === 'admin') {
              this.router.navigate(['/admin-panel']);
            } else if (role === 'courier') {
              this.router.navigate(['/courier-dashboard']);
            } else if (role === 'restaurant') {
              this.router.navigate(['/restaurant-dashboard']);
            } else {
              this.router.navigate(['/home']);
            }
          },
          error: () => {
            // Если /me/ не работает — просто идём на home
            this.loading = false;
            this.router.navigate(['/home']);
          }
        });
      },
      error: (err) => {
        this.error = err.status === 400
          ? 'Логин немесе пароль қате'
          : 'Қате орын алды. Қайталап көріңіз.';
        this.loading = false;
      }
    });
  }
}