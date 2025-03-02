import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Menu as MenuIcon, X, Phone, Clock, MapPin, Instagram, Facebook, ShoppingCart, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '../store/authStore';
import { useCartStore } from '../store/cartStore';
import Footer from '../components/Footer';
import CartSidebar from '../components/shop/CartSidebar';

const MainLayout: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated, isAdmin, user } = useAuthStore();
  const { items, openCart, isOpen } = useCartStore();
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-amber-50">
      {/* Верхняя панель с контактами */}
      <motion.div 
        className="bg-amber-900 text-amber-100 py-2"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.32, 1.25, 0.32, 1] }}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <motion.div 
              className="flex items-center"
              whileHover={{ scale: 1.05, x: 3 }}
            >
              <Phone size={16} className="mr-1" />
              <span>+7 (999) 123-45-67</span>
            </motion.div>
            <motion.div 
              className="hidden md:flex items-center"
              whileHover={{ scale: 1.05, x: 3 }}
            >
              <Clock size={16} className="mr-1" />
              <span>12:00 - 23:00 (Ежедневно)</span>
            </motion.div>
          </div>
          <div className="flex items-center space-x-3">
            <motion.a 
              href="#" 
              className="hover:text-white transition-colors duration-300 p-1"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Instagram size={18} />
            </motion.a>
            <motion.a 
              href="#" 
              className="hover:text-white transition-colors duration-300 p-1"
              whileHover={{ scale: 1.2, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Facebook size={18} />
            </motion.a>
          </div>
        </div>
      </motion.div>

      {/* Навигация */}
      <motion.nav 
        className={`bg-white sticky top-0 z-50 transition-all duration-400 ${
          isScrolled ? 'shadow-lg py-2' : 'py-4'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.32, 1.25, 0.32, 1], delay: 0.1 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <motion.div 
              className="flex items-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Link to="/" className="text-2xl font-bold text-amber-900">Аул вкусов</Link>
            </motion.div>
            
            {/* Десктопное меню */}
            <div className="hidden md:flex items-center space-x-8">
              <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                <Link to="/" className="menu-item">Главная</Link>
              </motion.div>
              <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                <Link to="/menu" className="menu-item">Меню</Link>
              </motion.div>
              <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                <Link to="/about" className="menu-item">О нас</Link>
              </motion.div>
              <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                <Link to="/contact" className="menu-item">Контакты</Link>
              </motion.div>
            </div>
            
            {/* Правая часть навигации */}
            <div className="flex items-center space-x-4">
              {/* Корзина */}
              <motion.button 
                onClick={openCart} 
                className="relative p-2 text-amber-900 hover:text-amber-700 transition-colors duration-300 rounded-full hover:bg-amber-50"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <ShoppingCart size={22} />
                {items.length > 0 && (
                  <motion.span 
                    className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  >
                    {items.reduce((total, item) => total + item.quantity, 0)}
                  </motion.span>
                )}
              </motion.button>
              
              {/* Пользователь */}
              {isAuthenticated ? (
                <div className="relative group">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link 
                      to={isAdmin ? "/admin" : "/user/profile"} 
                      className="flex items-center space-x-2 p-2 text-amber-900 hover:text-amber-700 transition-colors duration-300"
                    >
                      <User size={22} />
                      <span className="hidden md:inline">{user?.name}</span>
                    </Link>
                  </motion.div>
                  <motion.div 
                    className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg overflow-hidden z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right"
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="py-1">
                      {isAdmin ? (
                        <>
                          <Link to="/admin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-50">Панель администратора</Link>
                          <Link to="/admin/products" className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-50">Управление товарами</Link>
                          <Link to="/admin/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-50">Заказы</Link>
                          <Link to="/admin/tables" className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-50">Управление столами</Link>
                        </>
                      ) : (
                        <>
                          <Link to="/user/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-50">Мой профиль</Link>
                          <Link to="/user/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-50">Мои заказы</Link>
                          <Link to="/user/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-50">Настройки</Link>
                        </>
                      )}
                      <motion.button 
                        onClick={() => useAuthStore.getState().logout()}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-amber-50"
                        whileHover={{ x: 5 }}
                      >
                        Выйти
                      </motion.button>
                    </div>
                  </motion.div>
                </div>
              ) : (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    to="/login" 
                    className="flex items-center space-x-2 p-2 text-amber-900 hover:text-amber-700 transition-colors duration-300"
                  >
                    <User size={22} />
                    <span className="hidden md:inline">Войти</span>
                  </Link>
                </motion.div>
              )}
              
              {/* Мобильное меню */}
              <div className="md:hidden">
                <motion.button 
                  onClick={toggleMenu}
                  className="p-2 text-amber-900 hover:text-amber-700 transition-colors duration-300 rounded-full hover:bg-amber-50"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {isMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
                </motion.button>
              </div>
            </div>
          </div>
          
          {/* Мобильное меню выпадающее */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div 
                className="md:hidden bg-white py-2 px-4 shadow-inner rounded-b-2xl"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.32, 1.25, 0.32, 1] }}
              >
                <div className="flex flex-col space-y-3 py-3">
                  <motion.div 
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link to="/" className="text-amber-900 hover:text-amber-700 font-medium block py-2 px-3 rounded-full hover:bg-amber-50">Главная</Link>
                  </motion.div>
                  <motion.div 
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link to="/menu" className="text-amber-900 hover:text-amber-700 font-medium block py-2 px-3 rounded-full hover:bg-amber-50">Меню</Link>
                  </motion.div>
                  <motion.div 
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link to="/about" className="text-amber-900 hover:text-amber-700 font-medium block py-2 px-3 rounded-full hover:bg-amber-50">О нас</Link>
                  </motion.div>
                  <motion.div 
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link to="/contact" className="text-amber-900 hover:text-amber-700 font-medium block py-2 px-3 rounded-full hover:bg-amber-50">Контакты</Link>
                  </motion.div>
                  <motion.div 
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link to="/cart" className="text-amber-900 hover:text-amber-700 font-medium block py-2 px-3 rounded-full hover:bg-amber-50">Корзина</Link>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />

      {/* Cart Sidebar */}
      <CartSidebar />
    </div>
  );
};

export default MainLayout;