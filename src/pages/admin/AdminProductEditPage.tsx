import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Trash2, Image } from 'lucide-react';
import { useProductStore } from '../../store/productStore';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Alert from '../../components/ui/Alert';

const AdminProductEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products, categories, updateProduct, addProduct, deleteProduct } = useProductStore();
  
  const [isLoading, setIsLoading] = useState(true);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const emptyProduct = {
    id: '',
    name: '',
    description: '',
    price: 0,
    image: '',
    category: categories[0] || 'Основные блюда',
    available: true,
    featured: false
  };
  
  const [product, setProduct] = useState(emptyProduct);
  const isNewProduct = id === 'new';
  
  useEffect(() => {
    if (!isNewProduct && id) {
      const foundProduct = products.find(p => p.id === id);
      if (foundProduct) {
        setProduct(foundProduct);
      } else {
        navigate('/admin/products');
      }
    }
    setIsLoading(false);
  }, [id, products, navigate, isNewProduct]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setProduct(prev => ({
        ...prev,
        [name]: checked
      }));
    } else if (name === 'price') {
      setProduct(prev => ({
        ...prev,
        [name]: parseFloat(value) || 0
      }));
    } else {
      setProduct(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  
  const validateForm = () => {
    if (!product.name.trim()) {
      setErrorMessage('Название товара обязательно');
      setShowErrorAlert(true);
      return false;
    }
    
    if (!product.description.trim()) {
      setErrorMessage('Описание товара обязательно');
      setShowErrorAlert(true);
      return false;
    }
    
    if (product.price <= 0) {
      setErrorMessage('Цена должна быть больше нуля');
      setShowErrorAlert(true);
      return false;
    }
    
    if (!product.image.trim()) {
      setErrorMessage('URL изображения обязателен');
      setShowErrorAlert(true);
      return false;
    }
    
    return true;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    if (isNewProduct) {
      // Generate a random ID for new product
      const newProduct = {
        ...product,
        id: `p${Date.now()}`
      };
      addProduct(newProduct);
    } else {
      updateProduct(product.id, product);
    }
    
    setShowSuccessAlert(true);
    setTimeout(() => {
      setShowSuccessAlert(false);
      if (isNewProduct) {
        navigate('/admin/products');
      }
    }, 2000);
  };
  
  const handleDelete = () => {
    if (window.confirm('Вы уверены, что хотите удалить этот товар?')) {
      deleteProduct(product.id);
      navigate('/admin/products');
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-16 h-16 border-4 border-amber-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  return (
    <div>
      <div className="mb-6">
        <Link to="/admin/products" className="inline-flex items-center text-amber-700 hover:text-amber-800 transition-colors">
          <ArrowLeft size={16} className="mr-1" />
          <span>Назад к списку товаров</span>
        </Link>
      </div>
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          {isNewProduct ? 'Добавить новый товар' : 'Редактировать товар'}
        </h1>
        {!isNewProduct && (
          <Button 
            variant="danger" 
            icon={<Trash2 size={16} />}
            onClick={handleDelete}
          >
            Удалить товар
          </Button>
        )}
      </div>
      
      {showSuccessAlert && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="mb-6"
        >
          <Alert 
            type="success" 
            message={isNewProduct ? "Товар успешно добавлен" : "Товар успешно обновлен"} 
            onClose={() => setShowSuccessAlert(false)} 
          />
        </motion.div>
      )}
      
      {showErrorAlert && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="mb-6"
        >
          <Alert 
            type="error" 
            message={errorMessage} 
            onClose={() => setShowErrorAlert(false)} 
          />
        </motion.div>
      )}
      
      <Card>
        <form onSubmit={handleSubmit}>
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Информация о товаре</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <Input
                label="Название товара"
                name="name"
                value={product.name}
                onChange={handleChange}
                fullWidth
                required
              />
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Категория
                </label>
                <select
                  name="category"
                  value={product.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              
              <Input
                label="Цена (₽)"
                name="price"
                type="number"
                value={product.price}
                onChange={handleChange}
                fullWidth
                required
              />
              
              <Input
                label="URL изображения"
                name="image"
                value={product.image}
                onChange={handleChange}
                fullWidth
                required
              />
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Описание
                </label>
                <textarea
                  name="description"
                  value={product.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                  required
                ></textarea>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="available"
                  name="available"
                  checked={product.available}
                  onChange={handleChange}
                  className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                />
                <label htmlFor="available" className="ml-2 block text-sm text-gray-700">
                  В наличии
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="featured"
                  name="featured"
                  checked={product.featured || false}
                  onChange={handleChange}
                  className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                />
                <label htmlFor="featured" className="ml-2 block text-sm text-gray-700">
                  Популярное
                </label>
              </div>
            </div>
            
            {product.image && (
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Предпросмотр изображения</h3>
                <div className="w-full h-64 bg-gray-100 rounded-md overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
                    }}
                  />
                </div>
              </div>
            )}
          </div>
          
          <div className="p-6 flex justify-end">
            <Button 
              type="submit" 
              variant="primary"
              icon={<Save size={16} />}
            >
              {isNewProduct ? 'Создать товар' : 'Сохранить изменения'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default AdminProductEditPage;