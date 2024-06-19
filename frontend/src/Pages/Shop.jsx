import React, { useEffect, useState } from 'react';
import { Item } from '../Components/Item/Item';

export default function Shop({ category }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://localhost:4000/allproducts`);
        const data = await response.json();
        const filteredProducts = data.filter(product => product.category === category);
        setProducts(filteredProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [category]);

  return (
    <div>
      <section id="products" className="section-p1">
        <div className="products-list">
          {products.map((item, i) => (
            <Item key={i} id={item.id} name={item.name} image={item.image} price={item.price} mrp={item.mrp}/>
          ))}
        </div>
      </section>
    </div>
  );
}
