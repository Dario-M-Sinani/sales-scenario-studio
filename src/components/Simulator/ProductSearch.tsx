// src/pages/Simulador/components/ProductSearch.tsx

import React, { useState } from 'react';
import styles from './ProductSearch.module.css';

interface ProductSearchProps {
  onSearch: (query: string) => void;
}

const ProductSearch: React.FC<ProductSearchProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        placeholder="Buscar por código de producto..."
        value={query}
        onChange={handleSearch}
        className={styles.searchInput}
      />
    </div>
  );
};

export default ProductSearch;