// src/app/data/mockdata.ts

export interface Restaurant {
  id: number;
  name: string;
  description: string;
  address: string;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  deliveryTime: string;
  deliveryFee: string;
  tags: string[];
}

export interface Dish {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  is_available: boolean;
  restaurant: number;
}

export const MOCK_RESTAURANTS: Restaurant[] = [
  {
    id: 7,
    name: 'Баханди',
    description: 'Лучшие бургеры в Алматы',
    address: 'Алматы, ул. Байзакова 280',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80',
    category: 'fastfood',
    rating: 96, reviews: 286, deliveryTime: '25-35 мин', deliveryFee: 'Тегін',
    tags: ['Бургер', 'Фастфуд']
  },
  {
    id: 8,
    name: 'Салам Бро',
    description: 'Халал фастфуд',
    address: 'Алматы, ул. Абая 10',
    image: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=600&q=80',
    category: 'fastfood',
    rating: 95, reviews: 500, deliveryTime: '20-30 мин', deliveryFee: 'Тегін',
    tags: ['Бургер', 'Фастфуд']
  },
  {
    id: 9,
    name: 'Додо Пицца',
    description: 'Пицца как в Италии',
    address: 'Алматы, ул. Достык 5',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&q=80',
    category: 'fastfood',
    rating: 95, reviews: 10, deliveryTime: '30-40 мин', deliveryFee: 'Тегін',
    tags: ['Пицца', 'Фастфуд']
  },
  {
    id: 1,
    name: 'Донер на Сатпаева',
    description: 'Вкусный донер и шаурма',
    address: 'Алматы, ул. Сатпаева 30',
    image: 'https://images.unsplash.com/photo-1542528180-1c2803fa048c?w=600&q=80',
    category: 'fastfood',
    rating: 97, reviews: 430, deliveryTime: '25-35 мин', deliveryFee: 'Тегін',
    tags: ['Донер', 'Фастфуд']
  },
  {
    id: 10,
    name: 'Суши',
    description: 'Японская кухня и суши',
    address: 'Алматы, ул. Толе би 15',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600&q=80',
    category: 'asian',
    rating: 98, reviews: 500, deliveryTime: '35-45 мин', deliveryFee: '299 ₸',
    tags: ['Суши', 'Азиялық']
  },
  {
    id: 11,
    name: 'Абая Донер',
    description: 'Донер және қазақ тағамы',
    address: 'Алматы, ул. Абая 50',
    image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=600&q=80',
    category: 'asian',
    rating: 97, reviews: 215, deliveryTime: '40-50 мин', deliveryFee: '199 ₸',
    tags: ['Қазақша', 'Азиялық']
  },
  {
    id: 12,
    name: 'Центр Шашлык',
    description: 'Мангал и шашлык',
    address: 'Алматы, ул. Панфилова 20',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80',
    category: 'asian',
    rating: 96, reviews: 180, deliveryTime: '45-55 мин', deliveryFee: '199 ₸',
    tags: ['Шашлық', 'Ет']
  },
  {
    id: 13,
    name: 'Дегирмен',
    description: 'Турецкая кухня',
    address: 'Алматы, ул. Момышулы 5',
    image: 'https://images.unsplash.com/photo-1542528180-1c2803fa048c?w=600&q=80',
    category: 'asian',
    rating: 98, reviews: 340, deliveryTime: '35-45 мин', deliveryFee: '199 ₸',
    tags: ['Донер', 'Азиялық']
  },
  {
    id: 14,
    name: 'Неделька',
    description: 'Европейская кухня',
    address: 'Алматы, ул. Розыбакиева 10',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80',
    category: 'european',
    rating: 94, reviews: 95, deliveryTime: '40-50 мин', deliveryFee: '299 ₸',
    tags: ['Еуропалық', 'Кофе']
  },
  {
    id: 15,
    name: 'Дель Папа',
    description: 'Итальянская кухня',
    address: 'Алматы, ул. Аль-Фараби 77',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80',
    category: 'european',
    rating: 96, reviews: 180, deliveryTime: '45-55 мин', deliveryFee: '399 ₸',
    tags: ['Паста', 'Еуропалық']
  },
];

