import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './PaymentPage.css';
import Header from '../Header/Header';
import { calculateCost } from '../../models/costCalculator';
import { addDelivery } from '../../models/deliveryService';

const getCurrentMonthYear = () => {
  const today = new Date();
  const month = String(today.getMonth() + 2).padStart(2, "0");
  const year = today.getFullYear();
  return `${year}-${month}`;
};

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { formData } = location.state || {};

  const [cardNumber, setCardNumber] = useState("");
  const [cardholderName, setCardholderName] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCVV] = useState("");
  const [distance, setDistance] = useState(0);
  
  useEffect(() => {
    if (formData) {
        calculateDistance(formData.startLocation, formData.endLocation);
    }
  }, [formData]);

  const calculateDistance = (origin, destination) => {
    const service = new window.google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
        {
            origins: [origin],
            destinations: [destination],
            travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (response, status) => {
            if (status === "OK") {
                const distanceInMeters = response.rows[0].elements[0].distance.value;
                const distanceInKm = distanceInMeters / 1000;
                setDistance(distanceInKm);
            } else {
                alert("Error calculating distance", status);
            }
        }
    );
  };

  if (!formData) {
    return <div>No delivery information available.</div>;
  }

  const {
    startLocation,
    nameOfSender,
    endLocation,
    nameOfRecipient,
    packageLength,
    packageWidth,
    packageHeight,
    packageWeight,
    shippingType,
  } = formData;

  const { weightCost, dimensionCost, distanceCost, shippingCost, } = calculateCost(
    packageWeight,
    packageLength,
    packageWidth,
    packageHeight,
    distance,
    shippingType
  );

  const totalCost = weightCost + dimensionCost + shippingCost + distanceCost;

  const handleReset = () => {
    setCardNumber("");
    setCardholderName("");
    setBillingAddress("");
    setExpiryDate("");
    setCVV("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
        const newDelivery = {
            startLocation,
            nameOfSender,
            endLocation,
            nameOfRecipient,
            packageLength,
            packageWidth,
            packageHeight,
            packageWeight,
            shippingType,
            totalCost,
        }
        
        const result = await addDelivery(newDelivery);
        if (result.success) {
            alert('Payment successful! Your order has been placed.');
            navigate('/transactionapproved', { state: { orderId: result.id } });
        } else {
            alert('An error occurred while processing your payment. Please try again.');
        }
    }
  };

  const validateForm = () => {
    if (cardNumber.length !== 16 || isNaN(Number(cardNumber))) {
      alert("Please enter a valid credit card number (16 digits)");
      return false;
    }
    if (cvv.length !== 3 || isNaN(Number(cvv))) {
      alert("Please enter a valid CVV (3 digits)");
      return false;
    }
    if (!cardholderName.trim()) {
      alert("Please enter the cardholder name");
      return false;
    }
    if (!billingAddress.trim()) {
      alert("Please enter the billing address");
      return false;
    }
    if (!expiryDate) {
      alert("Please enter the expiry date");
      return false;
    }
    const today = new Date();
    const selectedDate = new Date(expiryDate);
    if (selectedDate < today) {
        alert("Please enter a valid expiry date");
        return false;
    }
    return true;
  };

  return (
    <>
        <Header />
        <div className="payment-page">
          <h2>Payment Details</h2>
          <div className="delivery-info">
            <h3>Delivery Information</h3>
            <p><strong>Pick-up Location:</strong> {startLocation}</p>
            <p><strong>Name of Sender:</strong> {nameOfSender}</p>
            <p><strong>Drop-off Location:</strong> {endLocation}</p>
            <p><strong>Name of Recipient:</strong> {nameOfRecipient}</p>
            <p><strong>Package Length:</strong> {packageLength} cm</p>
            <p><strong>Package Width:</strong> {packageWidth} cm</p>
            <p><strong>Package Height:</strong> {packageHeight} cm</p>
            <p><strong>Package Weight:</strong> {packageWeight} kg</p>
            <p><strong>Shipping Type:</strong> {shippingType}</p>
          </div>
        <div className="billing-info">
          <h3>Billing Information</h3>
          <p><strong>Base Cost:</strong> ${distanceCost.toFixed(2)}</p>
          <p><strong>Weight Cost:</strong> ${weightCost.toFixed(2)}</p>
          <p><strong>Dimension Cost:</strong> ${dimensionCost.toFixed(2)}</p>
          <p><strong>Shipping Option:</strong> ${shippingCost.toFixed(2)}</p>
          <p><strong>Total Cost:</strong> ${totalCost.toFixed(2)}</p>
        </div>
        <hr className='separator' />
        <div className="payment-form">
          <h2>Payment Form</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
            <label>Amount</label>
              <input
                type="text"
                value={totalCost.toFixed(2)}
                readOnly
              />
            </div>
            <div className="form-group">
              <label>Card Number</label>
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                maxLength={16}
                required
              />
            </div>
            <div className="form-group">
              <label>Cardholder Name</label>
              <input
                type="text"
                value={cardholderName}
                onChange={(e) => setCardholderName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Billing Address</label>
              <input
                type="text"
                value={billingAddress}
                onChange={(e) => setBillingAddress(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Expiry Date</label>
              <input
                type="month"
                min={getCurrentMonthYear()}
                placeholder="MM/YY"
                required
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>CVV</label>
              <input
                type="text"
                value={cvv}
                maxLength={3}
                placeholder="555"
                onChange={(e) => setCVV(e.target.value)}
                required
              />
            </div>
            <div className='buttons'>
              <button type="submit" className="submit-btn">Submit Payment</button>
              <button type="button" className="reset-btn" onClick={handleReset}>Reset </button>
            </div>
          </form>
        </div>
    </div>
    </>
  );
};

export default PaymentPage;