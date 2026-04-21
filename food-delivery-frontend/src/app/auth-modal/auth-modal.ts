// src/app/auth-modal/auth-modal.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-auth-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth-modal.html',
  styleUrl: './auth-modal.css'
})
export class AuthModalComponent {
  @Output() closed = new EventEmitter<void>();
  @Output() success = new EventEmitter<void>();

  tab: 'login' | 'register' = 'login';

  loginUsername = '';
  loginPassword = '';
  loginError = '';
  loginLoading = false;

  regUsername = '';
  regEmail = '';
  regPassword = '';
  regPassword2 = '';
  regError = '';
  regLoading = false;

  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  switchTab(tab: 'login' | 'register') {
    this.tab = tab;
    this.loginError = '';
    this.regError = '';
  }

  onLogin() {
    if (!this.loginUsername || !this.loginPassword) {
      this.loginError = 'Барлық өрістерді толтырыңыз';
      return;
    }
    this.loginLoading = true;
    this.loginError = '';

    this.http.post<any>(`${this.apiUrl}/login/`, {
      username: this.loginUsername,
      password: this.loginPassword
    }).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.token);
        this.loginLoading = false;
        this.success.emit();
      },
      error: (err: any) => {
        this.loginError = err.status === 400
          ? 'Логин немесе пароль қате'
          : 'Қате орын алды. Қайталап көріңіз.';
        this.loginLoading = false;
      }
    });
  }

  onRegister() {
    if (!this.regUsername || !this.regEmail || !this.regPassword || !this.regPassword2) {
      this.regError = 'Барлық өрістерді толтырыңыз';
      return;
    }
    if (this.regPassword !== this.regPassword2) {
      this.regError = 'Парольдер сәйкес келмейді';
      return;
    }
    if (this.regPassword.length < 6) {
      this.regError = 'Пароль кемінде 6 символ болуы керек';
      return;
    }
    this.regLoading = true;
    this.regError = '';

    this.http.post<any>(`${this.apiUrl}/register/`, {
      username: this.regUsername,
      password: this.regPassword,
      email: this.regEmail
    }).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.token);
        this.regLoading = false;
        this.success.emit();
      },
      error: (err: any) => {
        this.regError = err.status === 400
          ? 'Бұл логин немесе email тіркелген'
          : 'Тіркеу сәтсіз. Қайталап көріңіз.';
        this.regLoading = false;
      }
    });
  }

  close() { this.closed.emit(); }

  onBackdropClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('modal-backdrop')) {
      this.close();
    }
  }
}