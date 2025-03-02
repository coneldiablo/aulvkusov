import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';
import Button from '../components/ui/Button';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full text-center"
      >
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-amber-700">404</h1>
          <h2 className="text-2xl font-semibold text-gray-800 mt-4 mb-2">Страница не найдена</h2>
          <p className="text-gray-600">
            Извините, страница, которую вы ищете, не существует или была перемещена.
          </p>
        </div>
        
        <Link to="/">
          <Button 
            variant="primary" 
            size="lg"
            icon={<Home size={18} />}
          >
            Вернуться на главную
          </Button>
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;