import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu as MenuIcon, X, Home, Package, ShoppingBag, Users, Settings, 
  LogOut, BarChart2, Bell, Search, ChevronDown, Grid
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';

const AdminLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const sidebarItems = [
    { path: '/admin', icon: <Home size={20} />, label: 'Панель управления' },
    { path: '/admin/products', icon: <Package size={20} />, label: 'Товары' },
    { path: '/admin/orders', icon: <ShoppingBag size={20} />, label: 'Заказы' },
    { path: '/admin/customers', icon: <Users size={20} />, label: 'Клиенты' },
    { path: '/admin/tables', icon: <Grid size={20} />, label: 'Столы' },
    { path: '/admin/settings', icon: <Settings size={20} />, label: 'Настройки' },
  ];

  const mockNotifications = [
    { id: 1, title: 'Новый заказ', message: 'Поступил новый заказ #1234', time: '5 минут назад', read: false },
    { id: 2, title: 'Товар заканчивается', message: 'Шашлык из баранины скоро закончится', time: '1 час назад', read: false },
    { id: 3, title: 'Заказ доставлен', message: 'Заказ #1230 успешно доставлен', time: '3 часа назад', read: true },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Top Navigation */}
      <header className="bg-white shadow-sm z-30">
        <div className="flex items-center justify-between h-16 px-4">
          <div className="flex items-center">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-md text-gray-500 hover:text-gray-600 focus:outline-none"
            >
              {isSidebarOpen ? <X size={24} /> : <MenuIcon size={24} />}
            </button>
            <Link to="/admin" className="ml-4 text-xl font-bold text-amber-900">
              Аул вкусов <span className="text-sm font-normal text-gray-500">Админ</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative hidden md:block">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Поиск..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="p-2 rounded-full text-gray-500 hover:text-gray-600 focus:outline-none relative"
              >
                <Bell size={20} />
                {mockNotifications.some(n => !n.read) && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                )}
              </button>

              <AnimatePresence>
                {isNotificationsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-50"
                  >
                    <div className="p-3 border-b border-gray-200">
                      <h3 className="text-sm font-semibold text-gray-700">Уведомления</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {mockNotifications.map(notification => (
                        <div
                          key={notification.id}
                          className={`p-3 border-b border-gray-200 hover:bg-gray-50 ${
                            !notification.read ? 'bg-amber-50' : ''
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <h4 className="text-sm font-medium text-gray-900">{notification.title}</h4>
                            <span className="text-xs text-gray-500">{notification.time}</span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                        </div>
                      ))}
                    </div>
                    <div className="p-2 border-t border-gray-200 text-center">
                      <button className="text-sm text-amber-600 hover:text-amber-700">
                        Просмотреть все
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Profile */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2 focus:outline-none"
              >
                <div className="w-8 h-8 rounded-full bg-amber-200 flex items-center justify-center text-amber-700 font-medium">
                  {user?.name.charAt(0)}
                </div>
                <span className="hidden md:block text-sm font-medium text-gray-700">{user?.name}</span>
                <ChevronDown size={16} className="text-gray-500" />
              </button>

              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-50"
                  >
                    <div className="py-1">
                      <Link
                        to="/"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-50"
                      >
                        Вернуться на сайт
                      </Link>
                      <Link
                        to="/admin/settings"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-50"
                      >
                        Настройки
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-amber-50"
                      >
                        Выйти
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.aside
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 240, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white shadow-md z-20 overflow-y-auto"
            >
              <nav className="mt-5 px-2">
                <div className="space-y-1">
                  {sidebarItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                        location.pathname === item.path
                          ? 'bg-amber-100 text-amber-900'
                          : 'text-gray-600 hover:bg-amber-50 hover:text-amber-900'
                      }`}
                    >
                      <div className={`mr-3 ${
                        location.pathname === item.path
                          ? 'text-amber-700'
                          : 'text-gray-500 group-hover:text-amber-700'
                      }`}>
                        {item.icon}
                      </div>
                      {item.label}
                    </Link>
                  ))}
                </div>
              </nav>

              <div className="mt-auto p-4 border-t border-gray-200">
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-2 py-2 text-sm font-medium text-red-600 rounded-md hover:bg-red-50 transition-colors duration-200"
                >
                  <LogOut size={20} className="mr-3" />
                  Выйти
                </button>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-gray-100 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;