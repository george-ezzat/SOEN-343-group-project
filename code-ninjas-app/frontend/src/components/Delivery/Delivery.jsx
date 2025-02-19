import React, { useState } from 'react';
import "./Delivery.css";
import Header from "../Header/Header";
import { useLocation, useNavigate } from 'react-router-dom';
import ComponentFactory from '../ComponentFactory';

export default function DeliveryPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const initialFormData = location.state?.formData || {
    startLocation: '',
    nameOfSender: '',
    endLocation: '',
    nameOfRecipient: '',
    packageLength: '',
    packageWidth: '',
    packageHeight: '',
    packageWeight: '',
    shippingType: 'free',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});

  const handlePlaceSelected = (locationType, address) => {
    setFormData(prevState => ({
      ...prevState,
      [locationType]: address
    }));
  };

  const handleChange = ({ target: {name, value } }) => {
    const newValue = name === 'packageLength' || name === 'packageWidth' || name === 'packageHeight' || name === 'packageWeight'
      ? value === '' ? '' : parseInt(value, 10)
      : value;

    setFormData(prevState => ({
      ...prevState,
      [name]: newValue
     }));

     if (name === 'packageLength' || name === 'packageWidth' || name === 'packageHeight') {
       if (newValue <= 0) {
         setErrors(prevState => ({
           ...prevState,
           [name]: 'Value must be greater than 0'
         }));
       } else if (newValue > 274) {
         setErrors(prevState => ({
           ...prevState,
           [name]: 'Max dimension exceeded (max: 274)'
         }));
        } else {
          setErrors(prevState => ({
            ...prevState,
            [name]: ''
          }));
        }
      }

      if (name === 'packageWeight') {
        if (newValue <= 0) {
          setErrors(prevState => ({
            ...prevState,
            [name]: 'Value must be greater than 0'
          }));
        } else if (newValue > 68) {
          setErrors(prevState => ({
            ...prevState,
            [name]: 'Max weight exceeded (max: 68)'
          }));
        } else {
          setErrors(prevState => ({
            ...prevState,
            [name]: ''
          }));
        }
      }
    };

  const handleShippingTypeChange = (type) => {
    setFormData(prevState => ({
      ...prevState,
      shippingType: type
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Object.values(errors).some(error => error)) {
      alert('Please fix the errors in the form before submitting.');
      return;
    }

    navigate('/payment', { state: { formData } });
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
            <div className='input-container'>
              <div className='input-box long-input'>
                {ComponentFactory.createComponent('AutocompleteInput', {
                  placeholder: 'Pick-up Location',
                  locationType: 'startLocation',
                  onPlaceSelected: handlePlaceSelected,
                  initialValue: formData.startLocation
                })}
              </div>
            </div>
            <div className="input-container">
              <div className="input-box">
              <label>Name of Sender</label>
              <input
                type="text"
                placeholder="Sender's Name"
                className="input-box"
                name="nameOfSender"
                value={formData.nameOfSender}
                onChange={handleChange}
                required
              />
              </div>
            </div>
          </div>
          <div className="separator"></div>
          <label className='bold-label'>Recipient Details</label>
          <div className="ship-details-container">
            <div className='input-container'>
              <div className="input-box long-input">
                {ComponentFactory.createComponent('AutocompleteInput', {
                  placeholder: 'Drop-off Location',
                  locationType: 'endLocation',
                  onPlaceSelected: handlePlaceSelected,
                  initialValue: formData.endLocation
                })}
            </div>
            </div>
            <div className="input-container">
            <div className="input-box">
              <label>Name of Recipient</label>
              <input
                type="text"
                placeholder="Recipient's Name"
                name="nameOfRecipient"
                className="input-box"
                value={formData.nameOfRecipient}
                onChange={handleChange}
                required
              />
              </div>
            </div>
          </div>
          <div className="separator"></div>
          <label className='package-details-label'>Package Details</label>
          <div className='package-details-row'>
          <div className="input-container">
            <label className="package-label">Package Length (cm)</label>
            <input
              type="text"
              name="packageLength"
              placeholder="Length"
              className={`package-input small-input" ${errors.packageLength ? 'error' : ''}`}
              value={formData.packageLength}
              onChange={handleChange}
              min={0}
              max={274}
              required
            />
            {errors.packageLength && <span className="error-message">{errors.packageLength}</span>}
          </div>
          <div className="input-container">
            <label className="package-label">Package Width (cm)</label>
            <input
              type="text"
              name="packageWidth"
              placeholder="Width"
              className={`package-input small-input ${errors.packageWidth ? 'error' : ''}`}
              value={formData.packageWidth}
              onChange={handleChange}
              min={0}
              max={274}
              required
            />
            {errors.packageWidth && <span className="error-message">{errors.packageWidth}</span>}
          </div>
          <div className="input-container">
          <label className="package-label">Package Height (cm)</label>
          <input
            type="text"
            name="packageHeight"
            placeholder="Height"
            className={`package-input small-input ${errors.packageHeight ? 'error' : ''}`}
            value={formData.packageHeight}
            onChange={handleChange}
            min={0}
            max={274}
            required
          />
          {errors.packageHeight && <span className="error-message">{errors.packageHeight}</span>}
          </div>
          </div>
          <div className="input-container">
            <label className="package-label">Package Weight (kg)</label>
            <input
              type="number"
              name="packageWeight"
              placeholder="Weight"
              className={`package-input small-input ${errors.packageWeight ? 'error' : ''}`}
              value={formData.packageWeight}
              min="0"
              max="68"
              onChange={handleChange}
              required
            />
            {errors.packageWeight && <span className="error-message">{errors.packageWeight}</span>}
          </div>
          <div className="separator"></div>
          <div className="input-container">
            <label>Shipping Type</label>
            <div className="shipping-options">
              <button
                type="button"
                className={`shipping-option ${formData.shippingType === 'free' ? 'selected' : ''}`}
                onClick={() => handleShippingTypeChange('free')}
              >
                Free Shipping (3-5 Business Days)
              </button>
              <button
                type="button"
                className={`shipping-option ${formData.shippingType === 'express' ? 'selected' : ''}`}
                onClick={() => handleShippingTypeChange('express')}
              >
                Express Shipping (1-2 Business Days)
              </button>
            </div>
          </div>
          <div className="separator"></div>
          <button type="submit" className="submit-btn">Continue</button>
        </form>
      </div>
    </>
  );
};
