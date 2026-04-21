// src/app/pages/orders/orders.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule, DecimalPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { OrderService } from '../../services/order';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, RouterLink, DecimalPipe, DatePipe],
  templateUrl: './orders.html',
  styleUrl: './orders.css'
})
export class OrdersComponent implements OnInit {
  orders: any[] = [];
  loading = true;
  error = '';

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.orderService.getOrdersList().subscribe({
      next: (data: any[]) => {
        this.orders = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Тапсырыстарды жүктеу мүмкін болмады';
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