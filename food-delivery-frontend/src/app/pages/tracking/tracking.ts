// src/app/pages/tracking/tracking.ts
import { Component, OnInit, OnDestroy, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface TrackingEvent {
  time: string;
  message: string;
  icon: string;
  type: 'normal' | 'warning' | 'success' | 'error';
}

const COURIERS = [
  { name: 'Асан Б.', rating: 4.9, vehicle: '🛵', trips: 1240, phone: '+7 701 234 5678' },
  { name: 'Дамир К.', rating: 4.7, vehicle: '🚴', trips: 890, phone: '+7 702 345 6789' },
  { name: 'Нурлан С.', rating: 4.8, vehicle: '🛵', trips: 2100, phone: '+7 705 456 7890' },
  { name: 'Бекзат А.', rating: 4.6, vehicle: '🚗', trips: 560, phone: '+7 707 567 8901' },
  { name: 'Ерлан М.', rating: 4.9, vehicle: '🛵', trips: 3400, phone: '+7 708 678 9012' },
];

// Маршрут по улицам Алматы
const ROUTE_POINTS: [number, number][] = [
  [43.2380, 76.8890],
  [43.2365, 76.8940],
  [43.2350, 76.8990],
  [43.2335, 76.9020],
  [43.2315, 76.9050],
  [43.2295, 76.9075],
  [43.2270, 76.9100],
  [43.2250, 76.9120],
  [43.2235, 76.9135],
  [43.2220, 76.9150],
];

@Component({
  selector: 'app-tracking',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './tracking.html',
  styleUrl: './tracking.css'
})
export class TrackingComponent implements OnInit, AfterViewInit, OnDestroy {
  orderId = 0;
  orderTotal = 0;
  restaurantName = '';

  status: 'searching' | 'confirmed' | 'cooking' | 'courier_found' |
    'courier_declined' | 'on_the_way' | 'delayed' | 'delivered' | 'cancelled' = 'searching';

  courier: any = null;
  events: TrackingEvent[] = [];
  timeLeft = 1800; // 30 минут
  estimatedMinutes = 30;
  canCancel = true;
  showCancelConfirm = false;
  showMap = false;
  ratingGiven = 0;

  private map: any = null;
  private courierMarker: any = null;
  private routeIndex = 0;
  private timers: any[] = [];
  private countdownTimer: any = null;

  constructor(
    private router: Router,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras?.state as any;
    if (state) {
      this.orderId = state.orderId || 0;
      this.orderTotal = state.total || 0;
      this.restaurantName = state.restaurantName || 'Ресторан';
    }
  }

  ngOnInit() {
    this.addEvent('🔍', 'Тапсырыс қабылданды, курьер іздеуде...', 'normal');
    this.startScenario();
    this.startCountdown();
  }

  ngAfterViewInit() {}

  ngOnDestroy() {
    this.timers.forEach(t => clearTimeout(t));
    clearInterval(this.countdownTimer);
    if (this.map) {
      try { this.map.remove(); } catch (e) {}
      this.map = null;
    }
  }

  private after(ms: number, fn: () => void) {
    const t = setTimeout(() => { fn(); this.cdr.detectChanges(); }, ms);
    this.timers.push(t);
  }

  private startScenario() {
    // 2 сек — ресторан подтвердил
    this.after(2000, () => {
      this.status = 'confirmed';
      this.addEvent('✅', 'Ресторан тапсырысты растады', 'success');
    });

    // 5 сек — ищем курьера
    this.after(5000, () => {
      this.addEvent('🔍', 'Жақын маңдағы курьерлер іздеуде...', 'normal');

      // 25% шанс отказа
      const declines = Math.random() < 0.25;
      if (declines) {
        this.after(3000, () => {
          const c = COURIERS[Math.floor(Math.random() * COURIERS.length)];
          this.status = 'courier_declined';
          this.addEvent('❌', `Курьер ${c.name} бас тартты. Жаңа курьер іздеуде...`, 'error');
          this.after(4000, () => this.assignCourier());
        });
      } else {
        this.after(3000, () => this.assignCourier());
      }
    });
  }

  private assignCourier() {
    const c = COURIERS[Math.floor(Math.random() * COURIERS.length)];
    this.courier = c;
    this.status = 'courier_found';
    this.addEvent('🛵', `Курьер табылды: ${c.name} ⭐${c.rating} • ${c.trips} жеткізу`, 'success');
    this.showMap = true;

    // Инициализируем карту через 500мс
    this.after(500, () => this.initMap());

    // 5 сек — начинает готовиться
    this.after(5000, () => {
      this.status = 'cooking';
      this.canCancel = false;
      this.addEvent('👨‍🍳', `${this.restaurantName || 'Ресторан'} тағамды дайындауда...`, 'normal');
    });

    // 12 сек — курьер выехал
    this.after(12000, () => {
      this.status = 'on_the_way';
      this.addEvent('🛵', `${c.vehicle} ${c.name} сізге қарай жолда!`, 'success');
      this.startMoveCourier();

      // 20% шанс задержки
      if (Math.random() < 0.2) {
        this.after(6000, () => {
          this.status = 'delayed';
          this.estimatedMinutes += 10;
          this.timeLeft += 600;
          this.addEvent('⚠️', 'Жол кептелісі! Жеткізу +10 мин кешігеді. Кешірім сұраймыз.', 'warning');
          this.after(4000, () => {
            this.status = 'on_the_way';
            this.addEvent('🛵', 'Курьер кептелістен өтті, жылдамдады!', 'normal');
          });
        });
      }
    });

    // 25 сек — доставлен
    this.after(25000, () => {
      this.status = 'delivered';
      this.canCancel = false;
      this.timeLeft = 0;
      clearInterval(this.countdownTimer);
      this.addEvent('🎉', 'Тапсырысыңыз жеткізілді! Дәмді болсын!', 'success');
      this.courierMarker?.setLatLng(ROUTE_POINTS[ROUTE_POINTS.length - 1]);
      this.updateOrderStatus('delivered');
    });
  }

  private async initMap() {
    const mapEl = document.getElementById('delivery-map');
    if (!mapEl || this.map) return;

    try {
      const L = await import('leaflet');

      this.map = L.map('delivery-map', { zoomControl: true })
        .setView([43.2300, 76.9020], 14);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap'
      }).addTo(this.map);

      const makeIcon = (emoji: string) => L.divIcon({
        html: `<div style="font-size:26px;filter:drop-shadow(0 2px 4px rgba(0,0,0,0.3))">${emoji}</div>`,
        className: '',
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      });

      // Ресторан
      L.marker(ROUTE_POINTS[0], { icon: makeIcon('🍽️') })
        .addTo(this.map)
        .bindPopup(`<b>${this.restaurantName || 'Ресторан'}</b><br>Тапсырыс дайындалуда`);

      // Клиент
      L.marker(ROUTE_POINTS[ROUTE_POINTS.length - 1], { icon: makeIcon('🏠') })
        .addTo(this.map)
        .bindPopup('<b>Сіздің мекенжайыңыз</b>');

      // Маршрут
      L.polyline(ROUTE_POINTS, {
        color: '#00A082',
        weight: 5,
        opacity: 0.8,
        dashArray: '10, 6'
      }).addTo(this.map);

      // Курьер
      this.courierMarker = L.marker(ROUTE_POINTS[0], {
        icon: makeIcon(this.courier?.vehicle || '🛵')
      }).addTo(this.map)
        .bindPopup(`<b>${this.courier?.name}</b><br>Жолда`);

      const bounds = L.latLngBounds(ROUTE_POINTS);
      this.map.fitBounds(bounds, { padding: [40, 40] });

    } catch (e) {
      console.log('Map error:', e);
    }
  }

  private startMoveCourier() {
    const move = () => {
      if (this.routeIndex < ROUTE_POINTS.length - 1 &&
          (this.status === 'on_the_way' || this.status === 'delayed')) {
        this.routeIndex++;
        this.courierMarker?.setLatLng(ROUTE_POINTS[this.routeIndex]);
        this.map?.panTo(ROUTE_POINTS[this.routeIndex], { animate: true, duration: 1 });
        const t = setTimeout(move, 2200);
        this.timers.push(t);
      }
    };
    const t = setTimeout(move, 500);
    this.timers.push(t);
  }

  private startCountdown() {
    this.countdownTimer = setInterval(() => {
      if (this.timeLeft > 0 && this.status !== 'delivered' && this.status !== 'cancelled') {
        this.timeLeft--;
        this.cdr.detectChanges();
      } else if (this.status === 'delivered' || this.status === 'cancelled') {
        clearInterval(this.countdownTimer);
      }
    }, 1000);
  }

  private updateOrderStatus(status: string) {
    if (!this.orderId) return;
    this.http.patch(`http://127.0.0.1:8000/api/orders/${this.orderId}/`, { status })
      .subscribe({ error: () => {} });
  }

  confirmCancel() { this.showCancelConfirm = true; }

  doCancel() {
    this.showCancelConfirm = false;
    this.status = 'cancelled';
    this.canCancel = false;
    this.timers.forEach(t => clearTimeout(t));
    clearInterval(this.countdownTimer);
    this.addEvent('❌', 'Тапсырыс сіз тарапыңыздан бас тартылды', 'error');
    this.updateOrderStatus('cancelled');
    this.cdr.detectChanges();
  }

  giveRating(stars: number) {
    this.ratingGiven = stars;
    this.addEvent('⭐', `Курьерге ${stars} жұлдыз берілді. Рахмет!`, 'success');
  }

  getTimeFormatted(): string {
    const m = Math.floor(this.timeLeft / 60);
    const s = this.timeLeft % 60;
    return `${m} мин ${s.toString().padStart(2, '0')} сек`;
  }

  getStatusText(): string {
    const map: Record<string, string> = {
      searching: '🔍 Курьер іздеуде...',
      confirmed: '✅ Тапсырыс расталды',
      cooking: '👨‍🍳 Дайындалуда',
      courier_found: '🛵 Курьер тағайындалды',
      courier_declined: '🔄 Жаңа курьер іздеуде...',
      on_the_way: '🛵 Курьер жолда',
      delayed: '⚠️ Кешігу бар',
      delivered: '🎉 Жеткізілді!',
      cancelled: '❌ Бас тартылды',
    };
    return map[this.status] || '';
  }

  getProgress(): number {
    const map: Record<string, number> = {
      searching: 10, confirmed: 25, cooking: 50,
      courier_found: 55, courier_declined: 30,
      on_the_way: 80, delayed: 75,
      delivered: 100, cancelled: 0,
    };
    return map[this.status] || 0;
  }

  addEvent(icon: string, message: string, type: TrackingEvent['type']) {
    const now = new Date();
    const time = `${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}:${now.getSeconds().toString().padStart(2,'0')}`;
    this.events.unshift({ icon, message, time, type });
  }
}