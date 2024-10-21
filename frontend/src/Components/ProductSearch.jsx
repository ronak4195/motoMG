import React, { useState } from 'react';

function ProductSearch({ setSearchParams }) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');

  const handleSearch = () => {
    setSearchParams({ name, category });
  };

  return (
    <div>
      <input type="text" placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default ProductSearch;
