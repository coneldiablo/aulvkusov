import React, { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  label?: string;
  options: SelectOption[];
  error?: string;
  fullWidth?: boolean;
  onChange?: (value: string) => void;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, error, fullWidth = false, onChange, className = '', ...props }, ref) => {
    const baseStyles = 'px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 appearance-none';
    const widthStyles = fullWidth ? 'w-full' : '';
    const errorStyles = error ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-amber-500';
    
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      if (onChange) {
        onChange(e.target.value);
      }
    };
    
    return (
      <div className={`${fullWidth ? 'w-full' : ''} mb-4`}>
        {label && (
          <motion.label 
            className="block text-sm font-medium text-gray-700 mb-1 pl-1"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {label}
          </motion.label>
        )}
        <div className="relative">
          <motion.select
            ref={ref}
            className={`${baseStyles} ${widthStyles} ${errorStyles} ${className}`}
            onChange={handleChange}
            whileFocus={{ scale: 1.01, boxShadow: "0 0 0 3px rgba(180, 83, 9, 0.2)" }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            {...props}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </motion.select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
            <motion.div
              animate={{ rotate: props.value ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown size={16} />
            </motion.div>
          </div>
        </div>
        {error && (
          <motion.p 
            className="mt-1 text-sm text-red-600 pl-1"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {error}
          </motion.p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;