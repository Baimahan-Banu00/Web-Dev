// src/app/pages/restaurants/restaurants.ts
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RestaurantService } from '../../services/restaurant';
import { Restaurant } from '../../interfaces/models';
import { MOCK_RESTAURANTS } from '../../data/mockdata';

@Component({
  selector: 'app-restaurants',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './restaurants.html',
  styleUrl: './restaurants.css'
})
export class RestaurantsComponent implements OnInit {
  restaurants: Restaurant[] = [];
  filteredRestaurants: Restaurant[] = [];
  activeFilter = 'all';
  searchQuery = '';
  loading = true;
  error = '';

  categories = [
    { id: 'all', label: 'Барлығы', icon: '🍽️' },
    { id: 'fastfood', label: 'Фаст фуд', icon: '🍔' },
    { id: 'asian', label: 'Азиялық', icon: '🍜' },
    { id: 'european', label: 'Еуропалық', icon: '🥘' },
  ];

  constructor(private restaurantService: RestaurantService) {}

  ngOnInit() {
    this.restaurantService.getRestaurants().subscribe({
      next: (data) => {
        this.restaurants = data;
        this.applyFilter();
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Не удалось загрузить рестораны';
        this.restaurants = MOCK_RESTAURANTS as Restaurant[];
        this.applyFilter();
        this.loading = false;
      }
    });
  }

  setFilter(filter: string) {
    this.activeFilter = filter;
    this.applyFilter();
  }

  onSearch() {
    this.applyFilter();
  }

  applyFilter() {
    let result = this.restaurants;

    if (this.activeFilter !== 'all') {
      result = result.filter(r => {
        const cat = (r as any).category;
        if (typeof cat === 'string') return cat === this.activeFilter;
        // fallback по имени
        const fastfoodNames = ['Gippo', 'Burger', 'Salam', 'Додо'];
        const asianNames = ['Окадзаки', 'Нават', 'Шашлык', 'Дегирмен'];
        const europeanNames = ['Дель', 'Неделька'];
        if (this.activeFilter === 'fastfood') return fastfoodNames.some(n => r.name.includes(n));
        if (this.activeFilter === 'asian') return asianNames.some(n => r.name.includes(n));
        if (this.activeFilter === 'european') return europeanNames.some(n => r.name.includes(n));
        return true;
      });
    }

    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      result = result.filter(r =>
        r.name.toLowerCase().includes(q) ||
        r.address.toLowerCase().includes(q) ||
        r.description?.toLowerCase().includes(q)
      );
    }

    this.filteredRestaurants = result;
  }

  getRestaurantImage(r: Restaurant): string {
    return (r as any).image || 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80';
  }

  getRating(r: Restaurant): number {
    return (r as any).rating || 95;
  }

  getReviews(r: Restaurant): string {
    const n = (r as any).reviews || 100;
    return n >= 500 ? '500+' : String(n);
  }

  getDeliveryTime(r: Restaurant): string {
    return (r as any).deliveryTime || '30-40 мин';
  }

  getDeliveryFee(r: Restaurant): string {
    return (r as any).deliveryFee || '299 ₸';
  }

  getTags(r: Restaurant): string[] {
    return (r as any).tags || [];
  }

  isFree(r: Restaurant): boolean {
    return this.getDeliveryFee(r) === 'Тегін';
  }
}