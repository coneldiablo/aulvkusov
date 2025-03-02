import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';
import { CreditCard, MapPin, Truck, Check, ChevronRight } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useOrderStore } from '../store/orderStore';
import { useAuthStore } from '../store/authStore';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';
import Spinner from '../components/ui/Spinner';
import Alert from '../components/ui/Alert';

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, clearCart } = useCartStore();
  const { addOrder } = useOrderStore();
  const { user, isAuthenticated } = useAuthStore();
  
  const [activeStep, setActiveStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [redirected, setRedirected] = useState(false);
  
  // Form states
  const [contactInfo, setContactInfo] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: ''
  });
  
  const [shippingInfo, setShippingInfo] = useState({
    address: '',
    city: 'Москва',
    postalCode: '',
    instructions: ''
  });
  
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: ''
  });
  
  const [paymentMethod, setPaymentMethod] = useState('card');
  
  // Check if cart is empty and redirect to cart page
  useEffect(() => {
    if (items.length === 0 && !redirected) {
      setRedirected(true);
      navigate('/cart');
    }
  }, [items.length, navigate, redirected]);
  
  const totalPrice = items.reduce(
    (total, item) => total + item.product.price * item.quantity, 
    0
  );
  
  const handleContactInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContactInfo(prev => ({ ...prev, [name]: value }));
  };
  
  const handleShippingInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({ ...prev, [name]: value }));
  };
  
  const handlePaymentInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentInfo(prev => ({ ...prev, [name]: value }));
  };
  
  const handleNextStep = () => {
    setActiveStep(prev => prev + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handlePrevStep = () => {
    setActiveStep(prev => prev - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleSubmitOrder = async () => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Create order object
      const newOrder = {
        id: uuidv4(),
        userId: user?.id || 'guest',
        items: [...items],
        status: 'pending' as const,
        total: totalPrice,
        createdAt: new Date(),
        updatedAt: new Date(),
        shippingAddress: {
          fullName: contactInfo.name,
          street: shippingInfo.address,
          city: shippingInfo.city,
          state: '',
          postalCode: shippingInfo.postalCode,
          phone: contactInfo.phone
        }
      };
      
      // Add order to store
      const success = await addOrder(newOrder);
      
      if (success) {
        // Clear cart and navigate
        clearCart();
        navigate(`/order-confirmation/${newOrder.id}`);
      } else {
        setError('Произошла ошибка при оформлении заказа. Пожалуйста, попробуйте снова.');
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Error submitting order:', error);
      setError('Произошла ошибка при оформлении заказа. Пожалуйста, попробуйте снова.');
      setIsSubmitting(false);
    }
  };
  
  // If cart is empty, don't render the checkout page
  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Ваша корзина пуста</h2>
        <p className="text-gray-600 mb-8">Добавьте товары в корзину, чтобы оформить заказ</p>
        <Link to="/menu">
          <Button variant="primary">Перейти в меню</Button>
        </Link>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-amber-900 mb-2">Оформление заказа</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Заполните необходимую информацию для оформления заказа
        </p>
      </motion.div>
      
      {/* Checkout Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-center">
          <div className="flex items-center w-full max-w-3xl">
            {[1, 2, 3].map((step) => (
              <React.Fragment key={step}>
                <div className="relative flex flex-col items-center">
                  <motion.div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      activeStep >= step 
                        ? 'bg-amber-600 text-white' 
                        : 'bg-gray-200 text-gray-600'
                    }`}
                    whileHover={{ scale: 1.1 }}
                    animate={{ 
                      scale: activeStep === step ? [1, 1.1, 1] : 1,
                      boxShadow: activeStep >= step ? "0 0 0 4px rgba(217, 119, 6, 0.2)" : "none"
                    }}
                    transition={{ 
                      scale: { 
                        repeat: activeStep === step ? Infinity : 0, 
                        repeatType: "reverse", 
                        duration: 2 
                      }
                    }}
                  >
                    {activeStep > step ? (
                      <Check size={20} />
                    ) : (
                      <span>{step}</span>
                    )}
                  </motion.div>
                  <div className="mt-2 text-xs text-center">
                    {step === 1 && 'Контактная информация'}
                    {step === 2 && 'Доставка'}
                    {step === 3 && 'Оплата'}
                  </div>
                </div>
                {step < 3 && (
                  <motion.div 
                    className={`flex-1 h-1 mx-2 ${
                      activeStep > step ? 'bg-amber-600' : 'bg-gray-200'
                    }`}
                    animate={{ 
                      backgroundColor: activeStep > step ? '#B45309' : '#E5E7EB'
                    }}
                    transition={{ duration: 0.5 }}
                  ></motion.div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
      
      {error && (
        <Alert 
          type="error" 
          message={error} 
          onClose={() => setError(null)} 
          className="mb-6"
        />
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            {/* Step 1: Contact Information */}
            {activeStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: [0.32, 1.25, 0.32, 1] }}
                className="p-6"
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Контактная информация</h2>
                <div className="space-y-4">
                  <Input
                    label="Имя"
                    name="name"
                    value={contactInfo.name}
                    onChange={handleContactInfoChange}
                    fullWidth
                    required
                  />
                  <Input
                    label="Email"
                    name="email"
                    type="email"
                    value={contactInfo.email}
                    onChange={handleContactInfoChange}
                    fullWidth
                    required
                  />
                  <Input
                    label="Телефон"
                    name="phone"
                    type="tel"
                    value={contactInfo.phone}
                    onChange={handleContactInfoChange}
                    fullWidth
                    required
                  />
                  
                  <div className="pt-4 flex justify-end">
                    <Button 
                      variant="primary" 
                      onClick={handleNextStep}
                      disabled={!contactInfo.name || !contactInfo.email || !contactInfo.phone}
                    >
                      Продолжить
                      <ChevronRight size={16} className="ml-1" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
            
            {/* Step 2: Shipping Information */}
            {activeStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: [0.32, 1.25, 0.32, 1] }}
                className="p-6"
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Информация о доставке</h2>
                <div className="space-y-4">
                  <Input
                    label="Адрес"
                    name="address"
                    value={shippingInfo.address}
                    onChange={handleShippingInfoChange}
                    fullWidth
                    required
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Город"
                      name="city"
                      value={shippingInfo.city}
                      onChange={handleShippingInfoChange}
                      fullWidth
                    />
                    <Input
                      label="Почтовый индекс"
                      name="postalCode"
                      value={shippingInfo.postalCode}
                      onChange={handleShippingInfoChange}
                      fullWidth
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 pl-1">
                      Инструкции для доставки (необязательно)
                    </label>
                    <textarea
                      name="instructions"
                      value={shippingInfo.instructions}
                      onChange={handleShippingInfoChange}
                      rows={3}
                      className="w-full px-4 py-2 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all duration-300"
                      placeholder="Код домофона, этаж, и т.д."
                    ></textarea>
                  </div>
                  
                  <div className="pt-4 flex justify-between">
                    <Button 
                      variant="outline" 
                      onClick={handlePrevStep}
                    >
                      Назад
                    </Button>
                    <Button 
                      variant="primary" 
                      onClick={handleNextStep}
                      disabled={!shippingInfo.address}
                    >
                      Продолжить
                      <ChevronRight size={16} className="ml-1" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
            
            {/* Step 3: Payment Information */}
            {activeStep === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: [0.32, 1.25, 0.32, 1] }}
                className="p-6"
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Способ оплаты</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center space-x-4">
                    <motion.div
                      className={`flex-1 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                        paymentMethod === 'card'
                          ? 'border-amber-500 bg-amber-50'
                          : 'border-gray-200 hover:border-amber-300'
                      }`}
                      onClick={() => setPaymentMethod('card')}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center">
                        <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                          paymentMethod === 'card' ? 'border-amber-500' : 'border-gray-300'
                        }`}>
                          {paymentMethod === 'card' && (
                            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                          )}
                        </div>
                        <div className="flex items-center">
                          <CreditCard size={20} className="mr-2 text-gray-600" />
                          <span>Банковская карта</span>
                        </div>
                      </div>
                    </motion.div>
                    
                    <motion.div
                      className={`flex-1 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                        paymentMethod === 'cash'
                          ? 'border-amber-500 bg-amber-50'
                          : 'border-gray-200 hover:border-amber-300'
                      }`}
                      onClick={() => setPaymentMethod('cash')}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center">
                        <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                          paymentMethod === 'cash' ? 'border-amber-500' : 'border-gray-300'
                        }`}>
                          {paymentMethod === 'cash' && (
                            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                          )}
                        </div>
                        <div className="flex items-center">
                          <Truck size={20} className="mr-2 text-gray-600" />
                          <span>Наличными при получении</span>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
                
                {paymentMethod === 'card' && (
                  <div className="space-y-4 mb-6">
                    <Input
                      label="Номер карты"
                      name="cardNumber"
                      value={paymentInfo.cardNumber}
                      onChange={handlePaymentInfoChange}
                      placeholder="1234 5678 9012 3456"
                      fullWidth
                    />
                    <Input
                      label="Имя на карте"
                      name="cardName"
                      value={paymentInfo.cardName}
                      onChange={handlePaymentInfoChange}
                      placeholder="IVAN IVANOV"
                      fullWidth
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        label="Срок действия"
                        name="expiry"
                        value={paymentInfo.expiry}
                        onChange={handlePaymentInfoChange}
                        placeholder="MM/YY"
                        fullWidth
                      />
                      <Input
                        label="CVV"
                        name="cvv"
                        type="password"
                        value={paymentInfo.cvv}
                        onChange={handlePaymentInfoChange}
                        placeholder="123"
                        fullWidth
                      />
                    </div>
                  </div>
                )}
                
                <div className="pt-4 flex justify-between">
                  <Button 
                    variant="outline" 
                    onClick={handlePrevStep}
                  >
                    Назад
                  </Button>
                  <Button 
                    variant="primary" 
                    onClick={handleSubmitOrder}
                    disabled={isSubmitting || (paymentMethod === 'card' && (!paymentInfo.cardNumber || !paymentInfo.cardName || !paymentInfo.expiry || !paymentInfo.cvv))}
                  >
                    {isSubmitting ? (
                      <>
                        <Spinner size="sm" color="white" className="mr-2" />
                        Обработка...
                      </>
                    ) : (
                      'Оформить заказ'
                    )}
                  </Button>
                </div>
              </motion.div>
            )}
          </Card>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="sticky top-24">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Ваш заказ</h2>
              <div className="max-h-64 overflow-y-auto mb-4">
                {items.map((item) => (
                  <div key={item.product.id} className="flex items-center py-2 border-b border-gray-100 last:border-0">
                    <div className="w-12 h-12 flex-shrink-0 mr-3">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between">
                        <h3 className="text-sm font-medium text-gray-800">
                          {item.product.name} <span className="text-gray-500">x{item.quantity}</span>
                        </h3>
                        <span className="text-sm font-medium">{item.product.price * item.quantity} ₽</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
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
              <div className="flex items-center text-green-600 mb-2">
                <Truck size={16} className="mr-2" />
                <span className="text-sm">Бесплатная доставка</span>
              </div>
              <div className="flex items-center text-amber-600">
                <MapPin size={16} className="mr-2" />
                <span className="text-sm">Доставка в течение 30-60 минут</span>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default CheckoutPage;