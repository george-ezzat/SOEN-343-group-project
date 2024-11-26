import React, { useState, useRef } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase.js';  // Import your Firestore instance
import { Autocomplete } from '@react-google-maps/api';
import "./Delivery.css";
import Header from "../Header/Header";

export default function Delivery() {

  const [formData, setFormData] = useState({
    startLocation: '',
    endLocation: '',
    packageLength: '',
    packageWidth: '',
    packageHeight: '',
    shippingType: 'free',
  });

  const pickupRef = useRef(null);
  const dropoffRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleShippingTypeChange = (type) => {
    setFormData({ ...formData, shippingType: type });
  };

  const handlePlaceChanged = (name, ref) => {
    const place = ref.current.getPlace();
    if (place && place.formatted_address) {
      setFormData({ ...formData, [name]: place.formatted_address });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const deliveryRef = collection(db, 'deliveries');
      await addDoc(deliveryRef, formData);
      alert('Delivery created successfully!');
      setFormData({
        startLocation: '',
        endLocation: '',
        packageLength: '',
        packageWidth: '',
        packageHeight: '',
        packageWeight: '',
        shippingType: 'free',
      });
    } catch (error) {
      console.error('Error creating delivery:', error);
      alert('Failed to create delivery');
    }
  };

  return (
    <>
      <Header />
      <div className="delivery-form-container">
        <h2>Create a Delivery</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <label>Pick-up Location</label>
              <Autocomplete
                onLoad={(autocomplete) => { 
                  pickupRef.current = autocomplete;
                  pickupRef.current.setComponentRestrictions({ country: 'ca' });
                }}
                onPlaceChanged={() => handlePlaceChanged('startLocation', pickupRef)}
              >
                <input
                  type="text"
                  placeholder="Pick-up Location"
                  className="input-box"
                  value={formData.startLocation}
                  onChange={(e) => handleChange({ target: { name: 'startLocation', value: e.target.value } })}
                  required
                />
              </Autocomplete>
            </div>
            <div className="input-container">
              <label>Drop-off Destination</label>
              <Autocomplete
                onLoad={(autocomplete) => { dropoffRef.current = autocomplete;
                  dropoffRef.current.setComponentRestrictions({ country: 'ca' });
                 }}
                onPlaceChanged={() => handlePlaceChanged('endLocation', dropoffRef)}
              >
                <input
                  type="text"
                  placeholder="Drop-off Destination"
                  className="input-box"
                  value={formData.endLocation}
                  onChange={(e) => handleChange({ target: { name: 'endLocation', value: e.target.value } })}
                  required
              />
              </Autocomplete>
            </div>
            <div className="input-container">
              <label>Package Dimensions (cm)</label>
              <input
                type="number"
                name="packageLength"
                placeholder="Length"
                className="input-box"
                value={formData.packageLength}
                min="0"
                max="274"
                onChange={handleChange}
                required
              />
              <input
                type="number"
                name="packageWidth"
                placeholder="Width"
                className="input-box"
                value={formData.packageWidth}
                min="0"
                max="274"
                onChange={handleChange}
                required
              />
              <input
                type="number"
                name="packageHeight"
                placeholder="Height"
                className="input-box"
                value={formData.packageHeight}
                min="0"
                max="274"
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-container">
              <label>Package Weight (kg)</label>
              <input
                type="number"
                name="packageWeight"
                placeholder="Weight"
                className="input-box"
                value={formData.packageWeight}
                min="0"
                max="68"
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-container">
              <label>Shipping Type</label>
              <div className="shipping-options">
                <div
                    className={`shipping-option ${formData.shippingType === 'free' ? 'selected' : ''}`}
                    onClick={() => handleShippingTypeChange('free')}
                >
                    Free Shipping (3-5 business days)
                </div>
                <div
                    className={`shipping-option ${formData.shippingType === 'express' ? 'selected' : ''}`}
                    onClick={() => handleShippingTypeChange('express')}
                >
                    Express Shipping (1-2 business days)
                </div>
              </div>
            </div>
            <button type="submit" className="submit-btn">Create Delivery</button>
          </form>
      </div>
    </>
  );
};