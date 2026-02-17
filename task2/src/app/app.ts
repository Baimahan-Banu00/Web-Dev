import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from './model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {

  products: Product[] = [
    {
      id: 1,
      name: 'iPhone 15 Pro 128GB',
      description: 'Equipped with the new A17 Pro chip. Powerful camera and high performance.',
      price: 677900,
      rating: 4.8,
      image: 'assets/images/iphone.jpg',
      images: [
        'assets/images/iphone.jpg'
      ],
      
     link: 'https://l.kaspi.kz/shop/BBwy8Xkq1ZeyL9B'
    },
    {
      id: 2,
      name: 'Samsung Galaxy S24',
      description: 'New Snapdragon processor. High-quality AMOLED display.',
      price: 716606,
      rating: 4.7,
      image: 'assets/images/sums.jpg',
      images: [
        'assets/images/sums.jpg'
      ],
      link: 'https://l.kaspi.kz/shop/41AhkNSK7rp2gwQ'
    },
    {
      id: 3,
      name: 'MacBook Air 15',
      description: 'Lightweight and powerful laptop. Long battery life.',
      price: 939990,
      rating: 4.9,
      image: 'assets/images/mack2.jpg',
      images: [
        'assets/images/mack2.jpg'
      ],
      link: 'https://l.kaspi.kz/shop/5wLjt9VuvntV33m'
    },
    {
      id: 4,
      name: 'Xiaomi 13T Pro',
      description: 'With a Leica camera. High performance.',
      price: 399990,
      rating: 4.6,
      image: 'assets/images/xi.jpg',
      images: [
        'assets/images/xi.jpg'
      ],
      link: 'https://l.kaspi.kz/shop/Hq6k7qL2qmuFZry'
    },
    {
      id: 5,
      name: 'PlayStation 5',
      description: 'Next-generation gaming console. 4K graphics.',
      price: 282769,
      rating: 4.9,
      image: 'assets/images/pp.jpg',
      images: [
        'assets/images/pp.jpg'
      ],
      link: 'https://l.kaspi.kz/shop/2jrPKWGkS7mVfdz'
     
    },
    {
      id: 6,
      name: 'Apple Watch Series 9',
      description: 'Health tracking and style.',
      price: 249990,
      rating: 4.7,
      image: 'assets/images/watch.jpg',
      images: [
        'assets/images/watch.jpg'
      ],
      link: 'https://l.kaspi.kz/shop/6Q7MU8CxxBzNPfw'
     
    },
    {
      id: 7,
      name: 'Dyson Airwrap',
      description: 'Quick and safe hair styling.',
      price: 459990,
      rating: 4.8,
      image: 'assets/images/dd.jpg',
      images: [
        'assets/images/dd.jpg'
      ],
      link: 'https://l.kaspi.kz/shop/A9KiABRCztRQ3aK'
    },
    {
      id: 8,
      name: 'LG OLED TV 55"',
      description: 'OLED technology. Amazing color quality.',
      price: 1699990,
      rating: 4.9,
      image: 'assets/images/lg.jpg',
      images: [
        'assets/images/lg.jpg'
      ],
       link: 'https://l.kaspi.kz/shop/9YszZxvMQ1aVekC'
      
    },
    {
      id: 9,
      name: 'Lenovo Legion 5',
      description: 'Gaming laptop. RTX graphics card.',
      price: 549000,
      rating: 4.7,
      image: 'assets/images/lenova.jpg',
      images: [
        'assets/images/lenova.jpg'
      ],
      link: 'https://l.kaspi.kz/shop/H2Cji9rKSD6VWpT'
      
    },
    {
      id: 10,
      name: 'JBL Charge 5',
      description: 'Powerful Bluetooth speaker.',
      price: 70498,
      rating: 4.6,
      image: 'assets/images/jbl.jpg',
      images: [
        'assets/images/jbl.jpg'
      ],
      link: 'https://l.kaspi.kz/shop/3Ah2aXFk2fFc2i8'
      
    }
  ];

  shareWhatsApp(link: string) {
    const url = `https://wa.me/?text=${encodeURIComponent(link)}`;
    window.open(url, '_blank');
  }

  shareTelegram(link: string, name: string) {
    const url = `https://t.me/share/url?url=${encodeURIComponent(link)}&text=${encodeURIComponent(name)}`;
    window.open(url, '_blank');
  }
}


  