import React from 'react';
import { motion } from 'framer-motion';
import Contact from '../components/Contact';

const ContactPage: React.FC = () => {
  return (
    <div className="py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 mb-12 text-center"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-amber-900 mb-2">Контакты</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Свяжитесь с нами, чтобы забронировать стол или задать вопросы
        </p>
      </motion.div>
      
      <Contact />
      
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="py-16 bg-amber-50"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-2">Как нас найти</h2>
            <div className="w-24 h-1 bg-amber-600 mx-auto mb-6"></div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="aspect-w-16 aspect-h-9 h-96 rounded-lg overflow-hidden">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2245.347127106496!2d37.61463081590356!3d55.75197998055643!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b54a50b315e573%3A0xa886bf5a3d9b2e68!2sRed%20Square%2C%20Moscow%2C%20Russia!5e0!3m2!1sen!2sus!4v1616661345850!5m2!1sen!2sus" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy"
                  title="Карта расположения ресторана"
                ></iframe>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold text-amber-900 mb-4">Удобное расположение</h3>
              <p className="text-gray-700 mb-4">
                Наш ресторан расположен в самом центре города, в нескольких минутах ходьбы от основных 
                достопримечательностей и бизнес-центров. Вы легко можете добраться до нас на общественном 
                транспорте или личном автомобиле.
              </p>
              <p className="text-gray-700 mb-6">
                Для гостей ресторана предусмотрена бесплатная парковка. Если вы планируете посетить нас 
                в выходные дни или в вечернее время, рекомендуем забронировать стол заранее.
              </p>
              
              <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                <h4 className="font-medium text-amber-900 mb-2">Как добраться:</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Метро: станция "Пушкинская", выход №3</li>
                  <li>• Автобус: маршруты №12, 34, 56 до остановки "Центральная площадь"</li>
                  <li>• На автомобиле: координаты для навигатора 55.751979, 37.617499</li>
                </ul>
              </div>
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
            <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-2">Часто задаваемые вопросы</h2>
            <div className="w-24 h-1 bg-amber-600 mx-auto mb-6"></div>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              <div className="bg-amber-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-amber-900 mb-2">Нужно ли бронировать стол заранее?</h3>
                <p className="text-gray-700">
                  Да, особенно в выходные дни и вечернее время. Вы можете забронировать стол по телефону 
                  или через форму на нашем сайте. Рекомендуем делать это за 1-2 дня до планируемого визита.
                </p>
              </div>
              
              <div className="bg-amber-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-amber-900 mb-2">Есть ли у вас доставка?</h3>
                <p className="text-gray-700">
                  Да, мы осуществляем доставку по всему городу. Минимальная сумма заказа - 1000 рублей. 
                  Доставка бесплатная при заказе от 2000 рублей. Время доставки зависит от района и 
                  обычно составляет 30-60 минут.
                </p>
              </div>
              
              <div className="bg-amber-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-amber-900 mb-2">Можно ли у вас отметить день рождения или другое торжество?</h3>
                <p className="text-gray-700">
                  Конечно! У нас есть специальное банкетное меню и отдельный зал для проведения мероприятий. 
                  Мы можем организовать праздник для компании до 30 человек. Для обсуждения деталей свяжитесь 
                  с нашим менеджером.
                </p>
              </div>
              
              <div className="bg-amber-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-amber-900 mb-2">Есть ли у вас вегетарианские блюда?</h3>
                <p className="text-gray-700">
                  Да, в нашем меню представлены вегетарианские блюда. Мы можем адаптировать некоторые 
                  позиции под ваши предпочтения. Пожалуйста, сообщите официанту о ваших пожеланиях.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default ContactPage;