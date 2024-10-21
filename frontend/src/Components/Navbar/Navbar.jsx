import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../Assets/gearPITblackwobg.png";
import burgerIcon from "../Assets/icon/burgerred.png";
import closeIcon from "../Assets/icon/closered.png";
import shoppingBagIcon from "../Assets/icon/shoppingbagred.png";
import shoppingBagIconWhite from "../Assets/icon/shoppingBagIconWhite.png";
import Burger from "../Burger/Burger";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const [menu, setMenu] = useState("HOME");
  const [displayBurg, setDisplayBurg] = useState(false);
  const [isBurgerIcon, setIsBurgerIcon] = useState(true);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const name = localStorage.getItem("user-first-name");
    if (name) {
      setUserName(name);
    } else {
      setUserName("Hello");
    }
  }, []);

  const handleClick = () => {
    setIsBurgerIcon(!isBurgerIcon);
    setDisplayBurg(!displayBurg);
  };

  const closeBurger = () => {
    setIsBurgerIcon(true);
    setDisplayBurg(false);
  };

  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    if (inputValue.trim()) {
      navigate(`/product?name=${inputValue}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("auth-token");
    localStorage.removeItem("user-first-name");
    localStorage.removeItem("userId");
    localStorage.removeItem("user");
    setUserName("");
  };

  return (
    <>
      <div id="shopify-section-header">
        <div className="container">
          <div className="header">
            <nav className="header-navigation" role="navigation">
              <img
                src={isBurgerIcon ? burgerIcon : closeIcon}
                onClick={handleClick}
                alt=""
                className="header-icon-image"
              />
            </nav>
            <img
              src={logo}
              alt="gearPIT"
              className="logo-image"
              onClick={() => {
                setMenu("HOME");
                navigate("/");
              }}
            />
            <div id="header-content">
              <li>
                <Link
                  to="/"
                  onClick={() => setMenu("HOME")}
                  className={menu === "HOME" ? "active" : ""}
                >
                  HOME
                </Link>
              </li>
              <li>
                <Link
                  to="/helmets"
                  onClick={() => setMenu("HELMETS")}
                  className={menu === "HELMETS" ? "active" : ""}
                >
                  HELMETS
                </Link>
              </li>
              <li>
                <Link
                  to="/ridinggears"
                  onClick={() => setMenu("rg")}
                  className={menu === "rg" ? "active" : ""}
                >
                  RIDING GEARS
                </Link>
              </li>
              <li>
                <Link
                  to="/accessories"
                  onClick={() => setMenu("acc")}
                  className={menu === "acc" ? "active" : ""}
                >
                  ACCESSORIES
                </Link>
              </li>
              <li>
                <Link
                  to="/contactus"
                  onClick={() => setMenu("cont")}
                  className={menu === "cont" ? "active" : ""}
                >
                  CONTACT US
                </Link>
              </li>
            </div>
            <div className="header-secondary-link">
              <div className="header-icon-list">
                <div className="searchBar">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={inputValue}
                    onChange={handleInputChange}
                    className="search"
                  />
                  <button className="searchSubmit" onClick={handleSubmit}>
                    Submit
                  </button>
                </div>

                <div className="loginNavbar">
                  {localStorage.getItem("auth-token") ? (
                    <div className="loginNavbarButton" onClick={handleLogout}>
                      {userName}
                    </div>
                  ) : (
                    <Link to="/login" onClick={() => setMenu("profile")} style={{ textDecoration: 'none' }}>
                      <div className="loginNavbarButton">LogIn</div>
                    </Link>
                  )}
                </div>
                <div className="cart">
                  <Link to="/cart" onClick={() => setMenu("cart")}>
                    <img
                      src={
                        menu === "cart" ? shoppingBagIconWhite : shoppingBagIcon
                      }
                      alt=""
                      className="header-icon-image"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Burger displayBurg={displayBurg} closeBurger={closeBurger} />
      <div className="searchBarMobile">
        <input
          type="text"
          placeholder="Search..."
          value={inputValue}
          onChange={handleInputChange}
          className="searchMobile"
        />
        <button className="searchSubmitMobile" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </>
  );
};
