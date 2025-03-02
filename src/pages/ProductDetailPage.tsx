import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Heart, ArrowLeft, Plus, Minus, Check } from 'lucide-react';
import { useProductStore } from '../store/productStore';
import { useCartStore } from '../store/cartStore';
import Button from '../components/ui/Button';
import Spinner from '../components/ui/Spinner';
import Alert from '../components/ui/Alert';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { fetchProductById, isLoading } = useProductStore();
  const { addItem, saveForLater } = useCartStore();
  
  const [product, setProduct] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [showAddedAlert, setShowAddedAlert] = useState(false);
  const [showSavedAlert, setShowSavedAlert] = useState(false);
  
  useEffect(() => {
    const loadProduct = async () => {
      if (id) {
        const foundProduct = await fetchProductById(id);
        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          navigate('/shop');
        }
      }
    };
    
    loadProduct();
  }, [id, fetchProductById, navigate]);
  
  const handleQuantityChange = (value: number) => {
    setQuantity(Math.max(1, value));
  };
  
  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity);
      setShowAddedAlert(true);
      setTimeout(() => setShowAddedAlert(false), 3000);
    }
  };
  
  const handleSaveForLater = () => {
    if (product) {
      saveForLater(product);
      setShowSavedAlert(true);
      setTimeout(() => setShowSavedAlert(false), 3000);
    }
  };
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <Spinner size="lg" />
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Товар не найден</h2>
        <Link to="/shop">
          <Button variant="primary">Вернуться в магазин</Button>
        </Link>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/shop" className="inline-flex items-center text-amber-700 hover:text-amber-800 transition-colors">
          <ArrowLeft size={16} className="mr-1" />
          <span>Назад к магазину</span>
        </Link>
      </div>
      
      <div className="fixed top-4 right-4 z-50 w-80">
        <AnimatePresence>
          {showAddedAlert && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Alert 
                type="success" 
                message="Товар добавлен в корзину" 
                onClose={() => setShowAddedAlert(false)} 
              />
            </motion.div>
          )}
          
          {showSavedAlert && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Alert 
                type="info" 
                message="Товар сохранен на потом" 
                onClose={() => setShowSavedAlert(false)} 
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="h-96 md:h-auto"
          >
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="p-6 flex flex-col"
          >
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <span className="bg-amber-100 text-amber-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {product.category}
                </span>
                {product.featured && (
                  <span className="ml-2 bg-amber-500 text-white text-xs font-medium px-2.5 py-0.5 rounded-full">
                    Популярное
                  </span>
                )}
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
              <p className="text-2xl font-bold text-amber-700 mb-4">{product.price} ₽</p>
              <p className="text-gray-600 mb-6">{product.description}</p>
            </div>
            
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <span className="text-gray-700 mr-4">Количество:</span>
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                    className="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="px-4 py-2 text-gray-700">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className="p-2 text-gray-500 hover:text-gray-700"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  variant="primary" 
                  size="lg" 
                  fullWidth
                  icon={<ShoppingCart size={18} />}
                  onClick={handleAddToCart}
                >
                  Добавить в корзину
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  icon={<Heart size={18} />}
                  onClick={handleSaveForLater}
                >
                  Сохранить
                </Button>
              </div>
            </div>
            
            <div className="mt-auto border-t border-gray-200 pt-4">
              <div className="flex items-center text-green-600 mb-2">
                <Check size={16} className="mr-1" />
                <span>В наличии</span>
              </div>
              <p className="text-sm text-gray-500">
                Доставка в течение 30-60 минут
              </p>
            </div>
          </motion.div>
        </div>
      </div>
      
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Рекомендуемые товары</h2>
        {/* Recommended products would go here */}
      </div>
    </div>
  );
};

export default ProductDetailPage;