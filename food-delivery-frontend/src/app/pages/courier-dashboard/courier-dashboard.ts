// src/app/pages/courier-dashboard/courier-dashboard.ts
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule, DecimalPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-courier-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, DecimalPipe, DatePipe],
  templateUrl: './courier-dashboard.html',
  styleUrl: './courier-dashboard.css'
})
export class CourierDashboardComponent implements OnInit, OnDestroy {
  activeTab = 'available';
  loading = true;
  courierName = '';
  isAvailable = true;

  availableOrders: any[] = [];
  myOrders: any[] = [];
  activeOrder: any = null;

  private refreshTimer: any;
  private apiUrl = 'http://127.0.0.1:8000/api';

  get headers() {
    return { Authorization: `Token ${localStorage.getItem('token')}` };
  }

  constructor(
    private http: HttpClient,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    if (localStorage.getItem('role') !== 'courier') {
      this.router.navigate(['/home']);
      return;
    }
    this.courierName = localStorage.getItem('username') || 'Курьер';
    this.loadAll();

    // Автообновление каждые 15 секунд
    this.refreshTimer = setInterval(() => {
      this.loadAvailable();
    }, 15000);
  }

  ngOnDestroy() {
    clearInterval(this.refreshTimer);
  }

  loadAll() {
    this.loading = true;
    this.loadAvailable();
    this.loadMyOrders();
  }

  loadAvailable() {
    this.http.get<any[]>(`${this.apiUrl}/orders/available/`, { headers: this.headers })
      .subscribe({
        next: (data) => {
          this.availableOrders = data;
          this.loading = false;
          this.cdr.detectChanges();
        },
        error: () => { this.loading = false; }
      });
  }

  loadMyOrders() {
    this.http.get<any[]>(`${this.apiUrl}/orders/`, { headers: this.headers })
      .subscribe({
        next: (data) => {
          this.myOrders = data;
          this.activeOrder = data.find(o => o.status === 'delivery') || null;
          this.cdr.detectChanges();
        }
      });
  }

  // Взять заказ
  takeOrder(order: any) {
    this.http.post(`${this.apiUrl}/orders/${order.id}/take/`, {}, { headers: this.headers })
      .subscribe({
        next: () => {
          this.activeOrder = { ...order, status: 'delivery' };
          this.availableOrders = this.availableOrders.filter(o => o.id !== order.id);
          this.activeTab = 'active';
          this.loadMyOrders();
          this.cdr.detectChanges();
        },
        error: (err) => {
          alert(err.error?.error || 'Қате орын алды');
        }
      });
  }

  // Доставил
  completeOrder(orderId: number) {
    this.http.post(`${this.apiUrl}/orders/${orderId}/complete/`, {}, { headers: this.headers })
      .subscribe({
        next: () => {
          if (this.activeOrder?.id === orderId) {
            this.activeOrder.status = 'delivered';
          }
          this.loadMyOrders();
          this.cdr.detectChanges();
        }
      });
  }

  getStatusLabel(status: string): string {
    const map: Record<string, string> = {
      pending: '⏳ Күтілуде',
      confirmed: '✅ Расталды',
      cooking: '👨‍🍳 Дайындалуда',
      delivery: '🛵 Жолда',
      delivered: '🎉 Жеткізілді',
      cancelled: '❌ Бас тартылды',
    };
    return map[status] || status;
  }

  getMyOrdersCount(): number {
    return this.myOrders.filter(o => o.status === 'delivery').length;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}