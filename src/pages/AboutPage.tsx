import React from 'react';
import { motion } from 'framer-motion';
import About from '../components/About';

const AboutPage: React.FC = () => {
  return (
    <div className="py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 mb-12 text-center"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-amber-900 mb-2">О нас</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Узнайте больше о нашем ресторане, традициях и философии
        </p>
      </motion.div>
      
      <About />
      
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="py-16 bg-amber-50"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-2">Наша история</h2>
            <div className="w-24 h-1 bg-amber-600 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                alt="История ресторана" 
                className="rounded-lg shadow-md w-full h-96 object-cover"
              />
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-amber-800 mb-4">От семейных рецептов к ресторану</h3>
              <p className="text-gray-700 mb-4">
                История "Аула вкусов" началась более 15 лет назад, когда наш основатель Алан решил поделиться 
                с жителями города вкусом настоящей кавказской кухни, которую он помнил с детства.
              </p>
              <p className="text-gray-700 mb-4">
                Начав с небольшого семейного кафе, мы постепенно выросли в полноценный ресторан, сохранив при этом 
                домашнюю атмосферу и аутентичные рецепты, передающиеся из поколения в поколение.
              </p>
              <p className="text-gray-700">
                Сегодня "Аул вкусов" - это место, где каждый гость может насладиться не только вкусной едой, 
                но и погрузиться в атмосферу кавказского гостеприимства, ощутить тепло и радушие, с которым 
                мы встречаем каждого посетителя.
              </p>
            </div>
          </div>
        </div>
      </motion.section>
      
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="py-16 bg-white"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-2">Наша команда</h2>
            <div className="w-24 h-1 bg-amber-600 mx-auto mb-6"></div>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Познакомьтесь с людьми, которые делают "Аул вкусов" особенным местом. Наша команда - это профессионалы, 
              влюбленные в свое дело и кавказскую кухню.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="mb-4 relative mx-auto w-48 h-48 rounded-full overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Шеф-повар" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-amber-900 mb-1">Алан Магомедов</h3>
              <p className="text-amber-700 mb-2">Основатель и шеф-повар</p>
              <p className="text-gray-600 text-sm">
                Мастер кавказской кухни с 20-летним опытом, хранитель семейных рецептов
              </p>
            </div>
            
            <div className="text-center">
              <div className="mb-4 relative mx-auto w-48 h-48 rounded-full overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1566554273541-37a9ca77b91f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Су-шеф" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-amber-900 mb-1">Мария Алиева</h3>
              <p className="text-amber-700 mb-2">Су-шеф</p>
              <p className="text-gray-600 text-sm">
                Специалист по десертам и выпечке, создает неповторимые сладкие шедевры
              </p>
            </div>
            
            <div className="text-center">
              <div className="mb-4 relative mx-auto w-48 h-48 rounded-full overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1542178243-bc20204b769f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Менеджер" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-amber-900 mb-1">Руслан Казиев</h3>
              <p className="text-amber-700 mb-2">Менеджер ресторана</p>
              <p className="text-gray-600 text-sm">
                Создает атмосферу гостеприимства и следит за безупречным сервисом
              </p>
            </div>
            
            <div className="text-center">
              <div className="mb-4 relative mx-auto w-48 h-48 rounded-full overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1573497161161-c3e73707e25c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Сомелье" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-amber-900 mb-1">Елена Гасанова</h3>
              <p className="text-amber-700 mb-2">Сомелье</p>
              <p className="text-gray-600 text-sm">
                Эксперт по кавказским винам и традиционным напиткам
              </p>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default AboutPage;