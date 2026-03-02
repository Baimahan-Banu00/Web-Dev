import { Component } from '@angular/core';
import { ProductService } from './services/product'; 
import { Category } from './models/category.model';
import { Product } from './models/product.model';
import { ProductListComponent } from './components/product-list/product-list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProductListComponent],
  templateUrl: './app.component.html',  
  styleUrls: ['./app.css']
})
export class AppComponent {
  categories: Category[] = [];
  products: Product[] = [];
  selectedCategory?: Category;

  constructor(private service: ProductService) {
    this.categories = this.service.getCategories();
  }

  selectCategory(category: Category) {
    this.selectedCategory = category;
    this.products = this.service.getProductsByCategory(category.id);
  }
}
  
