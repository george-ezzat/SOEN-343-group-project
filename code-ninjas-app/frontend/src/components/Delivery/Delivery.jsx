import React, { useState, useRef } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase.js';  // Import your Firestore instance
import { Autocomplete } from '@react-google-maps/api';
import "./Delivery.css";
import Header from "../Header/Header";
import Delivery from '../../models/Delivery.js';

export default function DeliveryPage() {

  const [formData, setFormData] = useState({
    startLocation: '',
    nameOfSender: '',
    endLocation: '',
    nameOfRecipient: '',
    packageLength: '',
    packageWidth: '',
    packageHeight: '',
    shippingType: 'free',
  });

  const [errors, setErrors] = useState({
    packageLength: '',
    packageWidth: '',
    packageHeight: '',
    packageWeight: '',
    startLocation: '',
    endLocation: '',
  });

  const [isStartLocationValid, setIsStartLocationValid] = useState(false);
  const [isEndLocationValid, setIsEndLocationValid] = useState(false);

  const pickupRef = useRef(null);
  const dropoffRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
     }));
  
    let error = '';
    if (name === 'packageLength' || name === 'packageWidth' || name === 'packageHeight') {
      if (value > 274) {
        error = 'Max dimensions exceeded (max 274cm)';
      }
    } else if (name === 'packageWeight') {
      if (value > 68) {
        error = 'Max weight exceeded (max 68kg)';
      }
    }

    setErrors((prevErrors) => ({
      ...prevErrors, 
      [name]: error, 
    }));
  };

  const handleShippingTypeChange = (type) => {
    setFormData({ ...formData, shippingType: type });
  };

  const handlePlaceChanged = (name, ref) => {
    const place = ref.current.getPlace();
    if (place && place.formatted_address) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: place.formatted_address,
      }));
      if (name === 'startLocation') {
        setIsStartLocationValid(true);
      } else if (name === 'endLocation') {
        setIsEndLocationValid(true);
      }
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: '',
      }));
      if (name === 'startLocation') {
        setIsStartLocationValid(false);
      } else if (name === 'endLocation') {
        setIsEndLocationValid(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let hasError = false;
    const newErrors = { ...errors };

    if (!isStartLocationValid) {
      newErrors.startLocation = 'Please enter a valid pick-up location';
      hasError = true;
    } else {
      newErrors.startLocation = '';
    }

    if (!isEndLocationValid) {
      newErrors.endLocation = 'Please enter a valid drop-off location';
      hasError = true;
    } else {
      newErrors.endLocation = '';
    }

    setErrors(newErrors);

    if (hasError) {
      return;
    }

    try {
      const newDelivery = new Delivery(
        formData.startLocation,
        formData.nameOfSender,
        formData.endLocation,
        formData.nameOfRecipient,
        formData.packageLength,
        formData.packageWidth,
        formData.packageHeight,
        formData.packageWeight,
        formData.shippingType
      );

      const deliveryRef = collection(db, 'deliveries');
      await addDoc(deliveryRef, newDelivery.toPlainObject());
      alert('Delivery created successfully!');
      console.log(newDelivery);
      setFormData({
        startLocation: '',
        nameOfSender: '',
        endLocation: '',
        nameOfRecipient: '',
        packageLength: '',
        packageWidth: '',
        packageHeight: '',
        packageWeight: '',
        shippingType: 'free',
      });
      setIsStartLocationValid(false);
      setIsEndLocationValid(false);
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
        <div className="separator"></div>
          <form onSubmit={handleSubmit}>
          <label className='bold-label'>Sender Details</label>
            <div className="ship-details-container">
              <div className="input-container">
                <label>Pick-Up Location</label>
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
                    className={`input-box ${errors.startLocation ? 'error' : ''}`}
                    value={formData.startLocation}
                    onChange={(e) => handleChange({ target: { name: 'startLocation', value: e.target.value } })}
                    required
                  />
                </Autocomplete>
                {errors.startLocation && <span className="error-message">{errors.startLocation}</span>}
              </div>
              <div className="input-container">
                <label>Name of Sender</label>
                <input
                  type="text"
                  placeholder="Sender's Name"
                  className="input-box"
                  value={formData.nameOfSender}
                  onChange={(e) => handleChange({ target: { name: 'nameOfSender', value: e.target.value } })}
                  required
                />
              </div>
            </div>
            <div className="separator"></div>
            <label className='bold-label'>Recipient Details</label>
            <div className="ship-details-container">
              <div className="input-container">
                <label>Drop-Off Location</label>
                <Autocomplete
                  onLoad={(autocomplete) => { dropoffRef.current = autocomplete;
                    dropoffRef.current.setComponentRestrictions({ country: 'ca' });
                  }}
                  onPlaceChanged={() => handlePlaceChanged('endLocation', dropoffRef)}
                >
                  <input
                    type="text"
                    placeholder="Drop-off Destination"
                    className={`input-box ${errors.endLocation ? 'error' : ''}`}
                    value={formData.endLocation}
                    onChange={(e) => handleChange({ target: { name: 'endLocation', value: e.target.value } })}
                    required
                />
                </Autocomplete>
                {errors.endLocation && <span className="error-message">{errors.endLocation}</span>}
              </div>
              <div className="input-container">
                <label>Name of Recipient</label>
                <input
                  type="text"
                  placeholder="Recipient's Name"
                  className="input-box"
                  value={formData.nameOfRecipient}
                  onChange={(e) => handleChange({ target: { name: 'nameOfRecipient', value: e.target.value } })}
                  required
                />
              </div>
            </div>
            <div className="separator"></div>
            <div className="input-container">
              <label>Package Dimensions (cm)</label>
              <input
                type="number"
                name="packageLength"
                placeholder="Length"
                className={`input-box ${errors.packageLength ? 'error' : ''}`}
                value={formData.packageLength}
                min="0"
                max="274"
                onChange={handleChange}
                required
              />
              {errors.packageLength && <span className="error-message">{errors.packageLength}</span>}
              <input
                type="number"
                name="packageWidth"
                placeholder="Width"
                className={`input-box ${errors.packageWidth ? 'error' : ''}`}
                value={formData.packageWidth}
                min="0"
                max="274"
                onChange={handleChange}
                required
              />
              {errors.packageWidth && <span className="error-message">{errors.packageWidth}</span>}
              <input
                type="number"
                name="packageHeight"
                placeholder="Height"
                className={`input-box ${errors.packageHeight ? 'error' : ''}`}
                value={formData.packageHeight}
                min="0"
                max="274"
                onChange={handleChange}
                required
              />
              {errors.packageHeight && <span className="error-message">{errors.packageHeight}</span>}
            </div>
            <div className="input-container">
              <label>Package Weight (kg)</label>
              <input
                type="number"
                name="packageWeight"
                placeholder="Weight"
                className={`input-box ${errors.packageWeight ? 'error' : ''}`}
                value={formData.packageWeight}
                min="0"
                max="68"
                step="0.1"
                onChange={handleChange}
                required
              />
              {errors.packageWeight && <span className="error-message">{errors.packageWeight}</span>}
            </div>
            <div className="separator"></div>
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
