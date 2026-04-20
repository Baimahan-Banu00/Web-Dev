import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RestaurantService } from '../../services/restaurant';
import { OrderService } from '../../services/order';

@Component({
  selector: 'app-restaurant-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './restaurant-detail.html',
  styleUrl: './restaurant-detail.css'
})
export class RestaurantDetailComponent implements OnInit {
  restaurant: any = null;
  dishes: any[] = [];
  cart: any[] = [];
  loading = true;
  orderSuccess = false;

  constructor(
    private route: ActivatedRoute,
    private restaurantService: RestaurantService,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.restaurantService.getRestaurant(Number(id)).subscribe({
      next: (data) => {
        this.restaurant = data;
        this.dishes = data.menu_items || [];
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  addToCart(dish: any) {
    const existing = this.cart.find(item => item.id === dish.id);
    if (existing) {
      existing.quantity++;
    } else {
      this.cart.push({ ...dish, quantity: 1 });
    }
  }

  removeFromCart(dish: any) {
    this.cart = this.cart.filter(item => item.id !== dish.id);
  }

  getTotal() {
    return this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  placeOrder() {
    const orderData = {
      restaurant: this.restaurant.id,
      items: this.cart.map(item => ({ dish: item.id, quantity: item.quantity }))
    };
    this.orderService.createOrder(orderData).subscribe({
      next: () => {
        this.orderSuccess = true;
        this.cart = [];
      },
      error: () => alert('Ошибка при создании заказа')
    });
  }
}