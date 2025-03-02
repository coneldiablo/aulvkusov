import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart2, ShoppingBag, Users, DollarSign, TrendingUp, 
  Calendar, Package, Clock, ArrowUpRight, ArrowDownRight 
} from 'lucide-react';
import { useOrderStore } from '../../store/orderStore';
import { useProductStore } from '../../store/productStore';
import { useRevenueStore } from '../../store/revenueStore';
import Card from '../../components/ui/Card';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { format, subDays, subMonths, startOfDay, endOfDay } from 'date-fns';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboardPage: React.FC = () => {
  const { orders, fetchAllOrders } = useOrderStore();
  const { products } = useProductStore();
  const { totalRevenue, canceledOrdersAmount } = useRevenueStore();
  const [dateRange, setDateRange] = useState('week');
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const loadData = async () => {
      await fetchAllOrders();
      setIsLoading(false);
    };
    
    loadData();
  }, [fetchAllOrders]);
  
  // Calculate statistics
  const activeOrders = orders.filter(order => 
    order.status !== 'delivered' && order.status !== 'cancelled'
  ).length;
  
  const totalOrders = orders.length;
  const totalCustomers = new Set(orders.map(order => order.userId)).size;
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
  
  // Get recent orders
  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);
  
  // Prepare chart data
  const getLast7Days = () => {
    return Array.from({ length: 7 }, (_, i) => {
      const date = subDays(new Date(), 6 - i);
      return format(date, 'dd MMM');
    });
  };
  
  const getLast30Days = () => {
    return Array.from({ length: 30 }, (_, i) => {
      const date = subDays(new Date(), 29 - i);
      return format(date, 'dd MMM');
    });
  };
  
  const getChartLabels = () => {
    switch (dateRange) {
      case 'week':
        return getLast7Days();
      case 'month':
        return getLast30Days();
      default:
        return getLast7Days();
    }
  };
  
  // Calculate daily revenue for chart
  const getDailyRevenue = () => {
    const labels = getChartLabels();
    const data = new Array(labels.length).fill(0);
    
    orders.forEach(order => {
      if (order.status !== 'cancelled') {
        const orderDate = format(new Date(order.createdAt), 'dd MMM');
        const index = labels.indexOf(orderDate);
        if (index !== -1) {
          data[index] += order.total;
        }
      }
    });
    
    return data;
  };
  
  // Calculate daily orders for chart
  const getDailyOrders = () => {
    const labels = getChartLabels();
    const data = new Array(labels.length).fill(0);
    
    orders.forEach(order => {
      const orderDate = format(new Date(order.createdAt), 'dd MMM');
      const index = labels.indexOf(orderDate);
      if (index !== -1) {
        data[index] += 1;
      }
    });
    
    return data;
  };
  
  const salesData = {
    labels: getChartLabels(),
    datasets: [
      {
        label: 'Продажи',
        data: getDailyRevenue(),
        borderColor: 'rgb(217, 119, 6)',
        backgroundColor: 'rgba(217, 119, 6, 0.1)',
        tension: 0.3,
        fill: true,
      },
    ],
  };
  
  const ordersData = {
    labels: getChartLabels(),
    datasets: [
      {
        label: 'Заказы',
        data: getDailyOrders(),
        backgroundColor: 'rgb(217, 119, 6)',
        borderRadius: 6,
      },
    ],
  };
  
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    elements: {
      point: {
        radius: 3,
        hoverRadius: 6,
      },
    },
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    }
  };
  
  const StatCard = ({ title, value, icon, change, isPositive, isLoading }: any) => (
    <Card className="p-6">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-500 text-sm mb-1">{title}</p>
          {isLoading ? (
            <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
          ) : (
            <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
          )}
        </div>
        <div className={`p-3 rounded-full ${isLoading ? 'bg-gray-200' : 'bg-amber-100'}`}>
          {icon}
        </div>
      </div>
      {!isLoading && change && (
        <div className="mt-4 flex items-center">
          {isPositive ? (
            <ArrowUpRight size={16} className="text-green-500 mr-1" />
          ) : (
            <ArrowDownRight size={16} className="text-red-500 mr-1" />
          )}
          <span className={`text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {change} с прошлого периода
          </span>
        </div>
      )}
    </Card>
  );
  
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Панель управления</h1>
        <div className="flex space-x-2">
          <button 
            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
              dateRange === 'week' ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            onClick={() => setDateRange('week')}
          >
            Неделя
          </button>
          <button 
            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
              dateRange === 'month' ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            onClick={() => setDateRange('month')}
          >
            Месяц
          </button>
          <button 
            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
              dateRange === 'year' ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            onClick={() => setDateRange('year')}
          >
            Год
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div variants={itemVariants}>
          <StatCard 
            title="Общая выручка" 
            value={`${totalRevenue.toLocaleString()} ₽`} 
            icon={<DollarSign size={24} className="text-amber-700" />}
            change="12.5%"
            isPositive={true}
            isLoading={isLoading}
          />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <StatCard 
            title="Активные заказы" 
            value={activeOrders} 
            icon={<ShoppingBag size={24} className="text-amber-700" />}
            change="8.2%"
            isPositive={true}
            isLoading={isLoading}
          />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <StatCard 
            title="Клиенты" 
            value={totalCustomers} 
            icon={<Users size={24} className="text-amber-700" />}
            change="5.1%"
            isPositive={true}
            isLoading={isLoading}
          />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <StatCard 
            title="Отмененные заказы" 
            value={`${canceledOrdersAmount.toLocaleString()} ₽`} 
            icon={<TrendingUp size={24} className="text-amber-700" />}
            change="3.2%"
            isPositive={false}
            isLoading={isLoading}
          />
        </motion.div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-800">Динамика продаж</h2>
              <div className="text-sm text-gray-500">
                <Calendar size={16} className="inline mr-1" />
                {dateRange === 'week' ? 'Последние 7 дней' : 'Последние 30 дней'}
              </div>
            </div>
            <div className="h-80">
              <Line data={salesData} options={chartOptions} />
            </div>
          </Card>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-800">Количество заказов</h2>
              <div className="text-sm text-gray-500">
                <Calendar size={16} className="inline mr-1" />
                {dateRange === 'week' ? 'Последние 7 дней' : 'Последние 30 дней'}
              </div>
            </div>
            <div className="h-80">
              <Bar data={ordersData} options={chartOptions} />
            </div>
          </Card>
        </motion.div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={itemVariants}>
          <Card>
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">Последние заказы</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {isLoading ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <div key={`loading-order-${index}`} className="p-6 flex items-center">
                    <div className="w-full">
                      <div className="h-5 w-1/3 bg-gray-200 rounded animate-pulse mb-2"></div>
                      <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  </div>
                ))
              ) : (
                recentOrders.map((order, index) => (
                  <div key={`recent-order-${order.id}-${index}`} className="p-6 flex items-center">
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mr-4">
                      <ShoppingBag size={18} className="text-amber-700" />
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between">
                        <h3 className="font-medium text-gray-800">Заказ #{order.id.substring(0, 8)}</h3>
                        <span className="text-gray-500 text-sm">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex justify-between mt-1">
                        <span className="text-sm text-gray-500">
                          {order.items.length} {order.items.length === 1 ? 'товар' : 
                            order.items.length < 5 ? 'товара' : 'товаров'}
                        </span>
                        <span className="font-medium text-amber-700">{order.total} ₽</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Card>
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">Популярные товары</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {isLoading ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <div key={`loading-product-${index}`} className="p-6 flex items-center">
                    <div className="w-12 h-12 bg-gray-200 rounded animate-pulse mr-4"></div>
                    <div className="w-full">
                      <div className="h-5 w-1/3 bg-gray-200 rounded animate-pulse mb-2"></div>
                      <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  </div>
                ))
              ) : (
                products.filter(p => p.featured).slice(0, 5).map((product, index) => (
                  <div key={`featured-product-${product.id}-${index}`} className="p-6 flex items-center">
                    <div className="w-12 h-12 rounded-md overflow-hidden mr-4">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between">
                        <h3 className="font-medium text-gray-800">{product.name}</h3>
                        <span className="font-medium text-amber-700">{product.price} ₽</span>
                      </div>
                      <div className="flex justify-between mt-1">
                        <span className="text-sm text-gray-500">{product.category}</span>
                        <span className="text-sm text-green-600">В наличии</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AdminDashboardPage;