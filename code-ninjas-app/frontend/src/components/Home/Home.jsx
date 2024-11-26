import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./Home.css";
import Header from "../Header/Header";
import AutocompleteInput from '../AutocompleteInput';
import { useAuth } from '../AuthProvider';

export default function Home() {
  const [formData, setFormData] = useState({
    startLocation: '',
    endLocation: ''
  });

  const { currentUser } = useAuth();

  const handlePlaceSelected = (locationType, address) => {
    setFormData(prevState => ({
      ...prevState,
      [locationType]: address
    }));
  };

  const handleContinue = (e) => {
    if (!currentUser) {
      e.preventDefault();
      alert('You must be logged in to start a delivery');
    }
  }

  return (
    <>
      <Header />
      <div className='top-background'></div>
      <div className="background"/>
      <div className="content">
        <h1>Turbo Trucks</h1>
        <div className='delivery-section'>
          <h2>Start your Delivery</h2>
            <div className='input-container'>
              <div className='input-box'>
                <AutocompleteInput
                  placeholder="Pick-up Location"
                  locationType="startLocation"
                  onPlaceSelected={handlePlaceSelected}
                  initialValue={formData.startLocation}
                  className="home-page-input"
                />
              </div>
              <div className="input-box">
                <AutocompleteInput
                  placeholder="Drop-off Location"
                  locationType="endLocation"
                  onPlaceSelected={handlePlaceSelected}
                  initialValue={formData.endLocation}
                  className="home-page-input"
                />
              </div>
            </div>
          <Link to="/delivery" state={{ formData }} onClick={handleContinue}>
            <button className='SignupBtn'>Continue</button>
          </Link>
        </div>
      </div>
    </>
  );
};