import React, { useState } from 'react';
import './AccountModal.css';
import { auth, db } from '../../firebase'; 
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const SignUpModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      // Create the user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Check if the user already exists in Firestore (Users collection)
      const userRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userRef);

      // If the user doesn't exist in Firestore, create a new document (excluding password)
      if (!userDoc.exists()) {
        await setDoc(userRef, {
          email: user.email,   
          uid: user.uid,       
          accType: 'customer', 
          firstName: firstName, 
          lastName: lastName,
        });
      }

      // Clear input fields after sign-up
      setEmail('');
      setPassword('');
      setFirstName('');
      setLastName('');

      setSuccessMessage('Sign up successful!');
      console.log('User signed up and saved to Firestore: ', user);
    } catch (error) {
      setErrorMessage(error.message);
      console.log('Error signing up: ', error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>X</button>
        <p>Sign Up</p>

        {errorMessage && <div className="error-message">{errorMessage}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>}

        <form onSubmit={handleSignup}>
          
          <label htmlFor="firstName"></label>
          <input
            id="firstName"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
            required
          />

          <label htmlFor="lastName"></label>
          <input
            id="lastName"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
            required
          />
          
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />

          <button className="continue-button" type="submit" disabled={loading}>
            {loading ? 'Signing Up...' : 'Continue'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpModal;
