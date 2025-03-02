import React from 'react';
import { MapPin, Phone, Clock, Mail } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-2">Контакты</h2>
          <div className="w-24 h-1 bg-amber-600 mx-auto mb-6"></div>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Мы всегда рады видеть вас в нашем ресторане. Забронируйте столик заранее или свяжитесь с нами, 
            если у вас есть вопросы.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-amber-50 p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-amber-900 mb-6">Свяжитесь с нами</h3>
            
            <form>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 mb-2">Имя</label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600"
                  placeholder="Ваше имя"
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="phone" className="block text-gray-700 mb-2">Телефон</label>
                <input 
                  type="tel" 
                  id="phone" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600"
                  placeholder="+7 (___) ___-__-__"
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="date" className="block text-gray-700 mb-2">Дата бронирования</label>
                <input 
                  type="date" 
                  id="date" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600"
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="time" className="block text-gray-700 mb-2">Время</label>
                <input 
                  type="time" 
                  id="time" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600"
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="guests" className="block text-gray-700 mb-2">Количество гостей</label>
                <select 
                  id="guests" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600"
                >
                  <option value="1">1 гость</option>
                  <option value="2">2 гостя</option>
                  <option value="3">3 гостя</option>
                  <option value="4">4 гостя</option>
                  <option value="5">5 гостей</option>
                  <option value="6">6 гостей</option>
                  <option value="more">Больше 6 гостей</option>
                </select>
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-gray-700 mb-2">Сообщение (необязательно)</label>
                <textarea 
                  id="message" 
                  rows={4} 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600"
                  placeholder="Особые пожелания или комментарии"
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className="w-full bg-amber-700 hover:bg-amber-800 text-white font-bold py-3 px-4 rounded-md transition"
              >
                Забронировать стол
              </button>
            </form>
          </div>
          
          <div>
            <div className="bg-amber-50 p-8 rounded-lg shadow-md mb-8">
              <h3 className="text-2xl font-semibold text-amber-900 mb-6">Информация</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="text-amber-700 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-amber-900">Адрес</h4>
                    <p className="text-gray-700">ул. Пушкина, д. 10, Москва, 123456</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="text-amber-700 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-amber-900">Телефон</h4>
                    <p className="text-gray-700">+7 (999) 123-45-67</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="text-amber-700 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-amber-900">Email</h4>
                    <p className="text-gray-700">info@aulvkusov.ru</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="text-amber-700 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-amber-900">Часы работы</h4>
                    <p className="text-gray-700">Пн-Чт: 12:00 - 23:00</p>
                    <p className="text-gray-700">Пт-Вс: 12:00 - 00:00</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-200 rounded-lg shadow-md h-64 overflow-hidden">
              {/* Здесь можно добавить iframe с картой, но для примера используем заглушку */}
              <div className="h-full w-full bg-gray-300 flex items-center justify-center">
                <p className="text-gray-600 text-center px-4">
                  Карта с расположением ресторана "Аул вкусов"<br />
                  ул. Пушкина, д. 10, Москва
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;