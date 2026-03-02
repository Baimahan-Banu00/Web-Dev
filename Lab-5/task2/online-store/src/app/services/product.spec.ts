/*import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {

  categories: Category[] = [
    { id: 1, name: 'Smartphones' },
    { id: 2, name: 'Laptops' },
    { id: 3, name: 'Headphones' },
    { id: 4, name: 'Tablets' }
  ];

  products: Product[] = [
    { id:1,name:'iPhone 15',description:'Apple phone',price:650000,rating:4.8,image:'assets/images/iphone.jpg',link:'https://kaspi.kz',likes:0,categoryId:1},
    { id:2,name:'Samsung S23',description:'Samsung phone',price:450000,rating:4.7,image:'assets/images/s23.jpg',link:'https://kaspi.kz',likes:0,categoryId:1},
    { id:3,name:'Xiaomi 13',description:'Xiaomi phone',price:300000,rating:4.6,image:'assets/images/xiaomi.jpg',link:'https://kaspi.kz',likes:0,categoryId:1},
    { id:4,name:'Pixel 8',description:'Google phone',price:400000,rating:4.7,image:'assets/images/pixel.jpg',link:'https://kaspi.kz',likes:0,categoryId:1},
    { id:5,name:'Huawei P60',description:'Huawei phone',price:350000,rating:4.5,image:'assets/images/huawei.jpg',link:'https://kaspi.kz',likes:0,categoryId:1},

    { id:6,name:'MacBook Air',description:'Apple laptop',price:800000,rating:4.9,image:'assets/images/mac.jpg',link:'https://kaspi.kz',likes:0,categoryId:2},
    { id:7,name:'Dell XPS',description:'Dell laptop',price:700000,rating:4.7,image:'assets/images/dell.jpg',link:'https://kaspi.kz',likes:0,categoryId:2},
    { id:8,name:'HP Spectre',description:'HP laptop',price:600000,rating:4.6,image:'assets/images/hp.jpg',link:'https://kaspi.kz',likes:0,categoryId:2},
    { id:9,name:'Lenovo Yoga',description:'Lenovo laptop',price:550000,rating:4.5,image:'assets/images/lenova.jpg',link:'https://kaspi.kz',likes:0,categoryId:2},
    { id:10,name:'Asus Zenbook',description:'Asus laptop',price:500000,rating:4.6,image:'assets/images/asus.jpg',link:'https://kaspi.kz',likes:0,categoryId:2},

    { id:11,name:'AirPods Pro',description:'Apple earbuds',price:120000,rating:4.8,image:'assets/images/airpods.jpg',link:'https://kaspi.kz',likes:0,categoryId:3},
    { id:12,name:'Sony WH1000',description:'Sony headphones',price:150000,rating:4.7,image:'assets/images/sony.jpg',link:'https://kaspi.kz',likes:0,categoryId:3},
    { id:13,name:'JBL Tune',description:'JBL headphones',price:60000,rating:4.5,image:'assets/images/jbl.jpg',link:'https://kaspi.kz',likes:0,categoryId:3},
    { id:14,name:'Beats Studio',description:'Beats headphones',price:130000,rating:4.6,image:'assets/images/beats.jpg',link:'https://kaspi.kz',likes:0,categoryId:3},
    { id:15,name:'Marshall Major',description:'Marshall headphones',price:90000,rating:4.6,image:'assets/images/marshall.jpg',link:'https://kaspi.kz',likes:0,categoryId:3},

    { id:16,name:'iPad Pro',description:'Apple tablet',price:600000,rating:4.8,image:'assets/images/ipad.jpg',link:'https://kaspi.kz',likes:0,categoryId:4},
    { id:17,name:'Samsung Tab S9',description:'Samsung tablet',price:400000,rating:4.7,image:'assets/images/tab.jpg',link:'https://kaspi.kz',likes:0,categoryId:4},
    { id:18,name:'Huawei MatePad',description:'Huawei tablet',price:250000,rating:4.5,image:'assets/images/matepad.jpg',link:'https://kaspi.kz',likes:0,categoryId:4},
    { id:19,name:'Lenovo Tab',description:'Lenovo tablet',price:200000,rating:4.4,image:'assets/images/tablenovo.jpg',link:'https://kaspi.kz',likes:0,categoryId:4},
    { id:20,name:'Xiaomi Pad',description:'Xiaomi tablet',price:220000,rating:4.5,image:'assets/images/xpad.jpg',link:'https://kaspi.kz',likes:0,categoryId:4},
  ];

  getCategories(){ return this.categories; }

  getProductsByCategory(id:number){
    return this.products.filter(p=>p.categoryId===id);
  }
}*/
