import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Save } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Alert from '../../components/ui/Alert';

const UserProfilePage: React.FC = () => {
  const { user } = useAuthStore();
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+7 (999) 123-45-67',
    address: 'ул. Пушкина, д. 10, кв. 42',
    city: 'Москва',
    postalCode: '123456'
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate saving
    setShowSuccessAlert(true);
    setTimeout(() => setShowSuccessAlert(false), 3000);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-amber-900 mb-2">Мой профиль</h1>
        <p className="text-gray-600">
          Управляйте своей личной информацией и настройками аккаунта
        </p>
      </motion.div>
      
      {showSuccessAlert && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="mb-6"
        >
          <Alert 
            type="success" 
            message="Профиль успешно обновлен" 
            onClose={() => setShowSuccessAlert(false)} 
          />
        </motion.div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">Личная информация</h2>
            </div>
            <div className="p-6">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <Input
                    label="Имя"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    icon={<User size={18} className="text-gray-400" />}
                    fullWidth
                  />
                  
                  <Input
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    icon={<Mail size={18} className="text-gray-400" />}
                    fullWidth
                  />
                  
                  <Input
                    label="Телефон"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    icon={<Phone size={18} className="text-gray-400" />}
                    fullWidth
                  />
                </div>
                
                <div className="border-t border-gray-200 pt-6 mt-6">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Адрес доставки</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <Input
                      label="Адрес"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      fullWidth
                    />
                    
                    <Input
                      label="Город"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      fullWidth
                    />
                    
                    <Input
                      label="Почтовый индекс"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      fullWidth
                    />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button 
                    type="submit" 
                    variant="primary"
                    icon={<Save size={16} />}
                  >
                    Сохранить изменения
                  </Button>
                </div>
              </form>
            </div>
          </Card>
        </div>
        
        <div>
          <Card className="mb-6">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">Информация об аккаунте</h2>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-center mb-6">
                <div className="w-24 h-24 rounded-full bg-amber-200 flex items-center justify-center text-amber-700 text-3xl font-bold">
                  {user?.name.charAt(0)}
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-gray-500">Имя:</span>
                  <p className="font-medium">{user?.name}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Email:</span>
                  <p className="font-medium">{user?.email}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Статус:</span>
                  <p className="font-medium">Активный</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Дата регистрации:</span>
                  <p className="font-medium">01.01.2023</p>
                </div>
              </div>
            </div>
          </Card>
          
          <Card>
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">Статистика</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Всего заказов:</span>
                  <span className="font-medium">{user?.orders.length || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Избранные товары:</span>
                  <span className="font-medium">{user?.savedItems.length || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Бонусные баллы:</span>
                  <span className="font-medium text-amber-700">250</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;