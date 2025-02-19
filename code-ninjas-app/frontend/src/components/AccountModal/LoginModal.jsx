import React, { useState } from 'react';
import './AccountModal.css';
import FirebaseSingleton from '../../firebase.js';
import { signInWithEmailAndPassword } from 'firebase/auth';

const AccountModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const auth = FirebaseSingleton.getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      setEmail('');
      setPassword('');
      setSuccessMessage('Sign in successful!');
      console.log('User signed in: ', user);
      onClose();
    } catch (error) {
      setErrorMessage(error.message);
      console.log('Error: ', error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>X</button>
        <p>Log in to your account</p>

        {errorMessage && <div className="error-message">{errorMessage}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>}

        <form onSubmit={handleSignin}>
          <label htmlFor="email"></label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />

          <label htmlFor="password"></label>
          <input
           id="password"
           type="password" 
           onChange={(e) => setPassword(e.target.value)} 
           value={password} 
           placeholder="Password"
           required 
          />

        <button className='continue-button' type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Continue'}</button>        
        </form>
      </div>
    </div>
  );
};

export default AccountModal;