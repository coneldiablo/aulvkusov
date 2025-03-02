import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Lock, Bell, Eye, EyeOff } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Tabs from '../../components/ui/Tabs';
import Alert from '../../components/ui/Alert';

const UserSettingsPage: React.FC = () => {
  const { user } = useAuthStore();
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    orderUpdates: true,
    marketingEmails: false,
    specialOffers: true
  });
  
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handleNotificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setNotificationSettings(prev => ({ ...prev, [name]: checked }));
  };
  
  const handleSavePassword = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate saving
    setShowSuccessAlert(true);
    setTimeout(() => setShowSuccessAlert(false), 3000);
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };
  
  const handleSaveNotifications = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate saving
    setShowSuccessAlert(true);
    setTimeout(() => setShowSuccessAlert(false), 3000);
  };
  
  const tabs = [
    {
      id: 'security',
      label: 'Безопасность',
      content: (
        <form onSubmit={handleSavePassword}>
          <div className="space-y-4">
            <div className="relative">
              <Input
                label="Текущий пароль"
                name="currentPassword"
                type={showPassword ? "text" : "password"}
                value={passwordForm.currentPassword}
                onChange={handlePasswordChange}
                fullWidth
                required
              />
              <button
                type="button"
                className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            
            <div className="relative">
              <Input
                label="Новый пароль"
                name="newPassword"
                type={showPassword ? "text" : "password"}
                value={passwordForm.newPassword}
                onChange={handlePasswordChange}
                fullWidth
                required
              />
            </div>
            
            <div className="relative">
              <Input
                label="Подтвердите новый пароль"
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                value={passwordForm.confirmPassword}
                onChange={handlePasswordChange}
                fullWidth
                required
                error={
                  passwordForm.newPassword && 
                  passwordForm.confirmPassword && 
                  passwordForm.newPassword !== passwordForm.confirmPassword
                    ? 'Пароли не совпадают'
                    : undefined
                }
              />
            </div>
            
            <div className="pt-4">
              <Button 
                type="submit" 
                variant="primary"
                icon={<Save size={16} />}
                disabled={
                  !passwordForm.currentPassword || 
                  !passwordForm.newPassword || 
                  !passwordForm.confirmPassword ||
                  (passwordForm.newPassword !== passwordForm.confirmPassword)
                }
              >
                Обновить пароль
              </Button>
            </div>
          </div>
        </form>
      )
    },
    {
      id: 'notifications',
      label: 'Уведомления',
      content: (
        <form onSubmit={handleSaveNotifications}>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-md">
              <div>
                <h3 className="font-medium text-gray-800">Email уведомления</h3>
                <p className="text-sm text-gray-500">Получать уведомления по электронной почте</p>
              </div>
              <div className="relative inline-block w-12 h-6">
                <input
                  type="checkbox"
                  id="emailNotifications"
                  name="emailNotifications"
                  checked={notificationSettings.emailNotifications}
                  onChange={handleNotificationChange}
                  className="opacity-0 w-0 h-0"
                />
                <label
                  htmlFor="emailNotifications"
                  className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-all duration-300 ${
                    notificationSettings.emailNotifications ? 'bg-amber-600' : 'bg-gray-300'
                  }`}
                >
                  <span 
                    className={`absolute left-1 bottom-1 bg-white w-4 h-4 rounded-full transition-all duration-300 ${
                      notificationSettings.emailNotifications ? 'transform translate-x-6' : ''
                    }`}
                  ></span>
                </label>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-md">
              <div>
                <h3 className="font-medium text-gray-800">Обновления заказов</h3>
                <p className="text-sm text-gray-500">Получать уведомления о статусе заказов</p>
              </div>
              <div className="relative inline-block w-12 h-6">
                <input
                  type="checkbox"
                  id="orderUpdates"
                  name="orderUpdates"
                  checked={notificationSettings.orderUpdates}
                  onChange={handleNotificationChange}
                  className="opacity-0 w-0 h-0"
                />
                <label
                  htmlFor="orderUpdates"
                  className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-all duration-300 ${
                    notificationSettings.orderUpdates ? 'bg-amber-600' : 'bg-gray-300'
                  }`}
                >
                  <span 
                    className={`absolute left-1 bottom-1 bg-white w-4 h-4 rounded-full transition-all duration-300 ${
                      notificationSettings.orderUpdates ? 'transform translate-x-6' : ''
                    }`}
                  ></span>
                </label>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-md">
              <div>
                <h3 className="font-medium text-gray-800">Маркетинговые рассылки</h3>
                <p className="text-sm text-gray-500">Получать информацию о новых акциях и предложениях</p>
              </div>
              <div className="relative inline-block w-12 h-6">
                <input
                  type="checkbox"
                  id="marketingEmails"
                  name="marketingEmails"
                  checked={notificationSettings.marketingEmails}
                  onChange={handleNotificationChange}
                  className="opacity-0 w-0 h-0"
                />
                <label
                  htmlFor="marketingEmails"
                  className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-all duration-300 ${
                    notificationSettings.marketingEmails ? 'bg-amber-600' : 'bg-gray-300'
                  }`}
                >
                  <span 
                    className={`absolute left-1 bottom-1 bg-white w-4 h-4 rounded-full transition-all duration-300 ${
                      notificationSettings.marketingEmails ? 'transform translate-x-6' : ''
                    }`}
                  ></span>
                </label>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-md">
              <div>
                <h3 className="font-medium text-gray-800">Специальные предложения</h3>
                <p className="text-sm text-gray-500">Получать уведомления о специальных предложениях и скидках</p>
              </div>
              <div className="relative inline-block w-12 h-6">
                <input
                  type="checkbox"
                  id="specialOffers"
                  name="specialOffers"
                  checked={notificationSettings.specialOffers}
                  onChange={handleNotificationChange}
                  className="opacity-0 w-0 h-0"
                />
                <label
                  htmlFor="specialOffers"
                  className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-all duration-300 ${
                    notificationSettings.specialOffers ? 'bg-amber-600' : 'bg-gray-300'
                  }`}
                >
                  <span 
                    className={`absolute left-1 bottom-1 bg-white w-4 h-4 rounded-full transition-all duration-300 ${
                      notificationSettings.specialOffers ? 'transform translate-x-6' : ''
                    }`}
                  ></span>
                </label>
              </div>
            </div>
            
            <div className="pt-4">
              <Button 
                type="submit" 
                variant="primary"
                icon={<Save size={16} />}
              >
                Сохранить настройки
              </Button>
            </div>
          </div>
        </form>
      )
    }
  ];
  
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-amber-900 mb-2">Настройки</h1>
        <p className="text-gray-600">
          Управляйте настройками безопасности и уведомлений
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
            message="Настройки успешно сохранены" 
            onClose={() => setShowSuccessAlert(false)} 
          />
        </motion.div>
      )}
      
      <Card>
        <div className="p-6">
          <Tabs tabs={tabs} defaultTab="security" />
        </div>
      </Card>
    </div>
  );
};

export default UserSettingsPage;