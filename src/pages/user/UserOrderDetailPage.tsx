import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Clock, CheckCircle, Truck, Package, 
  AlertCircle, MapPin, Phone, Mail
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useOrderStore } from '../../store/orderStore';
import { OrderStatus } from '../../types';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';

const UserOrderDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { fetchUserOrders } = useOrderStore();
  
  const [order, setOrder] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const loadOrder = async () => {
      if (user && id) {
        const userOrders = await fetchUserOrders(user.id);
        const foundOrder = userOrders.find(o => o.id === id);
        
        if (foundOrder) {
          setOrder(foundOrder);
        } else {
          // Order not found, redirect to orders list
          navigate('/user/orders');
        }
      }
      setIsLoading(false);
    };
    
    loadOrder();
  }, [id, user, fetchUserOrders, navigate]);
  
  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return <Badge variant="warning">Ожидает</Badge>;
      case 'confirmed':
        return <Badge variant="info">Подтвержден</Badge>;
      case 'processing':
        return <Badge variant="primary">Готовится</Badge>;
      case 'shipped':
        return <Badge variant="info">В пути</Badge>;
      case 'delivered':
        return <Badge variant="success">Доставлен</Badge>;
      case 'cancelled':
        return <Badge variant="danger">Отменен</Badge>;
      default:
        return null;
    }
  };
  
  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return <Clock size={20} className="text-yellow-500" />;
      case 'confirmed':
        return <CheckCircle size={20} className="text-blue-500" />;
      case 'processing':
        return <Package size={20} className="text-amber-500" />;
      case 'shipped':
        return <Truck size={20} className="text-blue-500" />;
      case 'delivered':
        return <CheckCircle size={20} className="text-green-500" />;
      case 'cancelled':
        return <AlertCircle size={20} className="text-red-500" />;
      default:
        return null;
    }
  };
  
  const getStatusSteps = (status: OrderStatus) => {
    const steps = [
      { id: 'pending', label: 'Заказ оформлен', icon: <Clock size={20} /> },
      { id: 'confirmed', label: 'Заказ подтвержден', icon: <CheckCircle size={20} /> },
      { id: 'processing', label: 'Заказ готовится', icon: <Package size={20} /> },
      { id: 'shipped', label: 'Заказ в пути', icon: <Truck size={20} /> },
      { id: 'delivered', label: 'Заказ доставлен', icon: <CheckCircle size={20} /> }
    ];
    
    const statusIndex = steps.findIndex(step => step.id === status);
    if (status === 'cancelled') return [];
    
    return steps.map((step, index) => ({
      ...step,
      completed: index <= statusIndex,
      current: index === statusIndex
    }));
  };
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center">
        <div className="w-12 h-12 border-4 border-amber-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  if (!order) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Заказ не найден</h2>
        <Link to="/user/orders">
          <Button variant="primary">Вернуться к списку заказов</Button>
        </Link>
      </div>
    );
  }
  
  const statusSteps = getStatusSteps(order.status);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/user/orders" className="inline-flex items-center text-amber-700 hover:text-amber-800 transition-colors">
          <ArrowLeft size={16} className="mr-1" />
          <span>Назад к списку заказов</span>
        </Link>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <h1 className="text-3xl font-bold text-amber-900 mb-1">
              Заказ #{order.id.substring(0, 8)}
            </h1>
            <p className="text-gray-600">
              Оформлен: {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div className="flex items-center mt-2 sm:mt-0">
            {getStatusIcon(order.status)}
            <span className="ml-2">{getStatusBadge(order.status)}</span>
          </div>
        </div>
      </motion.div>
      
      {order.status !== 'cancelled' && statusSteps.length > 0 && (
        <Card className="mb-8">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Статус заказа</h2>
            
            <div className="relative">
              <div className="absolute left-8 top-0 h-full w-1 bg-gray-200 z-0"></div>
              
              {statusSteps.map((step, index) => (
                <motion.div 
                  key={step.id}
                  className="relative z-10 flex mb-8 last:mb-0"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                >
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 ${
                    step.completed ? 'bg-amber-100' : 'bg-gray-100'
                  }`}>
                    {React.cloneElement(step.icon as React.ReactElement, {
                      className: step.completed ? 'text-amber-600' : 'text-gray-400'
                    })}
                  </div>
                  <div className="ml-4 flex-grow">
                    <h3 className="text-lg font-medium text-gray-800">{step.label}</h3>
                    {step.current && (
                      <p className="text-gray-600">Текущий статус вашего заказа</p>
                    )}
                    {step.id === 'shipped' && step.completed && (
                      <div className="mt-2 text-sm text-amber-700">
                        <span className="font-medium">Ожидаемое время доставки:</span> Сегодня, 18:30
                      </div>
                    )}
                  </div>
                  {step.completed && (
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
        </Card>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-2"
        >
          <Card>
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Товары в заказе</h2>
              <div className="divide-y divide-gray-200">
                {order.items.map((item: any) => (
                  <div key={item.product.id} className="py-4 flex">
                    <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                      <img 
                        src={item.product.image} 
                        alt={item.product.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="ml-4 flex-grow">
                      <div className="flex justify-between">
                        <h3 className="text-sm font-medium text-gray-900">{item.product.name}</h3>
                        <p className="text-sm font-medium text-gray-900">{item.product.price} ₽</p>
                      </div>
                      <p className="text-sm text-gray-500 mt-1 line-clamp-1">{item.product.description}</p>
                      <div className="flex justify-between mt-2">
                        <p className="text-sm text-gray-500">Количество: {item.quantity}</p>
                        <p className="text-sm font-medium text-gray-900">{item.product.price * item.quantity} ₽</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Подытог</span>
                <span className="font-medium">{order.total} ₽</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Доставка</span>
                <span className="font-medium">Бесплатно</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-200">
                <span className="font-medium">Итого</span>
                <span className="font-bold text-lg">{order.total} ₽</span>
              </div>
            </div>
          </Card>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="mb-6">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Информация о доставке</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin size={18} className="text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Адрес доставки</p>
                    <p className="text-sm text-gray-600">ул. Пушкина, д. 10, кв. 42</p>
                    <p className="text-sm text-gray-600">Москва, 123456</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone size={18} className="text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Телефон</p>
                    <p className="text-sm text-gray-600">+7 (999) 123-45-67</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail size={18} className="text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Email</p>
                    <p className="text-sm text-gray-600">{user?.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
          
          <Card>
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Действия</h2>
              <div className="space-y-3">
                <Button 
                  variant="outline" 
                  fullWidth
                  onClick={() => window.print()}
                >
                  Распечатать заказ
                </Button>
                
                {order.status !== 'cancelled' && order.status !== 'delivered' && (
                  <Button 
                    variant="danger" 
                    fullWidth
                  >
                    Отменить заказ
                  </Button>
                )}
                
                <Button 
                  variant="primary" 
                  fullWidth
                  onClick={() => navigate('/shop')}
                >
                  Повторить заказ
                </Button>
              </div>
            </div>
            <div className="p-6 bg-amber-50">
              <h3 className="font-medium text-amber-900 mb-2">Нужна помощь?</h3>
              <p className="text-sm text-gray-700 mb-3">
                Если у вас возникли вопросы по заказу, свяжитесь с нами:
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-medium">Телефон:</span> +7 (999) 123-45-67
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-medium">Email:</span> support@aulvkusov.ru
              </p>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default UserOrderDetailPage;