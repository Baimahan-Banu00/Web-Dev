// src/app/pages/restaurant-dashboard/restaurant-dashboard.ts
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule, DecimalPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-restaurant-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, DecimalPipe, DatePipe],
  templateUrl: './restaurant-dashboard.html',
  styleUrl: './restaurant-dashboard.css'
})
export class RestaurantDashboardComponent implements OnInit {
  activeTab = 'orders';
  loading = true;

  restaurant: any = null;
  orders: any[] = [];
  dishes: any[] = [];

  // Новое блюдо
  newDish = { name: '', description: '', price: 0, stock: 999 };
  addingDish = false;
  dishError = '';
  dishSuccess = '';

  // Скидка
  discountDishId: number | null = null;
  discountValue = 0;

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
    const role = localStorage.getItem('role');
    if (role !== 'restaurant') {
      this.router.navigate(['/home']);
      return;
    }
    this.loadData();
  }

  loadData() {
    this.loading = true;

    // Загружаем профиль — находим свой ресторан
    this.http.get<any>(`${this.apiUrl}/me/`, { headers: this.headers }).subscribe({
      next: (user) => {
        this.http.get<any[]>(`${this.apiUrl}/restaurants/`).subscribe({
          next: (restaurants) => {
            // owner может быть числом или объектом
            this.restaurant = restaurants.find(r => {
              const ownerId = typeof r.owner === 'object' ? r.owner?.id : r.owner;
              return ownerId === user.id || ownerId === user.pk;
            }) || null;

            // Если не нашли по owner — берём первый ресторан (для теста)
            if (!this.restaurant && restaurants.length > 0) {
              console.log('Рестораны:', restaurants.map((r:any) => ({id: r.id, name: r.name, owner: r.owner})));
              console.log('User:', user);
            }

            if (this.restaurant) {
              this.dishes = this.restaurant.dishes || [];
              this.loadOrders();
            }
            this.loading = false;
            this.cdr.detectChanges();
          }
        });
      }
    });
  }

  loadOrders() {
    if (!this.restaurant) return;
    this.http.get<any[]>(
      `${this.apiUrl}/restaurants/${this.restaurant.id}/orders/`,
      { headers: this.headers }
    ).subscribe({
      next: (data) => {
        this.orders = data;
        this.cdr.detectChanges();
      }
    });
  }

  // Подтвердить заказ
  confirmOrder(orderId: number) {
    this.http.post(`${this.apiUrl}/orders/${orderId}/confirm/`, {}, { headers: this.headers })
      .subscribe({
        next: () => {
          const order = this.orders.find(o => o.id === orderId);
          if (order) order.status = 'cooking';
          this.cdr.detectChanges();
        }
      });
  }

  // Отменить заказ
  cancelOrder(orderId: number) {
    this.http.post(`${this.apiUrl}/orders/${orderId}/cancel/`, {}, { headers: this.headers })
      .subscribe({
        next: () => {
          const order = this.orders.find(o => o.id === orderId);
          if (order) order.status = 'cancelled';
          this.cdr.detectChanges();
        }
      });
  }

  // Открыть/закрыть ресторан
  toggleRestaurant() {
    this.http.post(
      `${this.apiUrl}/restaurants/${this.restaurant.id}/toggle_open/`,
      {}, { headers: this.headers }
    ).subscribe({
      next: (res: any) => {
        this.restaurant.is_open = res.is_open;
        this.cdr.detectChanges();
      }
    });
  }

  // Включить/выключить блюдо
  toggleDish(dish: any) {
    this.http.post(
      `${this.apiUrl}/dishes/${dish.id}/toggle_available/`,
      {}, { headers: this.headers }
    ).subscribe({
      next: (res: any) => {
        dish.is_available = res.is_available;
        this.cdr.detectChanges();
      }
    });
  }

  // Обновить остаток
  updateStock(dish: any) {
    this.http.post(
      `${this.apiUrl}/dishes/${dish.id}/update_stock/`,
      { stock: dish.stock },
      { headers: this.headers }
    ).subscribe({
      next: (res: any) => {
        dish.stock = res.stock;
        dish.is_available = res.is_available;
        this.cdr.detectChanges();
      }
    });
  }

  // Применить скидку
  applyDiscount(dish: any) {
    if (this.discountValue <= 0 || this.discountValue >= 100) return;
    const originalPrice = dish.original_price || dish.price;
    const newPrice = Math.round(originalPrice * (1 - this.discountValue / 100));

    this.http.patch(
      `${this.apiUrl}/dishes/${dish.id}/`,
      { price: newPrice, original_price: originalPrice },
      { headers: this.headers }
    ).subscribe({
      next: () => {
        dish.original_price = originalPrice;
        dish.price = newPrice;
        dish.discount = this.discountValue;
        this.discountDishId = null;
        this.discountValue = 0;
        this.cdr.detectChanges();
      }
    });
  }

  // Убрать скидку
  removeDiscount(dish: any) {
    if (!dish.original_price) return;
    this.http.patch(
      `${this.apiUrl}/dishes/${dish.id}/`,
      { price: dish.original_price },
      { headers: this.headers }
    ).subscribe({
      next: () => {
        dish.price = dish.original_price;
        dish.original_price = null;
        dish.discount = null;
        this.cdr.detectChanges();
      }
    });
  }

  // Добавить блюдо
  addDish() {
    if (!this.newDish.name || !this.newDish.price) {
      this.dishError = 'Атауы мен бағасын енгізіңіз';
      return;
    }
    this.addingDish = true;
    this.dishError = '';

    this.http.post<any>(`${this.apiUrl}/dishes/`, {
      ...this.newDish,
      restaurant: this.restaurant.id,
      is_available: true
    }, { headers: this.headers }).subscribe({
      next: (dish) => {
        this.dishes.push(dish);
        this.newDish = { name: '', description: '', price: 0, stock: 999 };
        this.dishSuccess = 'Тағам сәтті қосылды!';
        this.addingDish = false;
        setTimeout(() => this.dishSuccess = '', 3000);
        this.cdr.detectChanges();
      },
      error: () => {
        this.dishError = 'Қате орын алды';
        this.addingDish = false;
      }
    });
  }

  // Удалить блюдо
  deleteDish(dish: any) {
    if (!confirm(`"${dish.name}" өшіресіз бе?`)) return;
    this.http.delete(`${this.apiUrl}/dishes/${dish.id}/`, { headers: this.headers })
      .subscribe({
        next: () => {
          this.dishes = this.dishes.filter(d => d.id !== dish.id);
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

  getPendingCount(): number {
    return this.orders.filter(o => o.status === 'pending').length;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}