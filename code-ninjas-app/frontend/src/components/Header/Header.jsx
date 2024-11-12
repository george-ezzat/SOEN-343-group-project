import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import logo from '../../Images/Logo.webp';
import './Header.css';
import AccountModal from '../AccountModal/LoginModal';
import SignUpModal from '../AccountModal/SignUpModal';
import ChatModal from '../AccountModal/Chatbot';

function Header() {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      setUser(null);
    }).catch((error) => {
      console.error('Error signing out: ', error);
    });
  };

  const toggleSideMenu = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };

  const openAccountModal = () => {
    setIsAccountModalOpen(true);
  };
  const closeAccountModal = () => {
    setIsAccountModalOpen(false);
  };

  const openSignUpModal = () => {
    setIsSignUpModalOpen(true);
  };
  const closeSignUpModal = () => {
    setIsSignUpModalOpen(false);
  };

  const openChatModal = () => {
    setIsChatModalOpen(true);
  };
  const closeChatModal = () => {
    setIsChatModalOpen(false);
  };

  return (
    <nav className="navbar">
      <button className="menu-toggle" onClick={toggleSideMenu}>
        &#9776;
      </button>

      <div className="logo-title">
        <NavLink to="/" className="navTitleName">
          <img src={logo} className="logo-image" alt="Logo" />
        </NavLink>
        <span className="site-title">TurboTrucks</span>
      </div>

      <button className="contactus" onClick={openChatModal}>Contact Us</button>

      <div className="auth-buttons">
        {user ? (
          <button className="user-email" onClick={handleLogout}>{user.email}</button>
        ) : (
          <>
            <button className="LoginBtn" onClick={openAccountModal}>Log In</button>
            <button className="SignupBtn" onClick={openSignUpModal}>Sign Up</button>
          </>
        )}
      </div>

      {isAccountModalOpen && <AccountModal isOpen={isAccountModalOpen} onClose={closeAccountModal} />}
      {isSignUpModalOpen && <SignUpModal isOpen={isSignUpModalOpen} onClose={closeSignUpModal} />}
      {isChatModalOpen && <ChatModal isOpen={isChatModalOpen} onClose={closeChatModal} />}

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
