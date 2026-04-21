// src/app/pages/register/register.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';
  password2 = '';
  role = 'customer';
  error = '';
  loading = false;

  // Курьер анкета
  phone = '';
  vehicleType = 'scooter';
  showCourierForm = false;

  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient, private router: Router) {}

  onRoleChange() {
    this.showCourierForm = this.role === 'courier';
  }

  onRegister() {
    if (!this.username || !this.email || !this.password) {
      this.error = 'Барлық өрістерді толтырыңыз';
      return;
    }
    if (this.password !== this.password2) {
      this.error = 'Парольдер сәйкес келмейді';
      return;
    }
    if (this.password.length < 6) {
      this.error = 'Пароль кемінде 6 символ болуы керек';
      return;
    }
    if (this.role === 'courier' && !this.phone) {
      this.error = 'Курьер үшін телефон нөмірін енгізіңіз';
      return;
    }

    this.loading = true;
    this.error = '';

    this.http.post<any>(`${this.apiUrl}/register/`, {
      username: this.username,
      email: this.email,
      password: this.password,
      role: this.role
    }).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('role', this.role);
        localStorage.setItem('username', this.username);
        this.loading = false;

        // Редирект по роли
        if (this.role === 'admin') {
          this.router.navigate(['/admin-panel']);
        } else if (this.role === 'courier') {
          this.router.navigate(['/courier-dashboard']);
        } else if (this.role === 'restaurant') {
          this.router.navigate(['/restaurant-dashboard']);
        } else {
          this.router.navigate(['/home']);
        }
      },
      error: (err) => {
        this.error = err.error?.username?.[0] ||
                     err.error?.email?.[0] ||
                     err.error?.password?.[0] ||
                     'Тіркеу сәтсіз. Қайталап көріңіз.';
        this.loading = false;
      }
    });
  }
}