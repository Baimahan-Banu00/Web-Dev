import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  getOrders(): Observable<any> {
    return this.http.get(`${this.apiUrl}/orders/`);
  }

  createOrder(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/orders/`, data);
  }

  getAvailableOrders(): Observable<any> {
    return this.http.get(`${this.apiUrl}/orders/available/`);
  }

  takeOrder(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/orders/${id}/take/`, {});
  }

  completeOrder(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/orders/${id}/complete/`, {});
  }
}