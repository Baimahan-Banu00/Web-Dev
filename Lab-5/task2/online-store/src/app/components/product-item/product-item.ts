import { Component, input, output } from '@angular/core';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-item',
  standalone: true,
  templateUrl: './product-item.html',
  styleUrls: ['./product-item.css']
})
export class ProductItemComponent {
  product = input.required<Product>();
  delete = output<number>();

  like() {
    this.product().likes++;
  }

  remove() {
    // confirmation dialog қосылды
    if (confirm("Are you sure you want to delete this product?")) {
      this.delete.emit(this.product().id);
    }
  }

  share() {
    window.open(`https://wa.me/?text=${this.product().link}`);
  }
}