import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Search, Filter, ChevronDown, ChevronLeft, ChevronRight, 
  Eye, Clock, CheckCircle, Truck, Package, AlertCircle
} from 'lucide-react';
import { useOrderStore } from '../../store/orderStore';
import { useRevenueStore } from '../../store/revenueStore';
import { OrderStatus } from '../../types';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Card from '../../components/ui/Card';
import Select from '../../components/ui/Select';
import Badge from '../../components/ui/Badge';
import Spinner from '../../components/ui/Spinner';
import Alert from '../../components/ui/Alert';

const AdminOrdersPage: React.FC = () => {
  const { orders, fetchAllOrders, updateOrderStatus } = useOrderStore();
  const { updateOrderRevenue } = useRevenueStore();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('date-desc');
  const [isLoading, setIsLoading] = useState(true);
  const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState<'success' | 'error'>('success');
  
  const itemsPerPage = 10;
  
  useEffect(() => {
    const loadOrders = async () => {
      await fetchAllOrders();
      setIsLoading(false);
    };
    
    loadOrders();
  }, [fetchAllOrders]);
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };
  
  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };
  
  const handleSortChange = (value: string) => {
    setSortBy(value);
  };
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  
  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    setUpdatingOrderId(orderId);
    
    try {
      const order = orders.find(o => o.id === orderId);
      if (!order) return;
      
      const previousStatus = order.status;
      const success = await updateOrderStatus(orderId, newStatus);
      
      if (success) {
        // Update revenue if status changed to/from cancelled
        if ((newStatus === 'cancelled' && previousStatus !== 'cancelled') || 
            (previousStatus === 'cancelled' && newStatus !== 'cancelled')) {
          updateOrderRevenue({...order, status: newStatus}, previousStatus);
        }
        
        setAlertType('success');
        setAlertMessage('Статус заказа успешно обновлен');
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
      } else {
        setAlertType('error');
        setAlertMessage('Не удалось обновить статус заказа');
        setShowAlert(true);
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      setAlertType('error');
      setAlertMessage('Произошла ошибка при обновлении статуса');
      setShowAlert(true);
    } finally {
      setUpdatingOrderId(null);
    }
  };
  
  // Filter orders
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          order.userId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  // Sort orders
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    switch (sortBy) {
      case 'date-asc':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case 'date-desc':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'total-asc':
        return a.total - b.total;
      case 'total-desc':
        return b.total - a.total;
      default:
        return 0;
    }
  });
  
  // Pagination
  const totalPages = Math.ceil(sortedOrders.length / itemsPerPage);
  const paginatedOrders = sortedOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  const statusOptions = [
    { value: 'all', label: 'Все статусы' },
    { value: 'pending', label: 'Ожидает' },
    { value: 'confirmed', label: 'Подтвержден' },
    { value: 'processing', label: 'Готовится' },
    { value: 'shipped', label: 'В пути' },
    { value: 'delivered', label: 'Доставлен' },
    { value: 'cancelled', label: 'Отменен' }
  ];
  
  const sortOptions = [
    { value: 'date-desc', label: 'Сначала новые' },
    { value: 'date-asc', label: 'Сначала старые' },
    { value: 'total-desc', label: 'По сумме (убывание)' },
    { value: 'total-asc', label: 'По сумме (возрастание)' }
  ];
  
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
        return <Clock size={16} className="text-yellow-500" />;
      case 'confirmed':
        return <CheckCircle size={16} className="text-blue-500" />;
      case 'processing':
        return <Package size={16} className="text-amber-500" />;
      case 'shipped':
        return <Truck size={16} className="text-blue-500" />;
      case 'delivered':
        return <CheckCircle size={16} className="text-green-500" />;
      case 'cancelled':
        return <AlertCircle size={16} className="text-red-500" />;
      default:
        return null;
    }
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Управление заказами</h1>
      </div>
      
      {showAlert && (
        <Alert 
          type={alertType} 
          message={alertMessage} 
          onClose={() => setShowAlert(false)} 
          className="mb-6"
        />
      )}
      
      <Card className="mb-6">
        <div className="p-4 flex flex-col md:flex-row gap-4">
          <div className="flex-grow">
            <Input
              placeholder="Поиск заказов..."
              value={searchTerm}
              onChange={handleSearchChange}
              icon={<Search size={18} />}
              fullWidth
            />
          </div>
          <div className="w-full md:w-64">
            <Select
              options={statusOptions}
              value={statusFilter}
              onChange={handleStatusFilterChange}
              fullWidth
            />
          </div>
          <div className="w-full md:w-64">
            <Select
              options={sortOptions}
              value={sortBy}
              onChange={handleSortChange}
              fullWidth
            />
          </div>
        </div>
      </Card>
      
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID заказа
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Клиент
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Дата
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Сумма
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Статус
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Действия
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <tr key={`loading-${index}`}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="h-4 w-20 bg-gray-200 rounded animate-pulse ml-auto"></div>
                    </td>
                  </tr>
                ))
              ) : paginatedOrders.length > 0 ? (
                paginatedOrders.map((order, index) => (
                  <motion.tr 
                    key={`${order.id}-${index}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        #{order.id.substring(0, 8)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">ID: {order.userId}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(order.createdAt).toLocaleTimeString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{order.total} ₽</div>
                      <div className="text-xs text-gray-500">
                        {order.items.length} {order.items.length === 1 ? 'товар' : 
                          order.items.length < 5 ? 'товара' : 'товаров'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getStatusIcon(order.status)}
                        <span className="ml-2">{getStatusBadge(order.status)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <div className="relative">
                          <select
                            value={order.status}
                            onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                            disabled={updatingOrderId === order.id}
                            className="text-sm border border-gray-300 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:opacity-50"
                          >
                            <option value="pending">Ожидает</option>
                            <option value="confirmed">Подтвержден</option>
                            <option value="processing">Готовится</option>
                            <option value="shipped">В пути</option>
                            <option value="delivered">Доставлен</option>
                            <option value="cancelled">Отменен</option>
                          </select>
                          {updatingOrderId === order.id && (
                            <div className="absolute right-0 top-0 h-full flex items-center pr-2">
                              <Spinner size="sm" color="primary" />
                            </div>
                          )}
                        </div>
                        <Link 
                          to={`/admin/orders/${order.id}`}
                          className="text-amber-600 hover:text-amber-900 p-1"
                        >
                          <Eye size={18} />
                        </Link>
                      </div>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-gray-500">
                    Заказы не найдены
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
            <div className="flex-1 flex justify-between sm:hidden">
              <Button
                variant="outline"
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                Назад
              </Button>
              <Button
                variant="outline"
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              >
                Вперед
              </Button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Показано <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> - <span className="font-medium">
                    {Math.min(currentPage * itemsPerPage, filteredOrders.length)}
                  </span> из <span className="font-medium">{filteredOrders.length}</span> заказов
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="sr-only">Предыдущая</span>
                    <ChevronLeft size={16} />
                  </button>
                  
                  {Array.from({ length: totalPages }).map((_, index) => (
                    <button
                      key={`page-${index}`}
                      onClick={() => handlePageChange(index + 1)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        currentPage === index + 1
                          ? 'z-10 bg-amber-50 border-amber-500 text-amber-600'
                          : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="sr-only">Следующая</span>
                    <ChevronRight size={16} />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default AdminOrdersPage;