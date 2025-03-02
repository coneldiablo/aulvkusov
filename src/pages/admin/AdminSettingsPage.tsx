import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, User, Lock, Bell, Globe, Database } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Tabs from '../../components/ui/Tabs';
import Alert from '../../components/ui/Alert';

const AdminSettingsPage: React.FC = () => {
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  
  const [profileForm, setProfileForm] = useState({
    name: 'Администратор',
    email: 'admin@example.com',
    phone: '+7 (999) 123-45-67'
  });
  
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    orderNotifications: true,
    marketingEmails: false,
    systemAlerts: true
  });
  
  const [generalSettings, setGeneralSettings] = useState({
    siteName: 'Аул вкусов',
    siteDescription: 'Традиционная кавказская кухня в самом сердце города',
    currency: 'RUB',
    language: 'ru',
    timeZone: 'Europe/Moscow'
  });
  
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handleNotificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setNotificationSettings(prev => ({ ...prev, [name]: checked }));
  };
  
  const handleGeneralSettingsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setGeneralSettings(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate saving
    setShowSuccessAlert(true);
    setTimeout(() => setShowSuccessAlert(false), 3000);
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
  
  const handleSaveGeneralSettings = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate saving
    setShowSuccessAlert(true);
    setTimeout(() => setShowSuccessAlert(false), 3000);
  };
  
  const tabs = [
    {
      id: 'profile',
      label: 'Профиль',
      content: (
        <form onSubmit={handleSaveProfile}>
          <div className="space-y-4">
            <Input
              label="Имя"
              name="name"
              value={profileForm.name}
              onChange={handleProfileChange}
              fullWidth
              required
            />
            <Input
              label="Email"
              name="email"
              type="email"
              value={profileForm.email}
              onChange={handleProfileChange}
              fullWidth
              required
            />
            <Input
              label="Телефон"
              name="phone"
              value={profileForm.phone}
              onChange={handleProfileChange}
              fullWidth
            />
            <div className="pt-4">
              <Button 
                type="submit" 
                variant="primary"
                icon={<Save size={16} />}
              >
                Сохранить изменения
              </Button>
            </div>
          </div>
        </form>
      )
    },
    {
      id: 'security',
      label: 'Безопасность',
      content: (
        <form onSubmit={handleSavePassword}>
          <div className="space-y-4">
            <Input
              label="Текущий пароль"
              name="currentPassword"
              type="password"
              value={passwordForm.currentPassword}
              onChange={handlePasswordChange}
              fullWidth
              required
            />
            <Input
              label="Новый пароль"
              name="newPassword"
              type="password"
              value={passwordForm.newPassword}
              onChange={handlePasswordChange}
              fullWidth
              required
            />
            <Input
              label="Подтвердите новый пароль"
              name="confirmPassword"
              type="password"
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
                <h3 className="font-medium text-gray-800">Уведомления о заказах</h3>
                <p className="text-sm text-gray-500">Получать уведомления о новых заказах</p>
              </div>
              <div className="relative inline-block w-12 h-6">
                <input
                  type="checkbox"
                  id="orderNotifications"
                  name="orderNotifications"
                  checked={notificationSettings.orderNotifications}
                  onChange={handleNotificationChange}
                  className="opacity-0 w-0 h-0"
                />
                <label
                  htmlFor="orderNotifications"
                  className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-all duration-300 ${
                    notificationSettings.orderNotifications ? 'bg-amber-600' : 'bg-gray-300'
                  }`}
                >
                  <span 
                    className={`absolute left-1 bottom-1 bg-white w-4 h-4 rounded-full transition-all duration-300 ${
                      notificationSettings.orderNotifications ? 'transform translate-x-6' : ''
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
                <h3 className="font-medium text-gray-800">Системные уведомления</h3>
                <p className="text-sm text-gray-500">Получать уведомления о системных событиях</p>
              </div>
              <div className="relative inline-block w-12 h-6">
                <input
                  type="checkbox"
                  id="systemAlerts"
                  name="systemAlerts"
                  checked={notificationSettings.systemAlerts}
                  onChange={handleNotificationChange}
                  className="opacity-0 w-0 h-0"
                />
                <label
                  htmlFor="systemAlerts"
                  className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-all duration-300 ${
                    notificationSettings.systemAlerts ? 'bg-amber-600' : 'bg-gray-300'
                  }`}
                >
                  <span 
                    className={`absolute left-1 bottom-1 bg-white w-4 h-4 rounded-full transition-all duration-300 ${
                      notificationSettings.systemAlerts ? 'transform translate-x-6' : ''
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
    },
    {
      id: 'general',
      label: 'Общие',
      content: (
        <form onSubmit={handleSaveGeneralSettings}>
          <div className="space-y-4">
            <Input
              label="Название сайта"
              name="siteName"
              value={generalSettings.siteName}
              onChange={handleGeneralSettingsChange}
              fullWidth
              required
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Описание сайта
              </label>
              <textarea
                name="siteDescription"
                value={generalSettings.siteDescription}
                onChange={(e) => setGeneralSettings(prev => ({ ...prev, siteDescription: e.target.value }))}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              ></textarea>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Валюта
                </label>
                <select
                  name="currency"
                  value={generalSettings.currency}
                  onChange={handleGeneralSettingsChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="RUB">Российский рубль (₽)</option>
                  <option value="USD">Доллар США ($)</option>
                  <option value="EUR">Евро (€)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Язык
                </label>
                <select
                  name="language"
                  value={generalSettings.language}
                  onChange={handleGeneralSettingsChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="ru">Русский</option>
                  <option value="en">English</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Часовой пояс
                </label>
                <select
                  name="timeZone"
                  value={generalSettings.timeZone}
                  onChange={handleGeneralSettingsChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="Europe/Moscow">Москва (GMT+3)</option>
                  <option value="Europe/Kaliningrad">Калининград (GMT+2)</option>
                  <option value="Asia/Yekaterinburg">Екатеринбург (GMT+5)</option>
                  <option value="Asia/Novosibirsk">Новосибирск (GMT+7)</option>
                  <option value="Asia/Vladivostok">Владивосток (GMT+10)</option>
                </select>
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
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Настройки</h1>
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
            message="Настройки успешно сохранены" 
            onClose={() => setShowSuccessAlert(false)} 
          />
        </motion.div>
      )}
      
      <Card>
        <div className="p-6">
          <Tabs tabs={tabs} defaultTab="profile" />
        </div>
      </Card>
    </div>
  );
};

export default AdminSettingsPage;