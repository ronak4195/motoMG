import React, { useEffect, useState } from 'react';
import { Item } from '../Components/Item/Item';
import { Link } from 'react-router-dom';

export default function Index() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/allproducts')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);

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
          {products.map((item, i) => (
            <Item key={i} id={item.id} name={item.name} image={item.image} price={item.price} mrp={item.mrp}/>
          ))}
        </div>
      </section>
    </div>
  );
}

