import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, ChevronDown } from 'lucide-react';
import { useProductStore } from '../store/productStore';
import ProductGrid from '../components/shop/ProductGrid';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Select from '../components/ui/Select';

const ShopPage: React.FC = () => {
  const { products, categories, fetchProducts, isLoading } = useProductStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortBy, setSortBy] = useState('default');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newValue = parseInt(e.target.value);
    const newRange = [...priceRange] as [number, number];
    newRange[index] = newValue;
    setPriceRange(newRange);
  };

  const toggleFilters = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  // Filter products
  const filteredProducts = products.filter(product => {
    // Search term filter
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Category filter
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    
    // Price filter
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });

  const categoryOptions = [
    { value: 'all', label: 'Все категории' },
    ...categories.map(category => ({ value: category, label: category }))
  ];

  const sortOptions = [
    { value: 'default', label: 'По умолчанию' },
    { value: 'price-asc', label: 'Цена (по возрастанию)' },
    { value: 'price-desc', label: 'Цена (по убыванию)' },
    { value: 'name-asc', label: 'Название (А-Я)' },
    { value: 'name-desc', label: 'Название (Я-А)' }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-amber-900 mb-2">Магазин</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Выберите и закажите любимые блюда кавказской кухни с доставкой на дом или в офис
        </p>
      </motion.div>

      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-grow">
            <Input
              placeholder="Поиск товаров..."
              value={searchTerm}
              onChange={handleSearchChange}
              icon={<Search size={18} />}
              fullWidth
            />
          </div>
          <div className="flex gap-2">
            <Select
              options={sortOptions}
              value={sortBy}
              onChange={handleSortChange}
              className="w-48"
            />
            <Button
              variant="secondary"
              onClick={toggleFilters}
              icon={<Filter size={18} />}
              className="md:hidden"
            >
              Фильтры
            </Button>
          </div>
        </div>

        <motion.div
          initial={false}
          animate={{ height: isFilterOpen ? 'auto' : 0, opacity: isFilterOpen ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden md:h-auto md:opacity-100"
        >
          <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Категория</label>
                <Select
                  options={categoryOptions}
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  fullWidth
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Цена от</label>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  step="50"
                  value={priceRange[0]}
                  onChange={(e) => handlePriceChange(e, 0)}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="text-sm text-gray-600 mt-1">{priceRange[0]} ₽</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Цена до</label>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  step="50"
                  value={priceRange[1]}
                  onChange={(e) => handlePriceChange(e, 1)}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="text-sm text-gray-600 mt-1">{priceRange[1]} ₽</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="mb-4 flex justify-between items-center">
        <div className="text-sm text-gray-600">
          Найдено товаров: <span className="font-medium">{sortedProducts.length}</span>
        </div>
      </div>

      <ProductGrid products={sortedProducts} isLoading={isLoading} />
    </div>
  );
};

export default ShopPage;