import React, { useState } from 'react'
import Header from "../Header/Header"
import './GetQuotePage.css'

function GetQuotePage() {
    const [formData, setFormData] = useState({
      origin: '',
      destination: '',
      weight: '',
      width: '',
      length: '',
      height: '',
    });
  
    const [quote, setQuote] = useState(null);
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Example formula for a quote: weight * volume factor * distance factor
      const estimatedQuote = calculateQuote(formData);
      setQuote(estimatedQuote);
    };
  
    const calculateQuote = (data) => {
      const { weight, width, length, height } = data;
  
      // Convert dimensions from inches to meters (1 inch = 0.0254 meters)
      const widthMeters = width * 0.0254;
      const lengthMeters = length * 0.0254;
      const heightMeters = height * 0.0254;
  
      // Calculate volume in cubic meters
      const volume = widthMeters * lengthMeters * heightMeters;
  
      // Set arbitrary factors for cost calculation
      const weightFactor = 8; // Cost per kg
      const volumeFactor = 2500; // Cost per cubic meter
  
      // Final cost calculation
      return (weight * weightFactor + volume * volumeFactor).toFixed(2);
    };
  
    return (
     <div>
     <Header />
      <div className="quote-page">
        <h1>Get a Quote</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="origin">Origin:</label>
            <input
              type="text"
              id="origin"
              name="origin"
              value={formData.origin}
              onChange={handleInputChange}
              placeholder="Enter origin city"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="destination">Destination:</label>
            <input
              type="text"
              id="destination"
              name="destination"
              value={formData.destination}
              onChange={handleInputChange}
              placeholder="Enter destination city"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="weight">Weight (kg):</label>
            <input
              type="number"
              id="weight"
              name="weight"
              value={formData.weight}
              onChange={handleInputChange}
              placeholder="Enter weight in kilograms"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="width">Width (in):</label>
            <input
              type="number"
              id="width"
              name="width"
              value={formData.width}
              onChange={handleInputChange}
              placeholder="Enter width in inches"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="length">Length (in):</label>
            <input
              type="number"
              id="length"
              name="length"
              value={formData.length}
              onChange={handleInputChange}
              placeholder="Enter length in inches"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="height">Height (in):</label>
            <input
              type="number"
              id="height"
              name="height"
              value={formData.height}
              onChange={handleInputChange}
              placeholder="Enter height in inches"
              required
            />
          </div>
          <button type="submit" className="quote-btn">Get Quote</button>
        </form>
        {quote && (
          <div className="quote-result">
            <h2>Estimated Quote</h2>
            <p>Your estimated cost is: <strong>${quote}</strong></p>
          </div>
        )}
      </div>
      </div>
    );
  }
  
  export default GetQuotePage;