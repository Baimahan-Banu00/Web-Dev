import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  title = 'food-delivery-frontend';
}
export const environment = {
  production: false,
  apiUrl: 'http://127.0.0.1:8000/api' // Убедись, что порт 8000
};