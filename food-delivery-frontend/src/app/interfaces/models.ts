// src/app/interfaces/models.ts

export interface Category {
  id: number;
  name: string;
}

export interface Restaurant {
  id: number;
  name: string;
  description: string;
  address: string;
  image: string | null;
  category: number | string | null;
  rating?: number;
  reviews?: number;
  deliveryTime?: string;
  deliveryFee?: string;
  tags?: string[];
}

export interface Dish {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string | null;
  is_available: boolean;
  restaurant: number;
}

export interface CartItem extends Dish {
  quantity: number;
}

export interface OrderItem {
  id: number;
  dish: number;
  dish_name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: number;
  restaurant: number;
  restaurant_name?: string;
  items: OrderItem[];
  status: 'pending' | 'confirmed' | 'cooking' | 'delivery' | 'delivered' | 'cancelled';
  total_price: number;
  created_at: string;
}

export interface LoginResponse {
  token: string;
}

export interface RegisterResponse {
  token: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
}