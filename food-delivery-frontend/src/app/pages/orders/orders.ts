// src/app/pages/orders/orders.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule, DecimalPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { OrderService } from '../../services/order';
import { Order } from '../../interfaces/models';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, RouterLink, DecimalPipe, DatePipe],
  templateUrl: './orders.html',
  styleUrl: './orders.css'
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  loading = true;
  error = '';

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.orderService.getOrders().subscribe({
      next: (data: Order[]) => {
        this.orders = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.status === 401
          ? 'Тапсырыстарды көру үшін жүйеге кіріңіз'
          : 'Тапсырыстарды жүктеу мүмкін болмады';
        this.loading = false;
      }
    });
  }

  getStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      pending: '⏳ Күтілуде',
      confirmed: '✅ Расталды',
      cooking: '👨‍🍳 Дайындалуда',
      delivery: '🛵 Жолда',
      delivered: '🎉 Жеткізілді',
      cancelled: '❌ Бас тартылды'
    };
    return labels[status] || status;
  }
}