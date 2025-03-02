import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Package, Truck, Clock, MapPin, ArrowRight, ShoppingBag } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { useOrderStore } from '../store/orderStore';

const OrderConfirmationPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { orders } = useOrderStore();
  const [estimatedDelivery, setEstimatedDelivery] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [order, setOrder] = useState<any>(null);
  
  useEffect(() => {
    // Find the order in the store
    if (id) {
      const foundOrder = orders.find(o => o.id === id);
      if (foundOrder) {
        setOrder(foundOrder);
      }
    }
    
    // Calculate estimated delivery time (30-60 minutes from now)
    const now = new Date();
    const deliveryTime = new Date(now.getTime() + 45 * 60000); // 45 minutes later
    
    const hours = deliveryTime.getHours();
    const minutes = deliveryTime.getMinutes();
    
    setEstimatedDelivery(`${hours}:${minutes < 10 ? '0' + minutes : minutes}`);
    
    // Simulate order progress
    const timer1 = setTimeout(() => setCurrentStep(2), 3000);
    const timer2 = setTimeout(() => setCurrentStep(3), 6000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [id, orders]);
  
  const steps = [
    { 
      id: 1, 
      title: 'Заказ принят', 
      description: 'Мы получили ваш заказ и начали его обработку',
      icon: <CheckCircle className="text-green-600" />
    },
    { 
      id: 2, 
      title: 'Готовится', 
      description: 'Наши повара готовят ваш заказ',
      icon: <Package className="text-amber-600" />
    },
    { 
      id: 3, 
      title: 'В пути', 
      description: 'Курьер доставляет ваш заказ',
      icon: <Truck className="text-blue-600" />
    },
    { 
      id: 4, 
      title: 'Доставлен', 
      description: 'Заказ успешно доставлен',
      icon: <CheckCircle className="text-green-600" />
    }
  ];
  
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.68, -0.55, 0.27, 1.55] }}
        className="max-w-2xl mx-auto text-center mb-12"
      >
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
            transition={{ 
              scale: { duration: 0.5, ease: [0.68, -0.55, 0.27, 1.55] },
              rotate: { duration: 0.5, ease: [0.68, -0.55, 0.27, 1.55], delay: 0.3 }
            }}
          >
            <CheckCircle size={40} className="text-green-600" />
          </motion.div>
        </div>
        <motion.h1 
          className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Заказ успешно оформлен!
        </motion.h1>
        <motion.p 
          className="text-gray-600 mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Спасибо за ваш заказ. Мы уже начали его готовить.
        </motion.p>
        <motion.p 
          className="text-gray-600"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Номер вашего заказа: <span className="font-semibold text-amber-700">#{id?.substring(0, 8).toUpperCase()}</span>
        </motion.p>
      </motion.div>
      
      <div className="max-w-4xl mx-auto">
        <Card>
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Статус заказа</h2>
            
            <div className="relative">
              <div className="absolute left-8 top-0 h-full w-1 bg-gray-200 z-0"></div>
              
              {steps.map((step, index) => (
                <motion.div 
                  key={step.id}
                  className="relative z-10 flex mb-8 last:mb-0"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.5, ease: [0.32, 1.25, 0.32, 1] }}
                >
                  <motion.div 
                    className={`w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 ${
                      currentStep >= step.id ? 'bg-amber-100' : 'bg-gray-100'
                    }`}
                    animate={{ 
                      scale: currentStep === step.id ? [1, 1.1, 1] : 1,
                      boxShadow: currentStep >= step.id ? "0 0 0 4px rgba(251, 191, 36, 0.2)" : "none"
                    }}
                    transition={{ 
                      scale: { 
                        repeat: currentStep === step.id ? Infinity : 0, 
                        repeatType: "reverse", 
                        duration: 2 
                      }
                    }}
                  >
                    {step.icon}
                  </motion.div>
                  <div className="ml-4 flex-grow">
                    <h3 className="text-lg font-medium text-gray-800">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                    {step.id === 3 && currentStep >= 3 && (
                      <div className="mt-2 text-sm text-amber-700">
                        <span className="font-medium">Ожидаемое время доставки:</span> Сегодня, {estimatedDelivery}
                      </div>
                    )}
                  </div>
                  {currentStep >= step.id && (
                    <motion.div 
                      className="self-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, delay: index * 0.2 + 0.3 }}
                    >
                      <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                        <CheckCircle size={16} className="text-white" />
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Информация о доставке</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div 
                className="flex"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ x: 5 }}
              >
                <MapPin size={20} className="text-amber-700 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-gray-800 mb-1">Адрес доставки</h3>
                  <p className="text-gray-600">ул. Пушкина, д. 10, кв. 42</p>
                  <p className="text-gray-600">Москва, 123456</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ x: 5 }}
              >
                <Clock size={20} className="text-amber-700 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-gray-800 mb-1">Ожидаемое время доставки</h3>
                  <p className="text-gray-600">Сегодня, {estimatedDelivery}</p>
                </div>
              </motion.div>
            </div>
          </div>
          
          {order && (
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Детали заказа</h2>
              <div className="space-y-4">
                {order.items.map((item: any, index: number) => (
                  <motion.div 
                    key={item.product.id} 
                    className="flex items-center"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 * index, ease: [0.32, 1.25, 0.32, 1] }}
                    whileHover={{ scale: 1.02, x: 5 }}
                  >
                    <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 mr-3">
                      <img 
                        src={item.product.image} 
                        alt={item.product.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between">
                        <h3 className="text-sm font-medium text-gray-800">
                          {item.product.name} <span className="text-gray-500">x{item.quantity}</span>
                        </h3>
                        <span className="text-sm font-medium">{item.product.price * item.quantity} ₽</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Подытог</span>
                    <span className="font-medium">{order.total} ₽</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Доставка</span>
                    <span className="font-medium">Бесплатно</span>
                  </div>
                  <motion.div 
                    className="flex justify-between pt-2 border-t border-gray-200"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <span className="font-medium">Итого</span>
                    <span className="font-bold">{order.total} ₽</span>
                  </motion.div>
                </div>
              </div>
            </div>
          )}
          
          <div className="p-6">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <motion.div
                whileHover={{ scale: 1.05, x: -5 }}
                whileTap={{ scale: 0.95 }}
                className="mb-3 sm:mb-0"
              >
                <Link to="/user/orders">
                  <Button variant="outline">
                    Мои заказы
                  </Button>
                </Link>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/shop">
                  <Button 
                    variant="primary"
                    icon={<ShoppingBag size={16} className="mr-2" />}
                  >
                    Продолжить покупки
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </Card>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-8 text-center"
        >
          <p className="text-gray-600 mb-2">
            Возникли вопросы по заказу?
          </p>
          <Link to="/contact" className="text-amber-700 hover:text-amber-800 font-medium animated-link">
            Свяжитесь с нами
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;