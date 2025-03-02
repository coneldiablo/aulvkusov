import React from 'react';
import { motion } from 'framer-motion';

interface ColorPaletteProps {
  palette: {
    name: string;
    primary: string;
    secondary: string;
    accent1: string;
    accent2: string;
    accent3: string;
    background: string;
  };
  onClick?: () => void;
  isSelected?: boolean;
  className?: string;
}

const ColorPalette: React.FC<ColorPaletteProps> = ({
  palette,
  onClick,
  isSelected = false,
  className = '',
}) => {
  return (
    <motion.div
      className={`p-3 rounded-lg cursor-pointer ${isSelected ? 'ring-2 ring-blue-500' : 'hover:bg-gray-50'} ${className}`}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="mb-2">
        <h3 className="text-sm font-medium">{palette.name}</h3>
      </div>
      
      <div className="flex space-x-1 mb-2">
        <div 
          className="h-8 flex-grow rounded-md" 
          style={{ background: palette.primary }}
        />
        <div 
          className="h-8 flex-grow rounded-md" 
          style={{ background: palette.secondary }}
        />
      </div>
      
      <div className="flex space-x-1">
        <div 
          className="h-4 flex-grow rounded-md" 
          style={{ background: palette.accent1 }}
        />
        <div 
          className="h-4 flex-grow rounded-md" 
          style={{ background: palette.accent2 }}
        />
        <div 
          className="h-4 flex-grow rounded-md" 
          style={{ background: palette.accent3 }}
        />
      </div>
    </motion.div>
  );
};

export default ColorPalette;