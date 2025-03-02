import React, { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useTableStore } from '../store/tableStore';
import Button from '../components/ui/Button';
import Alert from '../components/ui/Alert';

const Menu: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('main');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const { addItem } = useCartStore();
  const { selectedTable } = useTableStore();

  const categories = [
    { id: 'main', name: 'Основные блюда' },
    { id: 'appetizers', name: 'Закуски' },
    { id: 'soups', name: 'Супы' },
    { id: 'desserts', name: 'Десерты' },
    { id: 'drinks', name: 'Напитки' }
  ];

  const menuItems = {
    main: [
      {
        id: 'p1',
        name: 'Шашлык из баранины',
        description: 'Сочный шашлык из отборной баранины, маринованный по особому рецепту, подается с маринованным луком и соусом.',
        price: 650,
        image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'p2',
        name: 'Долма',
        description: 'Традиционное блюдо из виноградных листьев с начинкой из риса и мяса, приправленное ароматными специями.',
        price: 450,
        image: 'https://images.unsplash.com/photo-1606851091851-e8c8c0fca5ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'p3',
        name: 'Хинкали',
        description: 'Сочные грузинские пельмени с начинкой из говядины и свинины, приправленные зеленью и специями.',
        price: 480,
        image: 'https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'p4',
        name: 'Чахохбили',
        description: 'Традиционное грузинское блюдо из курицы, тушенной с помидорами, луком и ароматными травами.',
        price: 520,
        image: 'https://images.unsplash.com/photo-1547496502-affa22d38842?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      }
    ],
    appetizers: [
      {
        id: 'p5',
        name: 'Сациви',
        description: 'Холодная закуска из курицы в ореховом соусе с ароматными специями.',
        price: 380,
        image: 'https://images.unsplash.com/photo-1608835291093-394b0c943a75?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'p6',
        name: 'Пхали',
        description: 'Ассорти из овощных закусок с ореховой пастой и специями.',
        price: 320,
        image: 'https://images.unsplash.com/photo-1609501676725-7186f017a4b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'p7',
        name: 'Аджапсандали',
        description: 'Овощное рагу из баклажанов, перца, помидоров и зелени.',
        price: 350,
        image: 'https://images.unsplash.com/photo-1505575967455-40e256f73376?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      }
    ],
    soups: [
      {
        id: 'p8',
        name: 'Харчо',
        description: 'Острый суп с говядиной, рисом, грецкими орехами и ароматными специями.',
        price: 380,
        image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'p9',
        name: 'Чихиртма',
        description: 'Традиционный грузинский суп из курицы с яично-лимонной заправкой.',
        price: 350,
        image: 'https://images.unsplash.com/photo-1604152135912-04a022e23696?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      }
    ],
    desserts: [
      {
        id: 'p10',
        name: 'Пахлава',
        description: 'Слоеный десерт с орехами, медом и специями.',
        price: 280,
        image: 'https://images.unsplash.com/photo-1519915028121-7d3463d5b1ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'p11',
        name: 'Чурчхела',
        description: 'Традиционная грузинская сладость из орехов и виноградного сока.',
        price: 250,
        image: 'https://images.unsplash.com/photo-1515467837915-15c4777cc462?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      }
    ],
    drinks: [
      {
        id: 'p12',
        name: 'Тархун',
        description: 'Традиционный грузинский лимонад из эстрагона.',
        price: 180,
        image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'p13',
        name: 'Компот из фруктов',
        description: 'Освежающий напиток из сезонных фруктов.',
        price: 150,
        image: 'https://images.unsplash.com/photo-1563041219-83a6d8617fc7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'p14',
        name: 'Вино домашнее',
        description: 'Красное или белое домашнее вино по традиционному рецепту.',
        price: 350,
        image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      }
    ]
  };

  const handleAddToCart = (item: any) => {
    const product = {
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price,
      image: item.image,
      category: categories.find(cat => cat.id === activeCategory)?.name || '',
      available: true
    };
    
    addItem(product);
    
    setAlertMessage(`${item.name} добавлен в корзину`);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  return (
    <section id="menu" className="py-16 bg-amber-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-2">Наше меню</h2>
          <div className="w-24 h-1 bg-amber-600 mx-auto mb-6"></div>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Откройте для себя богатство вкусов традиционной кавказской кухни. Все блюда готовятся 
            из свежих продуктов по аутентичным рецептам.
          </p>
          
          {selectedTable && (
            <div className="mt-4 inline-block bg-amber-100 px-4 py-2 rounded-lg">
              <p className="text-amber-800 font-medium">Стол №{selectedTable.number}</p>
            </div>
          )}
        </div>
        
        {showAlert && (
          <div className="fixed top-4 right-4 z-50">
            <Alert 
              type="success" 
              message={alertMessage} 
              onClose={() => setShowAlert(false)} 
            />
          </div>
        )}
        
        {/* Категории меню */}
        <div className="flex flex-wrap justify-center mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`px-4 py-2 mx-2 mb-2 rounded-md transition-colors ${
                activeCategory === category.id
                  ? 'bg-amber-700 text-white'
                  : 'bg-white text-amber-900 hover:bg-amber-100'
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
        
        {/* Элементы меню */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {menuItems[activeCategory as keyof typeof menuItems].map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row">
              <div className="md:w-1/3">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="h-48 md:h-full w-full object-cover"
                />
              </div>
              <div className="p-6 md:w-2/3">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-amber-900">{item.name}</h3>
                  <span className="text-amber-700 font-bold">{item.price} ₽</span>
                </div>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <Button 
                  variant="primary" 
                  className="mt-auto"
                  icon={<ShoppingCart size={16} />}
                  onClick={() => handleAddToCart(item)}
                >
                  В корзину
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Menu;