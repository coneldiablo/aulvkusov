import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ShoppingBag, Clock, CheckCircle, Truck, Package, 
  AlertCircle, ChevronRight, Search
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useOrderStore } from '../../store/orderStore';
import { OrderStatus } from '../../types';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Badge from '../../components/ui/Badge';

const UserOrdersPage: React.FC = () => {
  const { user } = useAuthStore();
  const { fetchUserOrders } = useOrderStore();
  
  const [orders, setOrders] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const loadOrders = async () => {
      if (user) {
        const userOrders = await fetchUserOrders(user.id);
        setOrders(userOrders);
      }
      setIsLoading(false);
    };
    
    loadOrders();
  }, [user, fetchUserOrders]);
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  // Filter orders
  const filteredOrders = orders.filter(order => {
    return order.id.toLowerCase().includes(searchTerm.toLowerCase());
  });
  
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
  
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-amber-900 mb-2">Мои заказы</h1>
        <p className="text-gray-600">
          Просмотр истории и статуса ваших заказов
        </p>
      </motion.div>
      
      <Card className="mb-6">
        <div className="p-4">
          <Input
            placeholder="Поиск заказов по номеру..."
            value={searchTerm}
            onChange={handleSearchChange}
            icon={<Search size={18} />}
            fullWidth
          />
        </div>
      </Card>
      
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="w-12 h-12 border-4 border-amber-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : filteredOrders.length > 0 ? (
        <div className="space-y-6">
          {filteredOrders.map((order, index) => (
            <motion.div
              key={`${order.id}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <div className="p-6 border-b border-gray-200">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-800">
                        Заказ #{order.id.substring(0, 8)}
                      </h2>
                      <p className="text-sm text-gray-500">
                        Оформлен: {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center mt-2 sm:mt-0">
                      {getStatusIcon(order.status)}
                      <span className="ml-2">{getStatusBadge(order.status)}</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <span className="text-sm text-gray-500">Сумма заказа:</span>
                      <p className="font-medium">{order.total} ₽</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Количество товаров:</span>
                      <p className="font-medium">{order.items.length}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Последнее обновление:</span>
                      <p className="font-medium">{new Date(order.updatedAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-100 pt-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Товары в заказе:</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {order.items.map((item: any, itemIndex: number) => (
                        <div key={`${item.product.id}-${itemIndex}`} className="flex items-center">
                          <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                            <img 
                              src={item.product.image} 
                              alt={item.product.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-800">{item.product.name}</p>
                            <p className="text-xs text-gray-500">{item.quantity} x {item.product.price} ₽</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-gray-50 flex justify-end">
                  <Link 
                    to={`/user/orders/${order.id}`}
                    className="inline-flex items-center text-amber-700 hover:text-amber-800 transition-colors"
                  >
                    <span className="mr-1">Подробнее</span>
                    <ChevronRight size={16} />
                  </Link>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <ShoppingBag size={64} className="mx-auto text-gray-300 mb-4" />
          <h2 className="text-xl font-semibold text-gray-700 mb-2">У вас пока нет заказов</h2>
          <p className="text-gray-500 mb-6">
            Когда вы сделаете заказ, он появится здесь
          </p>
          <Link to="/shop">
            <button className="bg-amber-700 hover:bg-amber-800 text-white font-medium py-2 px-4 rounded-md transition-colors">
              Перейти в магазин
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserOrdersPage;