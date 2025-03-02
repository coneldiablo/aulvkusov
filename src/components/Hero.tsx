import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section id="main" className="relative h-[80vh] bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")' }}>
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
        <motion.h1 
          className="text-4xl md:text-6xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.68, -0.55, 0.27, 1.55] }}
        >
          Аул вкусов
        </motion.h1>
        <motion.p 
          className="text-xl md:text-2xl text-amber-100 mb-8 max-w-2xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.68, -0.55, 0.27, 1.55] }}
        >
          Традиционная кавказская кухня в самом сердце города
        </motion.p>
        <motion.div 
          className="flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4, ease: [0.68, -0.55, 0.27, 1.55] }}
        >
          <motion.button 
            className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 shadow-lg"
            whileHover={{ 
              scale: 1.05, 
              y: -5,
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.1)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/contact">Забронировать стол</Link>
          </motion.button>
          <motion.button 
            className="bg-transparent hover:bg-white hover:bg-opacity-20 text-white border-2 border-white font-bold py-3 px-8 rounded-full transition duration-300"
            whileHover={{ 
              scale: 1.05, 
              y: -5,
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/menu">Посмотреть меню</Link>
          </motion.button>
        </motion.div>
      </div>
      
      {/* Animated shapes */}
      <motion.div 
        className="absolute bottom-10 left-10 w-20 h-20 rounded-full bg-amber-500 opacity-20"
        animate={{ 
          y: [0, -20, 0],
          scale: [1, 1.1, 1],
          rotate: [0, 10, 0]
        }}
        transition={{ 
          duration: 5, 
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      <motion.div 
        className="absolute top-20 right-20 w-16 h-16 rounded-full bg-amber-300 opacity-20"
        animate={{ 
          y: [0, 20, 0],
          scale: [1, 1.2, 1],
          rotate: [0, -10, 0]
        }}
        transition={{ 
          duration: 7, 
          repeat: Infinity,
          repeatType: "reverse",
          delay: 1
        }}
      />
      <motion.div 
        className="absolute bottom-40 right-40 w-24 h-24 rounded-full bg-amber-400 opacity-10"
        animate={{ 
          y: [0, -30, 0],
          scale: [1, 1.3, 1],
          rotate: [0, 15, 0]
        }}
        transition={{ 
          duration: 9, 
          repeat: Infinity,
          repeatType: "reverse",
          delay: 2
        }}
      />
    </section>
  );
};

export default Hero;