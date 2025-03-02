import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, X, Check, Users, Calendar, Phone } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { useTableStore, Table } from '../../store/tableStore';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Alert from '../../components/ui/Alert';
import Modal from '../../components/ui/Modal';

const AdminTablesPage: React.FC = () => {
  const { tables, addTable, updateTable, deleteTable, reserveTable, closeTable } = useTableStore();
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState<'success' | 'error' | 'warning' | 'info'>('success');
  
  // Form states
  const [tableForm, setTableForm] = useState({
    number: '',
    capacity: '2'
  });
  
  const [reservationForm, setReservationForm] = useState({
    name: '',
    time: '',
    phone: ''
  });
  
  const handleAddTable = () => {
    const tableNumber = parseInt(tableForm.number);
    const capacity = parseInt(tableForm.capacity);
    
    // Validate form
    if (!tableNumber || isNaN(tableNumber)) {
      setAlertType('error');
      setAlertMessage('Пожалуйста, введите корректный номер стола');
      setShowAlert(true);
      return;
    }
    
    // Check if table number already exists
    if (tables.some(table => table.number === tableNumber)) {
      setAlertType('error');
      setAlertMessage('Стол с таким номером уже существует');
      setShowAlert(true);
      return;
    }
    
    // Add new table
    const newTable: Table = {
      id: uuidv4(),
      number: tableNumber,
      capacity: capacity || 2,
      isReserved: false
    };
    
    addTable(newTable);
    setIsAddModalOpen(false);
    setTableForm({ number: '', capacity: '2' });
    
    // Show success message
    setAlertType('success');
    setAlertMessage('Стол успешно добавлен');
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };
  
  const handleEditTable = () => {
    if (!selectedTable) return;
    
    const tableNumber = parseInt(tableForm.number);
    const capacity = parseInt(tableForm.capacity);
    
    // Validate form
    if (!tableNumber || isNaN(tableNumber)) {
      setAlertType('error');
      setAlertMessage('Пожалуйста, введите корректный номер стола');
      setShowAlert(true);
      return;
    }
    
    // Check if table number already exists (excluding the current table)
    if (tables.some(table => table.number === tableNumber && table.id !== selectedTable.id)) {
      setAlertType('error');
      setAlertMessage('Стол с таким номером уже существует');
      setShowAlert(true);
      return;
    }
    
    // Update table
    updateTable(selectedTable.id, {
      number: tableNumber,
      capacity: capacity || 2
    });
    
    setIsEditModalOpen(false);
    setSelectedTable(null);
    
    // Show success message
    setAlertType('success');
    setAlertMessage('Стол успешно обновлен');
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };
  
  const handleReserveTable = () => {
    if (!selectedTable) return;
    
    // Validate form
    if (!reservationForm.name.trim()) {
      setAlertType('error');
      setAlertMessage('Пожалуйста, введите имя');
      setShowAlert(true);
      return;
    }
    
    if (!reservationForm.time.trim()) {
      setAlertType('error');
      setAlertMessage('Пожалуйста, введите время');
      setShowAlert(true);
      return;
    }
    
    // Reserve table
    reserveTable(
      selectedTable.id,
      reservationForm.name,
      reservationForm.time,
      reservationForm.phone
    );
    
    setIsReserveModalOpen(false);
    setSelectedTable(null);
    setReservationForm({ name: '', time: '', phone: '' });
    
    // Show success message
    setAlertType('success');
    setAlertMessage('Стол успешно забронирован');
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };
  
  const handleCloseTable = (tableId: string) => {
    closeTable(tableId);
    
    // Show success message
    setAlertType('success');
    setAlertMessage('Бронирование стола отменено');
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };
  
  const handleDeleteTable = () => {
    if (!selectedTable) return;
    
    deleteTable(selectedTable.id);
    setIsDeleteModalOpen(false);
    setSelectedTable(null);
    
    // Show success message
    setAlertType('success');
    setAlertMessage('Стол успешно удален');
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };
  
  const openEditModal = (table: Table) => {
    setSelectedTable(table);
    setTableForm({
      number: table.number.toString(),
      capacity: table.capacity.toString()
    });
    setIsEditModalOpen(true);
  };
  
  const openReserveModal = (table: Table) => {
    setSelectedTable(table);
    setReservationForm({
      name: table.reservationName || '',
      time: table.reservationTime || '',
      phone: table.reservationPhone || ''
    });
    setIsReserveModalOpen(true);
  };
  
  const openDeleteModal = (table: Table) => {
    setSelectedTable(table);
    setIsDeleteModalOpen(true);
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Управление столами</h1>
        <Button 
          variant="primary" 
          icon={<Plus size={16} />}
          onClick={() => setIsAddModalOpen(true)}
        >
          Добавить стол
        </Button>
      </div>
      
      {showAlert && (
        <Alert 
          type={alertType} 
          message={alertMessage} 
          onClose={() => setShowAlert(false)} 
          className="mb-6"
        />
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tables.map((table) => (
          <motion.div
            key={table.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className={`${table.isReserved ? 'border-l-4 border-amber-500' : ''}`}>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">Стол №{table.number}</h2>
                    <div className="flex items-center mt-1">
                      <Users size={16} className="text-gray-500 mr-1" />
                      <span className="text-sm text-gray-600">Вместимость: {table.capacity}</span>
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    table.isReserved 
                      ? 'bg-amber-100 text-amber-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {table.isReserved ? 'Забронирован' : 'Свободен'}
                  </div>
                </div>
                
                {table.isReserved && (
                  <div className="mb-4 p-3 bg-amber-50 rounded-md">
                    <h3 className="font-medium text-amber-800 mb-2">Информация о бронировании</h3>
                    <div className="space-y-1">
                      <div className="flex items-start">
                        <Users size={14} className="text-amber-700 mt-1 mr-2 flex-shrink-0" />
                        <span className="text-sm">{table.reservationName}</span>
                      </div>
                      <div className="flex items-start">
                        <Calendar size={14} className="text-amber-700 mt-1 mr-2 flex-shrink-0" />
                        <span className="text-sm">{table.reservationTime}</span>
                      </div>
                      {table.reservationPhone && (
                        <div className="flex items-start">
                          <Phone size={14} className="text-amber-700 mt-1 mr-2 flex-shrink-0" />
                          <span className="text-sm">{table.reservationPhone}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
                <div className="flex flex-wrap gap-2">
                  {table.isReserved ? (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleCloseTable(table.id)}
                    >
                      Закрыть стол
                    </Button>
                  ) : (
                    <Button 
                      variant="primary" 
                      size="sm"
                      onClick={() => openReserveModal(table)}
                    >
                      Забронировать
                    </Button>
                  )}
                  <Button 
                    variant="secondary" 
                    size="sm"
                    icon={<Edit size={14} />}
                    onClick={() => openEditModal(table)}
                  >
                    Изменить
                  </Button>
                  <Button 
                    variant="danger" 
                    size="sm"
                    icon={<Trash2 size={14} />}
                    onClick={() => openDeleteModal(table)}
                  >
                    Удалить
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
      
      {/* Add Table Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Добавить новый стол"
      >
        <div className="p-6">
          <div className="space-y-4 mb-6">
            <Input
              label="Номер стола"
              name="number"
              type="number"
              value={tableForm.number}
              onChange={(e) => setTableForm({ ...tableForm, number: e.target.value })}
              fullWidth
              required
            />
            <Input
              label="Вместимость"
              name="capacity"
              type="number"
              value={tableForm.capacity}
              onChange={(e) => setTableForm({ ...tableForm, capacity: e.target.value })}
              fullWidth
              required
            />
          </div>
          
          <div className="flex justify-end space-x-3">
            <Button
              variant="outline"
              onClick={() => setIsAddModalOpen(false)}
            >
              Отмена
            </Button>
            <Button
              variant="primary"
              onClick={handleAddTable}
            >
              Добавить
            </Button>
          </div>
        </div>
      </Modal>
      
      {/* Edit Table Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Изменить стол"
      >
        <div className="p-6">
          <div className="space-y-4 mb-6">
            <Input
              label="Номер стола"
              name="number"
              type="number"
              value={tableForm.number}
              onChange={(e) => setTableForm({ ...tableForm, number: e.target.value })}
              fullWidth
              required
            />
            <Input
              label="Вместимость"
              name="capacity"
              type="number"
              value={tableForm.capacity}
              onChange={(e) => setTableForm({ ...tableForm, capacity: e.target.value })}
              fullWidth
              required
            />
          </div>
          
          <div className="flex justify-end space-x-3">
            <Button
              variant="outline"
              onClick={() => setIsEditModalOpen(false)}
            >
              Отмена
            </Button>
            <Button
              variant="primary"
              onClick={handleEditTable}
            >
              Сохранить
            </Button>
          </div>
        </div>
      </Modal>
      
      {/* Reserve Table Modal */}
      <Modal
        isOpen={isReserveModalOpen}
        onClose={() => setIsReserveModalOpen(false)}
        title={`Забронировать стол №${selectedTable?.number}`}
      >
        <div className="p-6">
          <div className="space-y-4 mb-6">
            <Input
              label="Имя"
              name="name"
              value={reservationForm.name}
              onChange={(e) => setReservationForm({ ...reservationForm, name: e.target.value })}
              fullWidth
              required
            />
            <Input
              label="Время"
              name="time"
              type="datetime-local"
              value={reservationForm.time}
              onChange={(e) => setReservationForm({ ...reservationForm, time: e.target.value })}
              fullWidth
              required
            />
            <Input
              label="Телефон"
              name="phone"
              value={reservationForm.phone}
              onChange={(e) => setReservationForm({ ...reservationForm, phone: e.target.value })}
              fullWidth
            />
          </div>
          
          <div className="flex justify-end space-x-3">
            <Button
              variant="outline"
              onClick={() => setIsReserveModalOpen(false)}
            >
              Отмена
            </Button>
            <Button
              variant="primary"
              onClick={handleReserveTable}
            >
              Забронировать
            </Button>
          </div>
        </div>
      </Modal>
      
      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Удаление стола"
        size="sm"
      >
        <div className="p-6">
          <p className="text-gray-700 mb-6">
            Вы уверены, что хотите удалить стол №{selectedTable?.number}? Это действие нельзя отменить.
          </p>
          <div className="flex justify-end space-x-3">
            <Button
              variant="outline"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Отмена
            </Button>
            <Button
              variant="danger"
              onClick={handleDeleteTable}
            >
              Удалить
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AdminTablesPage;