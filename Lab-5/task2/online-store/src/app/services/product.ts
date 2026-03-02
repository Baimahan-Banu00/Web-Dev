import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {

  categories: Category[] = [
    { id: 1, name: 'Smartphones' },
    { id: 2, name: 'Laptops' },
    { id: 3, name: 'Headphones' },
    { id: 4, name: 'Tablets' },
    { id: 5, name: 'Cosmetics'},
    { id: 6, name: 'Banu'}
  ];

  products: Product[] = [
    { id:1,name:'iPhone 15 Pro',description:'Apple phone',price:699989,rating:5.0,image:'assets/images/iphone.jpg',link:'https://l.kaspi.kz/shop/48rMULApCYv4Hni',likes:0,categoryId:1},
    { id:2,name:'Samsung S23',description:'Samsung phone',price:494996,rating:4.7,image:'assets/images/sums.jpg',link:'https://l.kaspi.kz/shop/m5Pz8xMyGQqKbm2',likes:0,categoryId:1},
    { id:3,name:'Xiaomi 13',description:'Xiaomi phone',price:574500,rating:4.6,image:'assets/images/xi.jpg',link:'https://l.kaspi.kz/shop/7ijC8iyoQR3Duuk',likes:0,categoryId:1},
    { id:4,name:'Pixel 8',description:'Google phone',price:309900,rating:4.7,image:'assets/images/pix.jpg',link:'https://l.kaspi.kz/shop/6ThCpbaSaipoDD8',likes:0,categoryId:1},
    { id:5,name:'Huawei P60',description:'Huawei phone',price:250000,rating:4.5,image:'assets/images/hua.jpg',link:'https://l.kaspi.kz/shop/9kLr8y1aNsdqaRg',likes:0,categoryId:1},

    { id:6,name:'MacBook Air',description:'Apple laptop',price:524333,rating:4.9,image:'assets/images/mac.jpg',link:'https://l.kaspi.kz/shop/DWCVwazJDW9MnWB',likes:0,categoryId:2},
    { id:7,name:'Dell XPS',description:'Dell laptop',price:899990,rating:4.7,image:'assets/images/dell.jpg',link:'https://l.kaspi.kz/shop/Drb5qvcL97QALFY',likes:0,categoryId:2},
    { id:8,name:'HP Spectre',description:'HP laptop',price:1299970,rating:4.6,image:'assets/images/spec.jpg',link:'https://l.kaspi.kz/shop/YefZ4vZTDWziLwQ',likes:0,categoryId:2},
    { id:9,name:'Lenovo Yoga',description:'Lenovo laptop',price:550000,rating:4.5,image:'assets/images/lenova.jpg',link:'https://l.kaspi.kz/shop/HeURRDqW5m4Yaob',likes:0,categoryId:2},
    { id:10,name:'Asus Zenbook',description:'Asus laptop',price:500000,rating:4.6,image:'assets/images/zen.jpg',link:'https://l.kaspi.kz/shop/A3MuqrkAZQKbCsH',likes:0,categoryId:2},

    { id:11,name:'AirPods Pro',description:'Apple earbuds',price:120000,rating:4.8,image:'assets/images/air.jpg',link:'https://l.kaspi.kz/shop/9M1AnwWNaPHnYp1',likes:0,categoryId:3},
    { id:12,name:'Sony WH1000',description:'Sony headphones',price:150000,rating:4.7,image:'assets/images/sm.jpg',link:'https://l.kaspi.kz/shop/8HGPu414Zwzt42c',likes:0,categoryId:3},
    { id:13,name:'JBL Tune',description:'JBL headphones',price:60000,rating:4.5,image:'assets/images/jbl.jpg',link:'https://l.kaspi.kz/shop/3Ah2aXFk2fFc2i8',likes:0,categoryId:3},
    { id:14,name:'Beats Studio',description:'Beats headphones',price:130000,rating:4.6,image:'assets/images/re.jpg',link:'https://l.kaspi.kz/shop/jgGuiMdrCFHCgUh',likes:0,categoryId:3},
    { id:15,name:'Marshall Major',description:'Marshall headphones',price:90000,rating:4.6,image:'assets/images/var.jpg',link:'https://l.kaspi.kz/shop/F1gJhfm8U3GAefs',likes:0,categoryId:3},

    { id:16,name:'iPad Pro',description:'Apple tablet',price:600000,rating:4.8,image:'assets/images/pro.jpg',link:'https://l.kaspi.kz/shop/DaWiDhXzB5mvc6a',likes:0,categoryId:4},
    { id:17,name:'Samsung Tab S9',description:'Samsung tablet',price:400000,rating:4.7,image:'assets/images/aa.jpg',link:'https://l.kaspi.kz/shop/GeY5eMFHg1MYFTA',likes:0,categoryId:4},
    { id:18,name:'Huawei MatePad',description:'Huawei tablet',price:250000,rating:4.5,image:'assets/images/meta.jpg',link:'https://l.kaspi.kz/shop/5ey357b1rTzsVDD',likes:0,categoryId:4},
    { id:19,name:'Lenovo Tab',description:'Lenovo tablet',price:200000,rating:4.4,image:'assets/images/lee.jpg',link:'https://l.kaspi.kz/shop/4xdiQW7t9311qXc',likes:0,categoryId:4},
    { id:20,name:'Xiaomi Pad',description:'Xiaomi tablet',price:220000,rating:4.5,image:'assets/images/oma.jpg',link:'https://l.kaspi.kz/shop/2xgxkTY1Hz6kTKC',likes:0,categoryId:4},

    { id:21,name:'Sky High Mascara',description:'Lengthening mascara',price:7000,rating:4.8,image:'assets/images/high.jpg',link:'https://l.kaspi.kz/shop/9NL2WJb4k4T4UiN',likes:0,categoryId:5},
    { id:22,name:'Fit Me Foundation',description:'Liquid foundation',price:6500,rating:4.7,image:'assets/images/me.jpg',link:'https://l.kaspi.kz/shop/6XdjZtqh6BYN3cs',likes:0,categoryId:5},
    { id:23,name:'Matte Ink Lipstick',description:'Long lasting lipstick',price:6000,rating:4.6,image:'assets/images/ee.jpg',link:'https://l.kaspi.kz/shop/EBdoraRgTMEwdq6',likes:0,categoryId:5},
    { id:24,name:'Nude Beauty Palette',description:'Eyeshadow palette',price:15000,rating:4.9,image:'assets/images/nude.jpg',link:'https://l.kaspi.kz/shop/3idPpkwGyP1hASV',likes:0,categoryId:5},
    { id:25,name:'Rare Beauty Blush',description:'Liquid blush',price:12000,rating:4.8,image:'assets/images/rera.jpg',link:'https://l.kaspi.kz/shop/Gtxq1qpwyJ3purL',likes:0,categoryId:5}


    {
   id: 26,
   name: 'Banu wow',
   description: 'aaaaaaaa',
   price: 12300,
   rating: 4.8,
   image: 'assets/images/aa.jpg',
   categoryId: 1
}
  ];

  getCategories(){ return this.categories; }

  getProductsByCategory(id:number){
    return this.products.filter(p=>p.categoryId===id);
  }
}
