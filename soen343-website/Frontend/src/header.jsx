import React, { useState } from 'react';
import './header.css';
import { Link } from 'react-router-dom';
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
        <Link to="/" className="navTitleName">
          <img src={logo} alt="Logo" />
        </Link>
        <span className="site-title">Turbo Trucks</span>
      </div>

      <button className="contactus">Contact Us</button>
      

      <div className="auth-buttons">
        <button className="LogBtn">Log In</button>
        <button className="SignBtn">Sign In</button>
      </div>

      {isOpen && (
        <aside className="aside-menu">
          <ul>
            <li><Link to='/' className='desktopMenuListItem'>Home</Link></li>
            <li><Link to="/tracking" className='desktopMenuListItem'>Tracking Your Order</Link></li>
            <li><Link to="/product_purchase" className='desktopMenuListItem'> Buy a Product</Link></li>
            <li><Link to="/aboutus" className='desktopMenuListItem'>About Us</Link></li>
          </ul>
        </aside>
      )}
    </nav>
  );
}

export default Header;
