import { Product, Order, User } from '../types';

// Mock Products
export const mockProducts: Product[] = [
  {
    id: 'p1',
    name: 'Шашлык из баранины',
    description: 'Сочный шашлык из отборной баранины, маринованный по особому рецепту, подается с маринованным луком и соусом.',
    price: 650,
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Основные блюда',
    available: true,
    featured: true
  },
  {
    id: 'p2',
    name: 'Долма',
    description: 'Традиционное блюдо из виноградных листьев с начинкой из риса и мяса, приправленное ароматными специями.',
    price: 450,
    image: 'https://images.unsplash.com/photo-1606851091851-e8c8c0fca5ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Основные блюда',
    available: true
  },
  {
    id: 'p3',
    name: 'Хинкали',
    description: 'Сочные грузинские пельмени с начинкой из говядины и свинины, приправленные зеленью и специями.',
    price: 480,
    image: 'https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Основные блюда',
    available: true,
    featured: true
  },
  {
    id: 'p4',
    name: 'Чахохбили',
    description: 'Традиционное грузинское блюдо из курицы, тушенной с помидорами, луком и ароматными травами.',
    price: 520,
    image: 'https://images.unsplash.com/photo-1547496502-affa22d38842?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Основные блюда',
    available: true
  },
  {
    id: 'p5',
    name: 'Сациви',
    description: 'Холодная закуска из курицы в ореховом соусе с ароматными специями.',
    price: 380,
    image: 'https://images.unsplash.com/photo-1608835291093-394b0c943a75?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Закуски',
    available: true
  },
  {
    id: 'p6',
    name: 'Пхали',
    description: 'Ассорти из овощных закусок с ореховой пастой и специями.',
    price: 320,
    image: 'https://images.unsplash.com/photo-1609501676725-7186f017a4b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Закуски',
    available: true
  },
  {
    id: 'p7',
    name: 'Аджапсандали',
    description: 'Овощное рагу из баклажанов, перца, помидоров и зелени.',
    price: 350,
    image: 'https://images.unsplash.com/photo-1505575967455-40e256f73376?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Закуски',
    available: true,
    featured: true
  },
  {
    id: 'p8',
    name: 'Харчо',
    description: 'Острый суп с говядиной, рисом, грецкими орехами и ароматными специями.',
    price: 380,
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Супы',
    available: true
  },
  {
    id: 'p9',
    name: 'Чихиртма',
    description: 'Традиционный грузинский суп из курицы с яично-лимонной заправкой.',
    price: 350,
    image: 'https://images.unsplash.com/photo-1604152135912-04a022e23696?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Супы',
    available: true
  },
  {
    id: 'p10',
    name: 'Пахлава',
    description: 'Слоеный десерт с орехами, медом и специями.',
    price: 280,
    image: 'https://images.unsplash.com/photo-1519915028121-7d3463d5b1ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Десерты',
    available: true
  },
  {
    id: 'p11',
    name: 'Чурчхела',
    description: 'Традиционная грузинская сладость из орехов и виноградного сока.',
    price: 250,
    image: 'https://images.unsplash.com/photo-1515467837915-15c4777cc462?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Десерты',
    available: true
  },
  {
    id: 'p12',
    name: 'Тархун',
    description: 'Традиционный грузинский лимонад из эстрагона.',
    price: 180,
    image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Напитки',
    available: true
  },
  {
    id: 'p13',
    name: 'Компот из фруктов',
    description: 'Освежающий напиток из сезонных фруктов.',
    price: 150,
    image: 'https://images.unsplash.com/photo-1563041219-83a6d8617fc7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Напитки',
    available: true
  },
  {
    id: 'p14',
    name: 'Вино домашнее',
    description: 'Красное или белое домашнее вино по традиционному рецепту.',
    price: 350,
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Напитки',
    available: true,
    featured: true
  }
];

// Mock Orders
export const mockOrders: Order[] = [
  {
    id: 'o1',
    userId: 'u1',
    items: [
      { product: mockProducts[0], quantity: 2 },
      { product: mockProducts[4], quantity: 1 }
    ],
    status: 'delivered',
    total: 1680,
    createdAt: new Date('2023-12-10T14:30:00'),
    updatedAt: new Date('2023-12-10T18:45:00')
  },
  {
    id: 'o2',
    userId: 'u1',
    items: [
      { product: mockProducts[2], quantity: 3 },
      { product: mockProducts[8], quantity: 1 }
    ],
    status: 'shipped',
    total: 1790,
    createdAt: new Date('2024-01-15T12:15:00'),
    updatedAt: new Date('2024-01-15T16:20:00')
  },
  {
    id: 'o3',
    userId: 'u1',
    items: [
      { product: mockProducts[9], quantity: 2 },
      { product: mockProducts[13], quantity: 1 }
    ],
    status: 'processing',
    total: 910,
    createdAt: new Date('2024-02-20T10:00:00'),
    updatedAt: new Date('2024-02-20T10:30:00')
  },
  {
    id: 'o4',
    userId: 'u2',
    items: [
      { product: mockProducts[1], quantity: 1 },
      { product: mockProducts[5], quantity: 1 },
      { product: mockProducts[11], quantity: 2 }
    ],
    status: 'delivered',
    total: 1130,
    createdAt: new Date('2023-11-05T18:20:00'),
    updatedAt: new Date('2023-11-05T22:15:00')
  },
  {
    id: 'o5',
    userId: 'u2',
    items: [
      { product: mockProducts[3], quantity: 2 },
      { product: mockProducts[7], quantity: 1 }
    ],
    status: 'confirmed',
    total: 1420,
    createdAt: new Date('2024-03-01T19:45:00'),
    updatedAt: new Date('2024-03-01T20:10:00')
  }
];

// Mock Users
export const mockUsers: User[] = [
  {
    id: 'u1',
    email: 'customer@example.com',
    name: 'Иван Петров',
    role: 'customer',
    orders: mockOrders.filter(order => order.userId === 'u1'),
    savedItems: [
      { product: mockProducts[6], dateAdded: new Date('2024-01-10T14:30:00') },
      { product: mockProducts[10], dateAdded: new Date('2024-02-05T11:15:00') }
    ]
  },
  {
    id: 'u2',
    email: 'admin@example.com',
    name: 'Администратор',
    role: 'admin',
    orders: [],
    savedItems: []
  }
];