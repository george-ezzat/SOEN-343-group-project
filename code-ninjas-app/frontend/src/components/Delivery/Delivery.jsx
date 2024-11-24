import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase.js';  // Import your Firestore instance
import "./Delivery.css";
import Header from "../Header/Header";

export default function Delivery() {
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [dimensions, setDimensions] = useState({ length: '', width: '', height: '' });
  const [weight, setWeight] = useState('');
  const [shippingType, setShippingType] = useState('free');
  const [deliveryResponse, setDeliveryResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const delivery = {
      pickup,
      dropoff,
      dimensions,
      weight,
      shippingType,
    };

    try {
        const docRef = await addDoc(collection(db, 'deliveries'), delivery);
        console.log('Delivery created with ID:', docRef.id);
        setDeliveryResponse({ id: docRef.id, ...delivery });
    } catch (error) {
        console.error('Error creating delivery:', error);
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
                <input
                  type="text"
                  placeholder="Pick-up Location"
                  className="input-box"
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  required
                />
                <input
                    type="text"
                    placeholder="Sender Name or Company"
                    className="input-box"
                    value={pickup.name}
                    onChange={(e) => setPickup({ ...pickup, name: e.target.value })}
                    required
                />
            </div>
            <div className="input-container">
              <label>Drop-off Destination</label>
                <input
                    type="text"
                    placeholder="Drop-off Destination"
                    className="input-box"
                    value={dropoff}
                    onChange={(e) => setDropoff(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Recipient Name or Company"
                    className="input-box"
                    value={dropoff.name}
                    onChange={(e) => setDropoff({ ...pickup, name: e.target.value })}
                    required
                />
            </div>
            <div className="input-container">
              <label>Package Dimensions (cm)</label>
              <input
                type="number"
                placeholder="Length"
                className="input-box"
                value={dimensions.length}
                min="0"
                max="274"
                onChange={(e) => setDimensions({ ...dimensions, length: e.target.value })}
                required
              />
              <input
                type="number"
                placeholder="Width"
                className="input-box"
                value={dimensions.width}
                min="0"
                max="274"
                onChange={(e) => setDimensions({ ...dimensions, width: e.target.value })}
                required
              />
              <input
                type="number"
                placeholder="Height"
                className="input-box"
                value={dimensions.height}
                min="0"
                max="274"
                onChange={(e) => setDimensions({ ...dimensions, height: e.target.value })}
                required
              />
            </div>
            <div className="input-container">
              <label>Package Weight (kg)</label>
              <input
                type="number"
                placeholder="Weight"
                className="input-box"
                value={weight}
                min="0"
                max="68"
                onChange={(e) => setWeight(e.target.value)}
                required
              />
            </div>
            <div className="input-container">
              <label>Shipping Type</label>
              <div className="shipping-options">
                <div
                    className={`shipping-option ${shippingType === 'free' ? 'selected' : ''}`}
                    onClick={() => setShippingType('free')}
                >
                    Free Shipping (3-5 business days)
                </div>
                <div
                    className={`shipping-option ${shippingType === 'express' ? 'selected' : ''}`}
                    onClick={() => setShippingType('express')}
                >
                    Express Shipping (1-2 business days)
                </div>
              </div>
            </div>
            <button type="submit" className="submit-btn">Create Delivery</button>
          </form>
          {deliveryResponse && (
          <div className="delivery-response">
            <h3>Delivery Created Successfully</h3>
            <pre>{JSON.stringify(deliveryResponse, null, 2)}</pre>
          </div>
          )}
      </div>
    </>
  );
};