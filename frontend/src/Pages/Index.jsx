import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Item } from '../Components/Item/Item';
import { Link } from 'react-router-dom';

export default function Index() {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1 });

  const fetchProducts = useCallback(async (page = 1) => {
    try {
      const params = {page} ;
      const response = await axios.get('http://localhost:4000/allproducts', {
        params,
      });
      setProducts(response.data.products);
      setPagination({ currentPage: page, totalPages: response.data.totalPages });
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }
  ,[]
);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div>
      <div id="first-cover">
        <h4>mega-offer-products</h4>
        <h2>Super value deals</h2>
        <h1>On all products</h1>
        <p>Save more with coupons &amp; up to 70% off!</p>
        <button><Link to="/helmets">Shop Now</Link></button>
      </div>

      <section id="why-we" className="section-p1">
        <div className="why-we-card">
          <img src={require("../Components/Assets/cards/f1.png")} className="why-we-img" alt="Free Shipping" />
          <h6 className="why-we-text">Fast Delivery</h6>
        </div>
        <div className="why-we-card">
          <img src={require("../Components/Assets/cards/f2.png")} className="why-we-img" alt="Order Online" />
          <h6 className="why-we-text">Order Online</h6>
        </div>
        <div className="why-we-card">
          <img src={require("../Components/Assets/cards/f3.png")} className="why-we-img" alt="Save Money" />
          <h6 className="why-we-text">Save Money</h6>
        </div>
        <div className="why-we-card">
          <img src={require("../Components/Assets/cards/f4.png")} className="why-we-img" alt="Offline Store" />
          <h6 className="why-we-text">After Sale Service</h6>
        </div>
        <div className="why-we-card">
          <img src={require("../Components/Assets/cards/f5.png")} className="why-we-img" alt="Happy Customers" />
          <h6 className="why-we-text">Offline Support</h6>
        </div>
        <div className="why-we-card">
          <img src={require("../Components/Assets/cards/f6.png")} className="why-we-img" alt="24/7 Support" />
          <h6 className="why-we-text">24/7 Helpline</h6>
        </div>
      </section>

      <section id="products" className="section-p1">
        <div className="banner">
          <h2 className="banner-text">Featured Products</h2>
          <button>Explore More</button>
        </div>

        <div className="products-list">
          {Array.isArray(products) && products.map((item, i) => (
            <Item key={i} id={item.id} name={item.name} image={item.image} price={item.price} mrp={item.mrp} />
          ))}
        </div>
        <div className="paginationBox">
          <button 
            disabled={pagination.currentPage === 1} 
            onClick={() => fetchProducts(pagination.currentPage - 1)}
            className="paginationBtn"
          >
            Previous
          </button>
          
          <span>
            Page {pagination.currentPage} of {pagination.totalPages}
          </span>
          
          <button 
            disabled={pagination.currentPage === pagination.totalPages} 
            onClick={() => fetchProducts(pagination.currentPage + 1)}
            className="paginationBtn"
          >
            Next
          </button>
        </div>
      </section>
    </div>
  );
}
