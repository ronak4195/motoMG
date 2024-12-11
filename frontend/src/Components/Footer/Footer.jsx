import React from 'react'
import { Link } from 'react-router-dom';
import "./Footer.css"

export default function Footer() {
  return (
    <footer id ="footerID">
      <div id="footer">
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
        </div>
        <div className='footerRights'>
          <h2>All Rights Reserved</h2>
          <h3 className='footerBuilt'>Built by <a href="https://portfolio-phi-vert-46.vercel.app/" id='footerRonakJain'>Ronak Jain</a></h3>
        </div>
      </footer>
    );
}
