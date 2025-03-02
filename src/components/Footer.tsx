import React from 'react';
import { Instagram, Facebook, Phone, Mail, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Footer = () => {
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
        duration: 0.5,
        ease: [0.32, 1.25, 0.32, 1]
      }
    }
  };

  return (
    <motion.footer 
      className="bg-amber-900 text-amber-100"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
    >
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-bold mb-4">Аул вкусов</h3>
            <p className="mb-4">
              Традиционная кавказская кухня в самом сердце города. Мы предлагаем аутентичные блюда, 
              приготовленные по старинным рецептам.
            </p>
            <div className="flex space-x-4">
              <motion.a 
                href="#" 
                className="hover:text-white transition-colors duration-300"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Instagram />
              </motion.a>
              <motion.a 
                href="#" 
                className="hover:text-white transition-colors duration-300"
                whileHover={{ scale: 1.2, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Facebook />
              </motion.a>
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-bold mb-4">Контакты</h3>
            <ul className="space-y-2">
              <motion.li 
                className="flex items-center"
                whileHover={{ x: 5 }}
              >
                <Phone size={16} className="mr-2" />
                <span>+7 (999) 123-45-67</span>
              </motion.li>
              <motion.li 
                className="flex items-center"
                whileHover={{ x: 5 }}
              >
                <Mail size={16} className="mr-2" />
                <span>info@aulvkusov.ru</span>
              </motion.li>
              <motion.li 
                className="flex items-start"
                whileHover={{ x: 5 }}
              >
                <MapPin size={16} className="mr-2 mt-1" />
                <span>ул. Пушкина, д. 10, Москва, 123456</span>
              </motion.li>
            </ul>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-bold mb-4">Часы работы</h3>
            <ul className="space-y-2">
              <li>
                <span className="font-medium">Понедельник - Четверг:</span>
                <p>12:00 - 23:00</p>
              </li>
              <li>
                <span className="font-medium">Пятница - Воскресенье:</span>
                <p>12:00 - 00:00</p>
              </li>
            </ul>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-bold mb-4">Подписка</h3>
            <p className="mb-4">
              Подпишитесь на нашу рассылку, чтобы получать новости о специальных предложениях и мероприятиях.
            </p>
            <form className="flex flex-col space-y-2">
              <motion.input 
                type="email" 
                placeholder="Ваш email" 
                className="px-4 py-2 bg-amber-800 border border-amber-700 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-600 text-amber-100 placeholder-amber-300"
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              />
              <motion.button 
                type="submit" 
                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 rounded-full transition"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Подписаться
              </motion.button>
            </form>
          </motion.div>
        </div>
        
        <motion.div 
          className="border-t border-amber-800 mt-8 pt-8 text-center"
          variants={itemVariants}
        >
          <p>&copy; {new Date().getFullYear()} Аул вкусов. Все права защищены.</p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;