import { Component, OnInit, NgZone } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-restaurants',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './restaurants.html',
  styleUrl: './restaurants.css'
})
export class RestaurantsComponent implements OnInit {
  restaurants: any[] = [];
  filteredRestaurants: any[] = [];
  activeFilter = 'all';

  fastfood = ['Баханди', 'Салам Бро', 'Донер на Сатпаева', 'Абая Донер', 'Окадзаки', 'Додо'];
  european = ['Неделька', 'Дель Папа'];
  asian = ['Дегирмен', 'Нават', 'Қауасар', 'Центр Шашлык'];

  constructor(private http: HttpClient, private zone: NgZone, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['filter']) {
        this.activeFilter = params['filter'];
      }
    });

    this.http.get<any[]>('http://127.0.0.1:8000/api/restaurants/').subscribe({
      next: (data) => {
        this.zone.run(() => {
          this.restaurants = data;
          this.applyFilter();
        });
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  setFilter(filter: string) {
    this.activeFilter = filter;
    this.applyFilter();
  }

  applyFilter() {
    if (this.activeFilter === 'all') {
      this.filteredRestaurants = this.restaurants;
    } else if (this.activeFilter === 'fastfood') {
      this.filteredRestaurants = this.restaurants.filter(r =>
        this.fastfood.some(name => r.name.includes(name))
      );
    } else if (this.activeFilter === 'european') {
      this.filteredRestaurants = this.restaurants.filter(r =>
        this.european.some(name => r.name.includes(name))
      );
    } else if (this.activeFilter === 'asian') {
      this.filteredRestaurants = this.restaurants.filter(r =>
        this.asian.some(name => r.name.includes(name))
      );
    }
  }

  getIcon(name: string): string {
    if (name.includes('Пицца') || name.includes('Додо')) return '🍕';
    if (name.includes('Донер')) return '🌮';
    if (name.includes('Суши') || name.includes('Окадзаки')) return '🍱';
    if (name.includes('Баханди') || name.includes('Нават') || name.includes('Қауасар')) return '🍖';
    if (name.includes('Салам')) return '🍔';
    if (name.includes('Дегирмен')) return '🍜';
    if (name.includes('Неделька') || name.includes('Дель Папа')) return '🍝';
    if (name.includes('Шашлык')) return '🥩';
    return '🍽️';
  }
} 