export const MOCK_DISHES: { [restaurantId: number]: Dish[] } = {
  7: [
    { id: 1, name: 'Чикен Бургер', description: 'Куриная котлета, свежие овощи, соус', price: 2490, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80', is_available: true, restaurant: 7 },
    { id: 2, name: 'Двойной Смэш', description: 'Две говяжьи котлеты, сыр, огурцы', price: 3290, image: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=400&q=80', is_available: true, restaurant: 7 },
    { id: 3, name: 'Картофель Фри', description: 'Хрустящий картофель с соусом', price: 890, image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=80', is_available: true, restaurant: 7 },
    { id: 4, name: 'Кола 0.5', description: 'Холодный напиток', price: 490, image: 'https://images.unsplash.com/photo-1581636625402-29b2a704ef13?w=400&q=80', is_available: true, restaurant: 7 },
  ],
  8: [
    { id: 5, name: 'Халал Бургер', description: 'Халал говядина, свежие овощи', price: 2290, image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&q=80', is_available: true, restaurant: 8 },
    { id: 6, name: 'Донер в лаваше', description: 'Куриный донер с овощами', price: 1890, image: 'https://images.unsplash.com/photo-1542528180-1c2803fa048c?w=400&q=80', is_available: true, restaurant: 8 },
    { id: 7, name: 'Картофель по-деревенски', description: 'Запечённый картофель с зеленью', price: 790, image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=80', is_available: true, restaurant: 8 },
  ],
  9: [
    { id: 8, name: 'Пепперони 30см', description: 'Томатный соус, моцарелла, пепперони', price: 3990, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80', is_available: true, restaurant: 9 },
    { id: 9, name: 'Маргарита 30см', description: 'Томатный соус, моцарелла, базилик', price: 2990, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=80', is_available: true, restaurant: 9 },
    { id: 10, name: 'Четыре сыра 30см', description: 'Четыре вида сыра', price: 4290, image: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=400&q=80', is_available: true, restaurant: 9 },
  ],
  1: [
    { id: 11, name: 'Донер Большой', description: 'Говяжий донер с овощами в лаваше', price: 2490, image: 'https://images.unsplash.com/photo-1542528180-1c2803fa048c?w=400&q=80', is_available: true, restaurant: 1 },
    { id: 12, name: 'Дюрюм', description: 'Тонкий лаваш с начинкой и соусами', price: 2190, image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400&q=80', is_available: true, restaurant: 1 },
    { id: 13, name: 'Картофель Фри', description: 'Хрустящий картофель', price: 690, image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=80', is_available: true, restaurant: 1 },
  ],
  10: [
    { id: 14, name: 'Сет Калифорния 8шт', description: 'Краб, огурец, авокадо, икра тобико', price: 3490, image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400&q=80', is_available: true, restaurant: 10 },
    { id: 15, name: 'Сет Филадельфия 8шт', description: 'Лосось, сыр Филадельфия, огурец', price: 3990, image: 'https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=400&q=80', is_available: true, restaurant: 10 },
    { id: 16, name: 'Мисо суп', description: 'Традиционный японский суп с тофу', price: 890, image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&q=80', is_available: true, restaurant: 10 },
  ],
  11: [
    { id: 17, name: 'Донер Абая', description: 'Фирменный донер с говядиной', price: 2200, image: 'https://images.unsplash.com/photo-1542528180-1c2803fa048c?w=400&q=80', is_available: true, restaurant: 11 },
    { id: 18, name: 'Бешбармак', description: 'Традиционное казахское блюдо с мясом', price: 3500, image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&q=80', is_available: true, restaurant: 11 },
    { id: 19, name: 'Самса 3шт', description: 'Слоёная выпечка с мясом и луком', price: 990, image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80', is_available: true, restaurant: 11 },
  ],
  12: [
    { id: 20, name: 'Шашлык из баранины 500г', description: 'Маринованная баранина на углях', price: 4500, image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=400&q=80', is_available: true, restaurant: 12 },
    { id: 21, name: 'Шашлык из курицы 500г', description: 'Сочная курица в специях на мангале', price: 3200, image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&q=80', is_available: true, restaurant: 12 },
    { id: 22, name: 'Лепёшка', description: 'Свежеиспечённая узбекская лепёшка', price: 390, image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80', is_available: true, restaurant: 12 },
  ],
  13: [
    { id: 23, name: 'Донер Большой', description: 'Турецкий донер с говядиной в лаваше', price: 2490, image: 'https://images.unsplash.com/photo-1542528180-1c2803fa048c?w=400&q=80', is_available: true, restaurant: 13 },
    { id: 24, name: 'Дюрюм', description: 'Тонкий лаваш с начинкой и соусами', price: 2190, image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400&q=80', is_available: true, restaurant: 13 },
    { id: 25, name: 'Суп Чечевичный', description: 'Турецкий красный чечевичный суп', price: 1290, image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=80', is_available: true, restaurant: 13 },
  ],
  14: [
    { id: 26, name: 'Стейк Рибай', description: 'Говяжий стейк средней прожарки с гарниром', price: 6990, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=80', is_available: true, restaurant: 14 },
    { id: 27, name: 'Салат Цезарь', description: 'Романо, курица, пармезан, крутоны', price: 2290, image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&q=80', is_available: true, restaurant: 14 },
    { id: 28, name: 'Капучино', description: 'Двойной эспрессо с молочной пенкой', price: 990, image: 'https://images.unsplash.com/photo-1570968915860-54d520519458?w=400&q=80', is_available: true, restaurant: 14 },
  ],
  15: [
    { id: 29, name: 'Паста Карбонара', description: 'Спагетти, бекон, пармезан, желток', price: 3290, image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400&q=80', is_available: true, restaurant: 15 },
    { id: 30, name: 'Ризотто с грибами', description: 'Кремовое ризотто с белыми грибами', price: 3490, image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&q=80', is_available: true, restaurant: 15 },
    { id: 31, name: 'Тирамису', description: 'Классический итальянский десерт', price: 1490, image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&q=80', is_available: true, restaurant: 15 },
  ],
};