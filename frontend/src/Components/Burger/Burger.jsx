import React from 'react';
import { Link } from 'react-router-dom';


const Burger = ({ displayBurg, closeBurger }) => {
  // let check = displayBurg;
  return (
    <div className="burger-menu-sidebar" style={{ display: displayBurg === true?"flex": "none"}}>
      <div className="burger-menu-list">
        <ul className="burger-menu-list-items">
          <li className="menu-list-items">
            <Link to="/" onClick={closeBurger}>Home</Link>
          </li>
          <li className="menu-list-items">
            <Link to="/helmets" onClick={closeBurger}>Helmets</Link>
          </li>
          <li className="menu-list-items">
            <Link to="/ridinggears" onClick={closeBurger}>Riding Gears</Link>
          </li>
          <li className="menu-list-items">
            <Link to="/accessories" onClick={closeBurger}>Accessories</Link>
          </li>
          <li className="menu-list-items">
            <Link to="/contactus" onClick={closeBurger}>Contact Us</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Burger;
