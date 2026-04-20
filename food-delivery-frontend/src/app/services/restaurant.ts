import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  getRestaurants(): Observable<any> {
    return this.http.get(`${this.apiUrl}/restaurants/`);
  }

  getRestaurant(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/restaurants/${id}/`);
  }

  getDishes(): Observable<any> {
    return this.http.get(`${this.apiUrl}/dishes/`);
  }

  getDish(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/dishes/${id}/`);
  }
}