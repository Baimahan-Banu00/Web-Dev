import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent {
  address = '';
  isLoggedIn = !!localStorage.getItem('token');

  constructor(private router: Router) {}

  goToRestaurants() {
    this.router.navigate(['/restaurants']);
  }

  logout() {
    localStorage.removeItem('token');
    this.isLoggedIn = false;
    this.router.navigate(['/']);
  }
}