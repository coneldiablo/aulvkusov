import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Menu from '../components/Menu';
import { useTableStore, Table } from '../store/tableStore';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Alert from '../components/ui/Alert';

const MenuPage: React.FC = () => {
  const { tables, selectTable, selectedTable } = useTableStore();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  
  const handleSelectTable = (table: Table) => {
    selectTable(table);
    setAlertMessage(`Выбран стол №${table.number}`);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };
  
  const handleClearTable = () => {
    selectTable(null);
    setAlertMessage('Стол отменен');
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };
  
  return (
    <div className="py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 mb-8 text-center"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-amber-900 mb-2">Наше меню</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Откройте для себя богатство вкусов традиционной кавказской кухни
        </p>
        
        {selectedTable ? (
          <div className="mt-4 inline-flex items-center bg-amber-100 px-4 py-2 rounded-lg">
            <p className="text-amber-800 font-medium mr-3">Стол №{selectedTable.number}</p>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleClearTable}
            >
              Отменить
            </Button>
          </div>
        ) : (
          <div className="mt-4">
            <Button 
              variant="secondary" 
              onClick={() => document.getElementById('table-selection')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Выбрать стол
            </Button>
          </div>
        )}
      </motion.div>
      
      {showAlert && (
        <div className="fixed top-4 right-4 z-50">
          <Alert 
            type="success" 
            message={alertMessage} 
            onClose={() => setShowAlert(false)} 
          />
        </div>
      )}
      
      <Menu />
      
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="py-16 bg-white"
        id="table-selection"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-2">Выберите стол</h2>
            <div className="w-24 h-1 bg-amber-600 mx-auto mb-6"></div>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Выберите стол для вашего заказа. Это поможет нашим официантам быстрее обслужить вас.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {tables.map((table) => (
              <Card 
                key={table.id} 
                className={`cursor-pointer transition-all ${
                  selectedTable?.id === table.id 
                    ? 'ring-2 ring-amber-500' 
                    : table.isReserved 
                      ? 'opacity-50' 
                      : 'hover:shadow-lg'
                }`}
                onClick={() => !table.isReserved && handleSelectTable(table)}
              >
                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Стол №{table.number}</h3>
                  <p className="text-gray-600 mb-3">Вместимость: {table.capacity} чел.</p>
                  <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                    table.isReserved 
                      ? 'bg-red-100 text-red-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {table.isReserved ? 'Занят' : 'Свободен'}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default MenuPage;