import React, { useState } from 'react';
import { NavLink  } from 'react-router-dom';
import logo from '../../Images/Logo.webp';
import './Header.css';
import AccountModal from '../AccountModal/AccountModal';

function Header() {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);

  const toggleSideMenu = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };

  //For the Sign in / Sign up Modal
  const openAccountModal = () => {
    setIsAccountModalOpen(true);
  };
  const closeAccountModal = () => {
    setIsAccountModalOpen(false);
  };

  return (
    <nav className="navbar">
      <button className="menu-toggle" onClick={toggleSideMenu}>
        &#9776; 
      </button>

      <div className="logo-title">
        <NavLink  to="/" className="navTitleName">
          <img src={logo} className="logo-image" alt="Logo" />
        </NavLink >
        <span className="site-title">TurboTrucks</span>
      </div>

      <button className="contactus">Contact Us</button>
      
      
      <div className="auth-buttons">
        <button className="SignBtn" onClick={openAccountModal}>Sign In</button>
      </div>

      {isAccountModalOpen && <AccountModal isOpen={isAccountModalOpen} onClose={closeAccountModal} />}

      {isSideMenuOpen && (
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
