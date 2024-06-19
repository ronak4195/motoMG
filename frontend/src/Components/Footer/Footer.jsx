import React from 'react'
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer id="footer">
        <div classname="footer-column">
          <h3>Store</h3>
          <Link to="/helmets">Helmets</Link><br />
          <Link to="/ridinggears">Riding Gears</Link><br />
          <Link to="/accessories">Accessories</Link><br />
        </div>
        <div classname="footer-column">
          <h3>Support</h3>
          <Link to="/">Shipping Policy</Link><br />
          <Link to="/">Refund/Exchange Policy</Link><br />
          <Link to="/">Accessories</Link><br />
        </div>
      </footer>
    );
}
