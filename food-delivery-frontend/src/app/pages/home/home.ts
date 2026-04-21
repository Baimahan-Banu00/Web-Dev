// src/app/pages/home/home.ts
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent {
  address = '';
  isLoggedIn = !!localStorage.getItem('token');

  // Курьер модалка
  showCourierModal = false;
  courierStep = 1; // 1 - анкета, 2 - аккаунт, 3 - успех

  // Анкета
  courierName = '';
  courierPhone = '';
  courierCity = 'Алматы';
  courierVehicle = 'scooter';
  courierAge = '';
  courierExp = 'no';

  // Аккаунт
  courierUsername = '';
  courierEmail = '';
  courierPassword = '';
  courierPassword2 = '';

  courierError = '';
  courierLoading = false;

  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private router: Router, private http: HttpClient) {}

  goToRestaurants() {
    this.router.navigate(['/restaurants']);
  }

  logout() {
    localStorage.clear();
    this.isLoggedIn = false;
    this.router.navigate(['/']);
  }

  openCourierModal() {
    this.showCourierModal = true;
    this.courierStep = 1;
    this.courierError = '';
  }

  closeCourierModal() {
    this.showCourierModal = false;
    this.courierStep = 1;
    this.courierError = '';
  }

  nextStep() {
    if (this.courierStep === 1) {
      if (!this.courierName || !this.courierPhone || !this.courierAge) {
        this.courierError = 'Барлық өрістерді толтырыңыз';
        return;
      }
      if (Number(this.courierAge) < 18) {
        this.courierError = 'Курьер болу үшін 18 жастан үлкен болу керек';
        return;
      }
      this.courierError = '';
      this.courierStep = 2;
    }
  }

  submitCourier() {
    if (!this.courierUsername || !this.courierEmail || !this.courierPassword) {
      this.courierError = 'Барлық өрістерді толтырыңыз';
      return;
    }
    if (this.courierPassword !== this.courierPassword2) {
      this.courierError = 'Парольдер сәйкес келмейді';
      return;
    }
    if (this.courierPassword.length < 6) {
      this.courierError = 'Пароль кемінде 6 символ';
      return;
    }

    this.courierLoading = true;
    this.courierError = '';

    this.http.post<any>(`${this.apiUrl}/register/`, {
      username: this.courierUsername,
      email: this.courierEmail,
      password: this.courierPassword,
      role: 'courier'
    }).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('role', 'courier');
        localStorage.setItem('username', this.courierUsername);
        this.courierLoading = false;
        this.courierStep = 3;
      },
      error: (err) => {
        this.courierError = err.error?.username?.[0] ||
                            err.error?.email?.[0] ||
                            'Тіркеу сәтсіз. Қайталап көріңіз.';
        this.courierLoading = false;
      }
    });
  }

  goCourierDashboard() {
    this.closeCourierModal();
    this.router.navigate(['/courier-dashboard']);
  }

  onBackdrop(e: MouseEvent) {
    if ((e.target as HTMLElement).classList.contains('modal-backdrop')) {
      this.closeCourierModal();
    }
  }
}