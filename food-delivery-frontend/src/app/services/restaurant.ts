// src/app/services/restaurant.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, catchError, map } from 'rxjs';
import { Restaurant, Dish } from '../interfaces/models';
import { MOCK_RESTAURANTS, MOCK_DISHES } from '../data/mockdata';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  getRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(`${this.apiUrl}/restaurants/`).pipe(
      map(data => data.map(r => this.enrichRestaurant(r))),
      catchError(() => of(MOCK_RESTAURANTS as Restaurant[]))
    );
  }

  getRestaurant(id: number): Observable<Restaurant & { menu_items?: Dish[] }> {
    return this.http.get<Restaurant & { menu_items?: Dish[] }>(`${this.apiUrl}/restaurants/${id}/`).pipe(
      map(r => ({
        ...this.enrichRestaurant(r),
        menu_items: r.menu_items?.map(d => this.enrichDish(d)) || MOCK_DISHES[id] || []
      })),
      catchError(() => {
        const mock = MOCK_RESTAURANTS.find(r => r.id === id) as any;
        if (mock) {
          return of({ ...mock, menu_items: MOCK_DISHES[id] || [] });
        }
        return of({ id, name: 'Ресторан', description: '', address: '', image: null, category: null, menu_items: [] });
      })
    );
  }

  // Если бэкенд не отдаёт картинку — берём из mock
  private enrichRestaurant(r: Restaurant): Restaurant {
    const mock = MOCK_RESTAURANTS.find(m => m.id === r.id || m.name === r.name);
    return {
      ...r,
      image: r.image || mock?.image || 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80',
      rating: mock?.rating || 95,
      reviews: mock?.reviews || 100,
      deliveryTime: mock?.deliveryTime || '30-40 мин',
      deliveryFee: mock?.deliveryFee || '299 ₸',
      tags: mock?.tags || [],
      category: r.category || mock?.category as any || 'fastfood'
    };
  }

  private enrichDish(d: Dish): Dish {
    return {
      ...d,
      image: d.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80'
    };
  }
}