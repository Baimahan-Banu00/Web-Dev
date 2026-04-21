// src/app/pages/admin-panel/admin-panel.ts
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule, DecimalPipe, DatePipe } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, DecimalPipe, DatePipe],
  templateUrl: './admin-panel.html',
  styleUrl: './admin-panel.css'
})
export class AdminPanelComponent implements OnInit {
  activeTab = 'dashboard';
  loading = true;

  // Статистика
  stats = {
    totalOrders: 0,
    totalRevenue: 0,
    totalUsers: 0,
    totalRestaurants: 0,
    pendingOrders: 0,
    deliveredOrders: 0,
  };

  // Данные
  orders: any[] = [];
  users: any[] = [];
  restaurants: any[] = [];
  filteredOrders: any[] = [];
  orderSearch = '';
  orderStatusFilter = 'all';

  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(
    private http: HttpClient,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    if (localStorage.getItem('role') !== 'admin' && !this.isAdmin()) {
      this.router.navigate(['/home']);
      return;
    }
    this.loadAll();
  }

  isAdmin(): boolean {
    return localStorage.getItem('role') === 'admin';
  }

  loadAll() {
    this.loading = true;
    const headers = { Authorization: `Token ${localStorage.getItem('token')}` };

    // Загружаем заказы
    this.http.get<any[]>(`${this.apiUrl}/orders/`, { headers }).subscribe({
      next: (data) => {
        this.orders = data;
        this.filteredOrders = data;
        this.calcStats();
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => { this.loading = false; }
    });

    // Загружаем рестораны
    this.http.get<any[]>(`${this.apiUrl}/restaurants/`, { headers }).subscribe({
      next: (data) => { this.restaurants = data; this.cdr.detectChanges(); }
    });
  }

  calcStats() {
    this.stats.totalOrders = this.orders.length;
    this.stats.totalRevenue = this.orders
      .filter(o => o.status === 'delivered')
      .reduce((sum, o) => sum + Number(o.total_price || 0), 0);
    this.stats.totalRestaurants = this.restaurants.length;
    this.stats.pendingOrders = this.orders.filter(o =>
      ['pending','confirmed','cooking','delivery'].includes(o.status)).length;
    this.stats.deliveredOrders = this.orders.filter(o => o.status === 'delivered').length;
  }

  filterOrders() {
    let result = [...this.orders];
    if (this.orderStatusFilter !== 'all') {
      result = result.filter(o => o.status === this.orderStatusFilter);
    }
    if (this.orderSearch.trim()) {
      const q = this.orderSearch.toLowerCase();
      result = result.filter(o =>
        String(o.id).includes(q) ||
        o.customer_name?.toLowerCase().includes(q) ||
        o.restaurant_name?.toLowerCase().includes(q)
      );
    }
    this.filteredOrders = result;
  }

  updateOrderStatus(orderId: number, status: string) {
    const headers = { Authorization: `Token ${localStorage.getItem('token')}` };
    this.http.patch(`${this.apiUrl}/orders/${orderId}/`, { status }, { headers }).subscribe({
      next: () => {
        const order = this.orders.find(o => o.id === orderId);
        if (order) order.status = status;
        this.filterOrders();
        this.calcStats();
        this.cdr.detectChanges();
      }
    });
  }

  toggleRestaurant(restaurant: any) {
    const headers = { Authorization: `Token ${localStorage.getItem('token')}` };
    this.http.post(`${this.apiUrl}/restaurants/${restaurant.id}/toggle_open/`, {}, { headers })
      .subscribe({
        next: (res: any) => {
          restaurant.is_open = res.is_open;
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

  getStatusClass(status: string): string {
    const map: Record<string, string> = {
      pending: 'status-pending',
      confirmed: 'status-confirmed',
      cooking: 'status-cooking',
      delivery: 'status-delivery',
      delivered: 'status-delivered',
      cancelled: 'status-cancelled',
    };
    return map[status] || '';
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}