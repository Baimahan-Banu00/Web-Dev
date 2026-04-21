// src/app/pages/payment/payment.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './payment.html',
  styleUrl: './payment.css'
})
export class PaymentComponent {
  cardNumber = '';
  cardName = '';
  cardExpiry = '';
  cardCvv = '';
  loading = false;
  success = false;
  error = '';

  orderTotal = 0;
  orderId = 0;
  restaurantName = '';

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras?.state as any;
    if (state) {
      this.orderTotal = state.total || 0;
      this.orderId = state.orderId || 0;
      this.restaurantName = state.restaurantName || '';
    }
  }

  formatCardNumber() {
    let val = this.cardNumber.replace(/\D/g, '').substring(0, 16);
    this.cardNumber = val.replace(/(.{4})/g, '$1 ').trim();
  }

  formatExpiry() {
    let val = this.cardExpiry.replace(/\D/g, '').substring(0, 4);
    if (val.length >= 2) {
      val = val.substring(0, 2) + '/' + val.substring(2);
    }
    this.cardExpiry = val;
  }

  getCardType(): string {
    const num = this.cardNumber.replace(/\s/g, '');
    if (num.startsWith('4')) return 'visa';
    if (num.startsWith('5')) return 'mastercard';
    return '';
  }

  onPay() {
    if (!this.cardNumber || !this.cardName || !this.cardExpiry || !this.cardCvv) {
      this.error = 'Барлық өрістерді толтырыңыз';
      return;
    }
    if (this.cardNumber.replace(/\s/g, '').length < 16) {
      this.error = 'Карта нөмірін дұрыс енгізіңіз';
      return;
    }
    if (this.cardCvv.length < 3) {
      this.error = 'CVV дұрыс емес';
      return;
    }

    this.error = '';
    this.loading = true;

    setTimeout(() => {
      this.loading = false;
      this.router.navigate(['/tracking'], {
        state: {
          orderId: this.orderId,
          total: this.orderTotal,
          restaurantName: this.restaurantName
        }
      });
    }, 2000);
  }

  goHome() {
    this.router.navigate(['/restaurants']);
  }

  goOrders() {
    this.router.navigate(['/orders']);
  }
}