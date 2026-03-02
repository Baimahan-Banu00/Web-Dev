import { Component, input, signal, effect } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductItemComponent } from '../product-item/product-item';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductItemComponent],
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.css']
})
export class ProductListComponent {

  productsInput = input.required<Product[]>();
  products = signal<Product[]>([]);

  constructor(){
    effect(()=>{
      this.products.set(this.productsInput());
    });
  }

  deleteProduct(id:number){
    this.products.set(this.products().filter(p=>p.id!==id));
  }
}