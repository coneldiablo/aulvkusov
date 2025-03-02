import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart } from 'lucide-react';
import { Product } from '../../types';
import { useCartStore } from '../../store/cartStore';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem, saveForLater } = useCartStore();
  
  const handleAddToCart = () => {
    addItem(product);
  };
  
  const handleSaveForLater = () => {
    saveForLater(product);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: [0.32, 1.25, 0.32, 1] }}
    >
      <Card hover className="h-full flex flex-col">
        <div className="relative overflow-hidden">
          <motion.img 
            src={product.image} 
            alt={product.name} 
            className="h-48 w-full object-cover transition-transform duration-500"
            whileHover={{ scale: 1.05 }}
          />
          {product.featured && (
            <motion.div 
              className="absolute top-2 left-2"
              initial={{ opacity: 0, scale: 0.8, x: -20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <Badge variant="primary">Популярное</Badge>
            </motion.div>
          )}
        </div>
        <div className="p-4 flex-grow flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold text-amber-900">{product.name}</h3>
            <span className="text-amber-700 font-bold">{product.price} ₽</span>
          </div>
          <p className="text-gray-600 mb-4 flex-grow">{product.description}</p>
          <div className="flex space-x-2 mt-auto">
            <Button 
              variant="primary" 
              onClick={handleAddToCart} 
              fullWidth
              icon={<ShoppingCart size={16} />}
            >
              В корзину
            </Button>
            <motion.button
              className="p-2 bg-amber-50 text-amber-700 rounded-full hover:bg-amber-100 transition-colors"
              whileHover={{ scale: 1.1, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleSaveForLater}
            >
              <Heart size={18} />
            </motion.button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default ProductCard;