import React, { useState } from 'react';
import './Header.css';
import { NavLink  } from 'react-router-dom';
import logo from './Images/Logo.webp';

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <button className="menu-toggle" onClick={toggleMenu}>
        &#9776; 
      </button>

      <div className="logo-title">
        <NavLink  to="/" className="navTitleName">
          <img src={logo} alt="Logo" />
        </NavLink >
        <span className="site-title">TurboTrucks</span>
      </div>

      <button className="contactus">Contact Us</button>
      
      
      <div className="auth-buttons">
        <button className="LogBtn">Log In</button>
        <button className="SignBtn">Sign In</button>
      </div>

      {isOpen && (
        <aside className="aside-menu">
          <ul>
          <li>
              <NavLink to="/" exact className="desktopMenuListItem" activeClassName="active">Home</NavLink>
            </li>
            <li>
              <NavLink to="/tracking" className="desktopMenuListItem" activeClassName="active">Tracking Your Order</NavLink>
            </li>
            <li>
              <NavLink to="/product_purchase" className="desktopMenuListItem" activeClassName="active">Buy a Product</NavLink>
            </li>
            <li>
              <NavLink to="/aboutus" className="desktopMenuListItem" activeClassName="active">About Us</NavLink>
            </li>
          </ul>
        </aside>
      )}
    </nav>
  );
}

export default Header;
