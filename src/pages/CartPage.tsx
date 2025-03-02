import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight, ArrowLeft } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const CartPage: React.FC = () => {
  const { items, removeItem, updateQuantity, clearCart } = useCartStore();
  const navigate = useNavigate();
  const [isClearing, setIsClearing] = useState(false);
  
  const totalPrice = items.reduce(
    (total, item) => total + item.product.price * item.quantity, 
    0
  );
  
  const handleClearCart = () => {
    setIsClearing(true);
    setTimeout(() => {
      clearCart();
      setIsClearing(false);
    }, 300);
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
    },
    exit: {
      opacity: 0,
      x: -100,
      transition: {
        duration: 0.3
      }
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-amber-900 mb-2">Корзина</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Проверьте ваш заказ перед оформлением
        </p>
      </motion.div>
      
      {items.length === 0 ? (
        <div className="text-center py-16">
          <ShoppingCart size={64} className="mx-auto text-gray-300 mb-6" />
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Ваша корзина пуста</h2>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            Похоже, вы еще не добавили товары в корзину. Перейдите в магазин, чтобы выбрать блюда.
          </p>
          <Link to="/shop">
            <Button variant="primary" size="lg">
              Перейти в магазин
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div 
            className="lg:col-span-2"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Card className="overflow-visible">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Товары в корзине ({items.reduce((total, item) => total + item.quantity, 0)})
                  </h2>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleClearCart}
                    disabled={isClearing}
                  >
                    Очистить корзину
                  </Button>
                </div>
              </div>
              
              <AnimatePresence>
                {items.map((item) => (
                  <motion.div 
                    key={item.product.id}
                    variants={itemVariants}
                    exit="exit"
                    layoutId={`cart-item-${item.product.id}`}
                    className="p-6 border-b border-gray-200 flex flex-col sm:flex-row gap-4"
                  >
                    <div className="w-full sm:w-24 h-24 flex-shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                    <div className="flex-grow">
                      <div className="flex flex-col sm:flex-row justify-between mb-2">
                        <h3 className="text-lg font-medium text-gray-800">{item.product.name}</h3>
                        <span className="text-lg font-semibold text-amber-700">{item.product.price} ₽</span>
                      </div>
                      <p className="text-sm text-gray-500 mb-4">{item.product.description}</p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center border border-gray-300 rounded-md">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="px-4 py-2 text-gray-700">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="p-2 text-gray-500 hover:text-gray-700"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="p-2 text-red-500 hover:text-red-700 transition-colors duration-200"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              <div className="p-6">
                <Link to="/shop" className="inline-flex items-center text-amber-700 hover:text-amber-800 transition-colors">
                  <ArrowLeft size={16} className="mr-1" />
                  <span>Продолжить покупки</span>
                </Link>
              </div>
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="sticky top-24">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Сумма заказа</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Подытог</span>
                    <span className="font-medium">{totalPrice} ₽</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Доставка</span>
                    <span className="font-medium">Бесплатно</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3 flex justify-between">
                    <span className="font-medium">Итого</span>
                    <span className="font-bold text-xl">{totalPrice} ₽</span>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <Button 
                  variant="primary" 
                  fullWidth 
                  size="lg"
                  icon={<ArrowRight size={16} />}
                  onClick={() => navigate('/checkout')}
                >
                  Оформить заказ
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default CartPage;