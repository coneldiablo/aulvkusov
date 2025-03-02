import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Clock, CheckCircle, Truck, Package, 
  AlertCircle, User, MapPin, Phone, Mail, Calendar
} from 'lucide-react';
import { useOrderStore } from '../../store/orderStore';
import { useRevenueStore } from '../../store/revenueStore';
import { OrderStatus } from '../../types';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Alert from '../../components/ui/Alert';
import Spinner from '../../components/ui/Spinner';

const AdminOrderDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { orders, updateOrderStatus, fetchAllOrders } = useOrderStore();
  const { updateOrderRevenue } = useRevenueStore();
  
  const [order, setOrder] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);
  
  useEffect(() => {
    const loadOrder = async () => {
      setIsLoading(true);
      
      try {
        // First make sure we have orders loaded
        await fetchAllOrders();
        
        // Then find the order by id
        if (id) {
          const foundOrder = orders.find(o => o.id === id);
          if (foundOrder) {
            setOrder(foundOrder);
          } else {
            // Order not found, redirect to orders list
            navigate('/admin/orders');
          }
        }
      } catch (error) {
        console.error('Error loading order:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadOrder();
  }, [id, orders, navigate, fetchAllOrders]);
  
  const handleStatusChange = async (newStatus: OrderStatus) => {
    if (order) {
      setIsUpdating(true);
      setUpdateError(null);
      
      try {
        const previousStatus = order.status;
        const success = await updateOrderStatus(order.id, newStatus);
        
        if (success) {
          // Update revenue if status changed to/from cancelled
          if ((newStatus === 'cancelled' && previousStatus !== 'cancelled') || 
              (previousStatus === 'cancelled' && newStatus !== 'cancelled')) {
            updateOrderRevenue({...order, status: newStatus}, previousStatus);
          }
          
          setOrder({ ...order, status: newStatus, updatedAt: new Date() });
          setUpdateSuccess(true);
          setTimeout(() => setUpdateSuccess(false), 3000);
        } else {
          setUpdateError('Не удалось обновить статус заказа');
        }
      } catch (error) {
        console.error('Error updating order status:', error);
        setUpdateError('Произошла ошибка при обновлении статуса');
      } finally {
        setIsUpdating(false);
      }
    }
  };
  
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
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner size="lg" color="primary" />
      </div>
    );
  }
  
  if (!order) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Заказ не найден</h2>
        <Link to="/admin/orders">
          <Button variant="primary">Вернуться к списку заказов</Button>
        </Link>
      </div>
    );
  }
  
  return (
    <div>
      <div className="mb-6">
        <Link to="/admin/orders" className="inline-flex items-center text-amber-700 hover:text-amber-800 transition-colors">
          <ArrowLeft size={16} className="mr-1" />
          <span>Назад к списку заказов</span>
        </Link>
      </div>
      
      {updateSuccess && (
        <Alert 
          type="success" 
          message="Статус заказа успешно обновлен" 
          onClose={() => setUpdateSuccess(false)} 
          className="mb-6"
        />
      )}
      
      {updateError && (
        <Alert 
          type="error" 
          message={updateError} 
          onClose={() => setUpdateError(null)} 
          className="mb-6"
        />
      )}
      
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Заказ #{order.id.substring(0, 8)}
          </h1>
          <p className="text-gray-600">
            Создан: {new Date(order.createdAt).toLocaleString()}
          </p>
        </div>
        <div className="flex items-center">
          {getStatusIcon(order.status)}
          <span className="ml-2">{getStatusBadge(order.status)}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="lg:col-span-2"
        >
          <Card>
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Товары в заказе</h2>
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
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card className="mb-6">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Информация о клиенте</h2>
              <div className="space-y-3">
                <div className="flex items-start">
                  <User size={18} className="text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">ID клиента</p>
                    <p className="text-sm text-gray-600">{order.userId}</p>
                  </div>
                </div>
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
                    <p className="text-sm text-gray-600">customer@example.com</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
          
          <Card>
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Управление заказом</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Текущий статус:</span>
                  <span>{getStatusBadge(order.status)}</span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Изменить статус
                  </label>
                  <div className="flex items-center">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(e.target.value as OrderStatus)}
                      disabled={isUpdating}
                      className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <option value="pending">Ожидает</option>
                      <option value="confirmed">Подтвержден</option>
                      <option value="processing">Готовится</option>
                      <option value="shipped">В пути</option>
                      <option value="delivered">Доставлен</option>
                      <option value="cancelled">Отменен</option>
                    </select>
                    {isUpdating && (
                      <Spinner size="sm" color="primary" className="ml-2" />
                    )}
                  </div>
                </div>
                <div className="pt-3">
                  <div className="flex items-start">
                    <Calendar size={18} className="text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">История изменений</p>
                      <div className="mt-2 text-sm text-gray-600">
                        <div className="flex justify-between mb-1">
                          <span>Создан</span>
                          <span>{new Date(order.createdAt).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Последнее обновление</span>
                          <span>{new Date(order.updatedAt).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6">
              <Button 
                variant="outline" 
                fullWidth
                onClick={() => window.print()}
              >
                Распечатать заказ
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminOrderDetailPage;