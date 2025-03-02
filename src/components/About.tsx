import React from 'react';

const About = () => {
  return (
    <section id="about" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-2">О нашем ресторане</h2>
          <div className="w-24 h-1 bg-amber-600 mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <h3 className="text-2xl font-semibold text-amber-800 mb-4">Традиции и гостеприимство</h3>
            <p className="text-gray-700 mb-4">
              Ресторан "Аул вкусов" - это уникальное место, где вы можете насладиться настоящей кавказской кухней, 
              приготовленной по традиционным рецептам, передающимся из поколения в поколение.
            </p>
            <p className="text-gray-700 mb-4">
              Наши повара - настоящие мастера своего дела, которые вкладывают душу в каждое блюдо. 
              Мы используем только свежие и натуральные продукты, чтобы передать подлинный вкус кавказской кухни.
            </p>
            <p className="text-gray-700">
              В "Ауле вкусов" вы почувствуете себя желанным гостем. Мы создали атмосферу настоящего кавказского 
              гостеприимства, где каждый посетитель становится частью нашей большой семьи.
            </p>
          </div>
          <div className="order-1 md:order-2">
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Традиционные блюда" 
                className="rounded-lg shadow-md h-64 w-full object-cover"
              />
              <img 
                src="https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Интерьер ресторана" 
                className="rounded-lg shadow-md h-64 w-full object-cover"
              />
              <img 
                src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Наши гости" 
                className="rounded-lg shadow-md h-64 w-full object-cover"
              />
              <img 
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Приготовление блюд" 
                className="rounded-lg shadow-md h-64 w-full object-cover"
              />
            </div>
          </div>
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-amber-50 p-6 rounded-lg shadow-md">
            <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-amber-900 mb-2">Аутентичные рецепты</h3>
            <p className="text-gray-700">
              Мы готовим по оригинальным рецептам, сохраняя традиции кавказской кухни и используя только натуральные ингредиенты.
            </p>
          </div>
          
          <div className="bg-amber-50 p-6 rounded-lg shadow-md">
            <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-amber-900 mb-2">Гостеприимство</h3>
            <p className="text-gray-700">
              Мы встречаем каждого гостя как самого дорогого друга, создавая атмосферу тепла и уюта.
            </p>
          </div>
          
          <div className="bg-amber-50 p-6 rounded-lg shadow-md">
            <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-amber-900 mb-2">Особая атмосфера</h3>
            <p className="text-gray-700">
              Интерьер нашего ресторана переносит вас в атмосферу кавказского аула, где каждая деталь продумана до мелочей.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;