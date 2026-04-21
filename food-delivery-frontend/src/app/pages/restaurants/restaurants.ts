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
  restaurants: any[] = [];
  filteredRestaurants: any[] = [];
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

  // Маппинг имён с бэкенда → mock данные
  private nameMap: { [key: string]: any } = {
    'баханди': MOCK_RESTAURANTS.find(r => r.id === 11),
    'bahandi': MOCK_RESTAURANTS.find(r => r.id === 11),
    'салам бро': MOCK_RESTAURANTS.find(r => r.id === 12),
    'salam bro': MOCK_RESTAURANTS.find(r => r.id === 12),
    'додо пицца': MOCK_RESTAURANTS.find(r => r.id === 13),
    'dodo': MOCK_RESTAURANTS.find(r => r.id === 13),
    'донер на сатпаева': MOCK_RESTAURANTS.find(r => r.id === 14),
    'donor na satpaeva': MOCK_RESTAURANTS.find(r => r.id === 14),
    'суши': MOCK_RESTAURANTS.find(r => r.id === 15),
    'sushi': MOCK_RESTAURANTS.find(r => r.id === 15),
    'абая донер': MOCK_RESTAURANTS.find(r => r.id === 16),
    'abaya donor': MOCK_RESTAURANTS.find(r => r.id === 16),
    'центр шашлык': MOCK_RESTAURANTS.find(r => r.id === 17),
    'center shashlik': MOCK_RESTAURANTS.find(r => r.id === 17),
    'дегирмен': MOCK_RESTAURANTS.find(r => r.id === 18),
    'degirmen': MOCK_RESTAURANTS.find(r => r.id === 18),
    'неделька': MOCK_RESTAURANTS.find(r => r.id === 19),
    'nedelka': MOCK_RESTAURANTS.find(r => r.id === 19),
    'дель папа': MOCK_RESTAURANTS.find(r => r.id === 20),
    'del papa': MOCK_RESTAURANTS.find(r => r.id === 20),
    'navat': MOCK_RESTAURANTS.find(r => r.id === 16),
    'нават': MOCK_RESTAURANTS.find(r => r.id === 16),
  };

  constructor(private restaurantService: RestaurantService) {}

  ngOnInit() {
    this.restaurantService.getRestaurants().subscribe({
      next: (data: any[]) => {
        // Обогащаем данные с бэкенда mock-данными
        this.restaurants = data.map(r => this.enrichFromMock(r));
        this.applyFilter();
        this.loading = false;
      },
      error: () => {
        // Если бэкенд недоступен — используем mock
        this.restaurants = MOCK_RESTAURANTS;
        this.applyFilter();
        this.loading = false;
      }
    });
  }

  private enrichFromMock(r: any): any {
    const nameLower = r.name?.toLowerCase() || '';
    const mock = this.nameMap[nameLower] ||
      MOCK_RESTAURANTS.find(m => m.id === r.id) ||
      MOCK_RESTAURANTS.find(m => nameLower.includes(m.name.toLowerCase().split(' ')[0]));

    return {
      ...r,
      image: r.image || mock?.image || 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80',
      category: mock?.category || r.category || 'fastfood',
      rating: mock?.rating || 95,
      reviews: mock?.reviews || 100,
      deliveryTime: mock?.deliveryTime || '30-40 мин',
      deliveryFee: mock?.deliveryFee || '299 ₸',
      tags: mock?.tags || [],
    };
  }

  setFilter(filter: string) {
    this.activeFilter = filter;
    this.applyFilter();
  }

  onSearch() {
    this.applyFilter();
  }

  applyFilter() {
    let result = [...this.restaurants];

    if (this.activeFilter !== 'all') {
      result = result.filter(r => {
        const cat = r.category;
        const name = (r.name || '').toLowerCase();

        if (this.activeFilter === 'fastfood') {
          return cat === 'fastfood' || cat === 1 ||
            ['баханди', 'bahandi', 'салам', 'salam', 'додо', 'dodo',
             'донер на сатп', 'donor na', 'бургер', 'burger'].some(k => name.includes(k));
        }
        if (this.activeFilter === 'asian') {
          return cat === 'asian' || cat === 2 ||
            ['суши', 'sushi', 'абая', 'abaya', 'навал', 'navat', 'нават',
             'шашлык', 'shashlik', 'center', 'центр', 'дегирмен', 'degirmen'].some(k => name.includes(k));
        }
        if (this.activeFilter === 'european') {
          return cat === 'european' || cat === 3 ||
            ['неделька', 'nedelka', 'дель', 'del papa', 'papa'].some(k => name.includes(k));
        }
        return true;
      });
    }

    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      result = result.filter(r =>
        (r.name || '').toLowerCase().includes(q) ||
        (r.address || '').toLowerCase().includes(q)
      );
    }

    this.filteredRestaurants = result;
  }

  getRestaurantImage(r: any): string {
    return r.image || 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80';
  }

  getRating(r: any): number { return r.rating || 95; }
  getReviews(r: any): string {
    const n = r.reviews || 100;
    return n >= 500 ? '500+' : String(n);
  }
  getDeliveryTime(r: any): string { return r.deliveryTime || '30-40 мин'; }
  getDeliveryFee(r: any): string { return r.deliveryFee || '299 ₸'; }
  getTags(r: any): string[] { return r.tags || []; }
  isFree(r: any): boolean { return this.getDeliveryFee(r) === 'Тегін'; }
}