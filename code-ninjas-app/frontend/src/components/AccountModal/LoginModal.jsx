import React, { useState } from 'react';
import './AccountModal.css';

const AccountModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', email);
  }

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>X</button>
        <p>Log in to your account</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email"></label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            placeholder='Email'
            required
          />
          <input type="password" placeholder='Password' required />
          <button className='continue-button' type="submit">Continue</button>
        </form>
      </div>
    </div>
  );
};

export default AccountModal;