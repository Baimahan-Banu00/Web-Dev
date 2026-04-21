// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { HomeComponent } from './pages/home/home';
import { RestaurantsComponent } from './pages/restaurants/restaurants';
import { RestaurantDetailComponent } from './pages/restaurant-detail/restaurant-detail';
import { OrdersComponent } from './pages/orders/orders';
import { PaymentComponent } from './pages/payment/payment';
import { TrackingComponent } from './pages/tracking/tracking';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'restaurants', component: RestaurantsComponent },
  { path: 'restaurants/:id', component: RestaurantDetailComponent },
  { path: 'orders', component: OrdersComponent, canActivate: [authGuard] },
  { path: 'payment', component: PaymentComponent },
  { path: 'tracking', component: TrackingComponent },
];