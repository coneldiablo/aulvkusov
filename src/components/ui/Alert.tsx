import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle, Info, X } from 'lucide-react';

interface AlertProps {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  onClose?: () => void;
  className?: string;
}

const Alert: React.FC<AlertProps> = ({
  type,
  message,
  onClose,
  className = '',
}) => {
  const typeStyles = {
    success: 'bg-green-50 text-green-800 border-green-200',
    error: 'bg-red-50 text-red-800 border-red-200',
    warning: 'bg-yellow-50 text-yellow-800 border-yellow-200',
    info: 'bg-blue-50 text-blue-800 border-blue-200',
  };
  
  const iconMap = {
    success: <CheckCircle size={20} className="text-green-500" />,
    error: <AlertCircle size={20} className="text-red-500" />,
    warning: <AlertCircle size={20} className="text-yellow-500" />,
    info: <Info size={20} className="text-blue-500" />,
  };
  
  return (
    <motion.div
      className={`flex items-center p-4 mb-4 border-2 rounded-2xl ${typeStyles[type]} ${className}`}
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.4, ease: [0.68, -0.55, 0.27, 1.55] }}
    >
      <div className="mr-3 flex-shrink-0">{iconMap[type]}</div>
      <div className="flex-grow">{message}</div>
      {onClose && (
        <motion.button
          onClick={onClose}
          className="ml-auto flex-shrink-0 text-gray-400 hover:text-gray-500 p-1 rounded-full hover:bg-white hover:bg-opacity-30"
          whileHover={{ rotate: 90, scale: 1.1 }}
          transition={{ duration: 0.2 }}
        >
          <X size={18} />
        </motion.button>
      )}
    </motion.div>
  );
};

export default Alert;