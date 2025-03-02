import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../../store/cartStore';
import Button from '../ui/Button';
import Spinner from '../ui/Spinner';

const CartSidebar: React.FC = () => {
  const { 
    items, 
    isOpen, 
    closeCart, 
    removeItem, 
    updateQuantity,
    clearCart
  } = useCartStore();

  // Close cart when pressing escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCart();
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [closeCart]);

  // Prevent body scroll when cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const totalPrice = items.reduce(
    (total, item) => total + item.product.price * item.quantity, 
    0
  );

  const sidebarVariants = {
    hidden: { x: '100%', opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { 
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    },
    exit: { 
      x: '100%', 
      opacity: 0,
      transition: { 
        ease: 'easeInOut',
        duration: 0.3
      }
    }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, x: 20 },
    visible: (i: number) => ({ 
      opacity: 1, 
      y: 0,
      x: 0,
      transition: { 
        delay: i * 0.1,
        duration: 0.4,
        ease: [0.32, 1.25, 0.32, 1]
      }
    }),
    exit: { 
      opacity: 0, 
      x: 20,
      transition: { duration: 0.2 }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={closeCart}
          />
          
          {/* Sidebar */}
          <motion.div
            className="fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-xl z-50 flex flex-col rounded-l-3xl overflow-hidden"
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <div className="flex items-center">
                <ShoppingBag className="text-amber-700 mr-2" size={20} />
                <h2 className="text-lg font-semibold text-gray-800">Корзина</h2>
                <span className="ml-2 bg-amber-100 text-amber-800 text-xs font-medium px-2 py-0.5 rounded-full">
                  {items.reduce((total, item) => total + item.quantity, 0)} товаров
                </span>
              </div>
              <motion.button
                onClick={closeCart}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
                whileHover={{ rotate: 90, scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <X size={20} className="text-gray-500" />
              </motion.button>
            </div>
            
            {/* Cart Items */}
            <div className="flex-grow overflow-y-auto p-4">
              {items.length === 0 ? (
                <motion.div 
                  className="h-full flex flex-col items-center justify-center text-center p-4"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: [0.32, 1.25, 0.32, 1] }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
                    transition={{ 
                      scale: { duration: 0.5, ease: [0.68, -0.55, 0.27, 1.55] },
                      rotate: { duration: 0.5, ease: [0.68, -0.55, 0.27, 1.55], delay: 0.3 }
                    }}
                  >
                    <ShoppingBag size={48} className="text-gray-300 mb-4 mx-auto" />
                  </motion.div>
                  <h3 className="text-lg font-medium text-gray-700 mb-2">Ваша корзина пуста</h3>
                  <p className="text-gray-500 mb-6">Добавьте товары из нашего меню, чтобы сделать заказ</p>
                  <Button 
                    variant="primary" 
                    onClick={closeCart}
                  >
                    Перейти в магазин
                  </Button>
                </motion.div>
              ) : (
                <ul className="space-y-4">
                  <AnimatePresence>
                    {items.map((item, index) => (
                      <motion.li
                        key={item.product.id}
                        custom={index}
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        layoutId={`cart-item-${item.product.id}`}
                        className="flex border border-gray-200 rounded-xl overflow-hidden"
                      >
                        <div className="w-24 h-24 flex-shrink-0">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-grow p-3 flex flex-col">
                          <div className="flex justify-between">
                            <h3 className="text-sm font-medium text-gray-800">{item.product.name}</h3>
                            <span className="text-sm font-semibold text-amber-700">{item.product.price} ₽</span>
                          </div>
                          <p className="text-xs text-gray-500 line-clamp-1 mb-2">{item.product.description}</p>
                          <div className="mt-auto flex justify-between items-center">
                            <div className="flex items-center border border-gray-200 rounded-full">
                              <motion.button
                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                                className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-50 rounded-full hover:bg-gray-100"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <Minus size={14} />
                              </motion.button>
                              <span className="px-2 text-sm">{item.quantity}</span>
                              <motion.button
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                className="p-1 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <Plus size={14} />
                              </motion.button>
                            </div>
                            <motion.button
                              onClick={() => removeItem(item.product.id)}
                              className="p-1 text-red-500 hover:text-red-700 transition-colors duration-200 rounded-full hover:bg-red-50"
                              whileHover={{ scale: 1.1, rotate: 10 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Trash2 size={16} />
                            </motion.button>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>
            
            {/* Footer */}
            {items.length > 0 && (
              <motion.div 
                className="p-4 border-t border-gray-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                <div className="mb-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Подытог</span>
                    <span className="font-medium">{totalPrice} ₽</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Доставка</span>
                    <span className="font-medium">Бесплатно</span>
                  </div>
                  <motion.div 
                    className="border-t border-gray-200 pt-2 flex justify-between"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                  >
                    <span className="font-medium">Итого</span>
                    <span className="font-bold text-lg">{totalPrice} ₽</span>
                  </motion.div>
                </div>
                <div className="space-y-2">
                  <Link to="/checkout" onClick={closeCart}>
                    <Button 
                      variant="primary" 
                      fullWidth 
                      size="lg"
                      icon={<ArrowRight size={16} />}
                    >
                      Оформить заказ
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    fullWidth
                    onClick={clearCart}
                  >
                    Очистить корзину
                  </Button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;