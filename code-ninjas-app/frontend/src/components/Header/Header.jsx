import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore';
import logo from '../../Images/Logo.webp';
import AI from '../../Images/bot_4712066.png'
import './Header.css';
import AccountModal from '../AccountModal/LoginModal';
import SignUpModal from '../AccountModal/SignUpModal';
import ChatModal from '../AccountModal/Chatbot';
import { db } from '../../firebase.js';

function Header() {
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        try {
          const userRef = doc(db, "users", user.uid);  
          const userDoc = await getDoc(userRef);
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setIsAdmin(userData.isAdmin || false); 
          }
        } catch (error) {
          console.error("Error fetching user data: ", error);
        }
      } else {
        setUser(null);
        setIsAdmin(false); 
      }
    });
  
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      setUser(null);
      setIsAdmin(false);
    }).catch((error) => {
      console.error('Error signing out: ', error);
    });
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
    <div className="header-container">
      <div className="logo-title">
        <Link to="/" className="navTitleName">
          <img src={logo} className="logo-image" alt="Logo" />
        </Link>
        <span className="site-title">TurboTrucks</span>
      </div>

      <div className="menu">
        <Link to="/" exact className="desktopMenuListItem">Home</Link>
        <Link to="/delivery" className="desktopMenuListItem">Start a Delivery</Link>
        <Link to="/tracking" className="desktopMenuListItem">Tracking Your Order</Link>
        <Link to="/aboutus" className="desktopMenuListItem">About Us</Link>
        {isAdmin && (
          <Link to="/adminview" className="desktopMenuListItem">Admin Management</Link>
        )}
      </div>

      <div className='chatbot-container'>
        <button className="contactus" onClick={openChatModal}>Contact Us</button>
        <img src={AI} className="AI" alt="AI"/>
      </div>

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
    </div>
  );
}

export default Header;
