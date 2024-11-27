import React, { useState } from 'react'
import Header from "../Header/Header"
import './GetQuotePage.css'
import AutocompleteInput from '../AutocompleteInput'
import { calculateCost } from '../../models/costCalculator'

function GetQuotePage() {
    const [formData, setFormData] = useState({
      startLocation: '',
      endLocation: '',
      weight: '',
      width: '',
      length: '',
      height: '',
    });
  
    const [quote, setQuote] = useState(null);

    const handlePlaceSelected = (locationType, address) => {
      setFormData(prevState => ({
        ...prevState,
        [locationType]: address
      }));
    };

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      calculateDistance(formData.startLocation, formData.endLocation);
    };

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
                    const { weightCost, dimensionCost, distanceCost } = calculateCost(
                        parseFloat(formData.weight),
                        parseFloat(formData.length),
                        parseFloat(formData.width),
                        parseFloat(formData.height),
                        distanceInKm
                    );
                    const totalCost = weightCost + dimensionCost + distanceCost;
                    setQuote({
                        weightCost,
                        dimensionCost,
                        distanceCost,
                        totalCost,
                        distance: distanceInKm
                    });
                } else {
                  console.error("Error calculating distance", status);
                }
            }
        );
      };
  
    return (
     <div>
     <Header />
      <div className="quote-page">
        <h1>Get a Quote</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="startLocation">Pick-up Location:</label>
            <AutocompleteInput
              locationType="startLocation"
              onPlaceSelected={handlePlaceSelected}
              initialValue={formData.startLocation}
              className="home-page-input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="endLocation">Drop-off Location:</label>
            <AutocompleteInput
              locationType="endLocation"
              onPlaceSelected={handlePlaceSelected}
              initialValue={formData.endLocation}
              className="home-page-input"
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
            <label htmlFor="width">Width (cm):</label>
            <input
              type="number"
              id="width"
              name="width"
              value={formData.width}
              onChange={handleInputChange}
              placeholder="Enter width in cm"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="length">Length (cm):</label>
            <input
              type="number"
              id="length"
              name="length"
              value={formData.length}
              onChange={handleInputChange}
              placeholder="Enter length in cm"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="height">Height (cm):</label>
            <input
              type="number"
              id="height"
              name="height"
              value={formData.height}
              onChange={handleInputChange}
              placeholder="Enter height in cm"
              required
            />
          </div>
          <button type="submit" className="quote-btn">Get Quote</button>
        </form>
        {quote && (
          <div className="quote-result">
            <h2>Estimated Quote</h2>
            <p><strong>Distance:</strong> {quote.distance.toFixed(2)} km</p>
            <p><strong>Base Cost:</strong> ${quote.distanceCost.toFixed(2)}</p>
            <p><strong>Weight Cost:</strong> ${quote.weightCost.toFixed(2)}</p>
            <p><strong>Dimension Cost:</strong> ${quote.dimensionCost.toFixed(2)}</p>
            <p><strong>Total Cost:</strong> ${quote.totalCost.toFixed(2)}</p>
          </div>
        )}
      </div>
      </div>
    );
  };
  
  export default GetQuotePage;