// src/app/services/order.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface LocalOrder {
  id: number;
  restaurant: number;
  restaurant_name: string;
  items: { dish_name: string; quantity: number; price: number }[];
  total_price: number;
  status: string;
  created_at: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private getOrders(): LocalOrder[] {
    const raw = localStorage.getItem('orders');
    return raw ? JSON.parse(raw) : [];
  }

  private saveOrders(orders: LocalOrder[]) {
    localStorage.setItem('orders', JSON.stringify(orders));
  }

  private nextId(): number {
    const orders = this.getOrders();
    return orders.length > 0 ? Math.max(...orders.map(o => o.id)) + 1 : 1;
  }

  createOrder(data: any): Observable<LocalOrder> {
    const orders = this.getOrders();
    const newOrder: LocalOrder = {
      id: this.nextId(),
      restaurant: data.restaurant,
      restaurant_name: data.restaurant_name || 'Ресторан',
      items: (data.items_input || []).map((item: any) => ({
        dish_name: item.dish_name || `Тағам #${item.dish}`,
        quantity: item.quantity,
        price: item.price || 0
      })),
      total_price: data.total_price || 0,
      status: 'confirmed',
      created_at: new Date().toISOString()
    };
    orders.push(newOrder);
    this.saveOrders(orders);
    return of(newOrder);
  }

  getOrdersList(): Observable<LocalOrder[]> {
    return of(this.getOrders().reverse());
  }

  // Совместимость со старым кодом
  getOrders2(): Observable<LocalOrder[]> {
    return of(this.getOrders().reverse());
  }

  getAvailableOrders(): Observable<any[]> {
    return of([]);
  }

  takeOrder(id: number): Observable<any> {
    return of({});
  }

  completeOrder(id: number): Observable<any> {
    return of({});
  }

  cancelOrder(id: number): Observable<any> {
    const orders = this.getOrders();
    const idx = orders.findIndex(o => o.id === id);
    if (idx !== -1) {
      orders[idx].status = 'cancelled';
      this.saveOrders(orders);
    }
    return of({});
  }
}