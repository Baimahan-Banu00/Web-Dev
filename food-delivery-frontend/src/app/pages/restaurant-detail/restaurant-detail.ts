// src/app/pages/restaurant-detail/restaurant-detail.ts
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Dish, CartItem } from '../../interfaces/models';
import { MOCK_RESTAURANTS, MOCK_DISHES, Restaurant } from '../../data/mockdata';
import { AuthModalComponent } from '../../auth-modal/auth-modal';
import { OrderService } from '../../services/order';

@Component({
  selector: 'app-restaurant-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, DecimalPipe, AuthModalComponent],
  templateUrl: './restaurant-detail.html',
  styleUrl: './restaurant-detail.css'
})
export class RestaurantDetailComponent implements OnInit {
  restaurant: Restaurant | null = null;
  dishes: Dish[] = [];
  cart: CartItem[] = [];
  loading = true;
  orderLoading = false;
  orderError = '';
  cartOpen = false;
  showAuthModal = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const mock = MOCK_RESTAURANTS.find((r: Restaurant) => r.id === id);
    if (mock) {
      this.restaurant = mock;
      this.dishes = MOCK_DISHES[id] || [];
    }
    this.loading = false;
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  addToCart(dish: Dish) {
    const existing = this.cart.find(item => item.id === dish.id);
    if (existing) {
      existing.quantity++;
    } else {
      this.cart.push({ ...dish, quantity: 1 });
    }
    this.cartOpen = true;
    this.cdr.detectChanges();
  }

  decreaseQty(dish: Dish) {
    const idx = this.cart.findIndex(item => item.id === dish.id);
    if (idx === -1) return;
    if (this.cart[idx].quantity <= 1) {
      this.cart.splice(idx, 1);
    } else {
      this.cart[idx].quantity--;
    }
    this.cdr.detectChanges();
  }

  getCartItem(dish: Dish): CartItem | undefined {
    return this.cart.find(item => item.id === dish.id);
  }

  clearCart() {
    this.cart = [];
    this.cdr.detectChanges();
  }

  getTotal(): number {
    return this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  getTotalCount(): number {
    return this.cart.reduce((sum, item) => sum + item.quantity, 0);
  }

  toggleCart() { this.cartOpen = !this.cartOpen; }

  placeOrder() {
    if (!this.restaurant || this.cart.length === 0) return;
    if (!this.isLoggedIn()) {
      this.showAuthModal = true;
      return;
    }
    this.sendOrder();
  }

  onAuthSuccess() {
    this.showAuthModal = false;
    this.sendOrder();
  }

  onAuthClosed() {
    this.showAuthModal = false;
  }

  private sendOrder() {
    if (!this.restaurant) return;
    this.orderLoading = true;
    this.orderError = '';
    this.cdr.detectChanges();

    const total = this.getTotal();
    const orderData = {
      restaurant: this.restaurant.id,
      restaurant_name: this.restaurant.name,
      total_price: total,
      items_input: this.cart.map(item => ({
        dish: item.id,
        dish_name: item.name,
        quantity: item.quantity,
        price: item.price
      }))
    };

    this.orderService.createOrder(orderData).subscribe({
      next: (res: any) => {
        this.orderLoading = false;
        const cartCopy = [...this.cart];
        this.cart = [];
        this.cartOpen = false;
        this.cdr.detectChanges();
        this.router.navigate(['/payment'], {
          state: {
            total: total,
            orderId: res.id || 0,
            restaurantName: this.restaurant?.name || ''
          }
        });
      },
      error: () => {
        this.orderError = 'Тапсырыс жіберілмеді. Қайталап көріңіз.';
        this.orderLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  getRestaurantImage(): string {
    return this.restaurant?.image ||
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80';
  }

  getDishImage(dish: Dish): string {
    return dish.image ||
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80';
  }

  getRating(): number { return (this.restaurant as any)?.rating || 95; }
  getDeliveryTime(): string { return (this.restaurant as any)?.deliveryTime || '30-40 мин'; }
  getDeliveryFee(): string { return (this.restaurant as any)?.deliveryFee || '299 ₸'; }
  isFree(): boolean { return this.getDeliveryFee() === 'Тегін'; }
}