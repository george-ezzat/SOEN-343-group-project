import React, { useState } from "react";
import "./create_a_reservation&payment.css";
import { useNavigate} from 'react-router-dom';

const getCurrentMonthYear = () => {
  const today = new Date();
  const month = String(today.getMonth() + 2).padStart(2, "0");
  const year = today.getFullYear();
  return `${year}-${month}`;
};

const CarRentalPayment = () => {
  const history = useNavigate();

  const [cardNumber, setCardNumber] = useState("");
  const [cardholderName, setCardholderName] = useState("");
  const [billingAddress, setbillingAdress] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCVV] = useState("");

  function validateForm() {
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

    return true;
  }

  function transactionapproved(){    
      history("/transactionapproved");
    
  }

  return (
    <div className="background_payment">
      <h1>Payment Information</h1>
      <form>
        <table className="tab_payment reservationTable">
          <tr>
            <th>Amount:</th>
            <td>
              <input
                type="text"
                className="outlined_fields"
                readOnly
              />
            </td>
          </tr>
          <br />
          <tr>
            <th>Cardholder Name:</th>
            <td>
            <input 
          type="text" 
          className="outlined_fields" 
          value={cardholderName}
          onChange={(e) => setCardholderName(e.target.value)}
          required 
          />
          </td>
          </tr>
          <br />
          <tr>
            <th>Card number:</th>
            <td>
              <input
                type="text"
                maxLength={16}
                className="outlined_fields"
                required
                value={cardNumber}
                onChange={(e)=>setCardNumber(e.target.value)}
              />
            </td>
          </tr>
          <br />
          <tr>
            <th>Expiry Date:</th>
            <td>
            <input
                type="month"
                min={getCurrentMonthYear()}
                placeholder="MM/YY"
                className="outlined_fields"
                required
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
              />
            </td>
          </tr>
          <br />
          <tr>
            <th>CVV:</th>
            <td>
              <input
                type="text"
                maxLength={3}
                className="outlined_fields"
                placeholder="555"
                required
                value={cvv}
                onChange={(e)=>setCVV(e.target.value)}
              />
            </td>
          </tr>
          <br />
          <tr>
            <th>Billing Address:</th>
            <td>
            <input 
          type="text" 
          className="outlined_fields" 
          value={billingAddress}
          onChange={(e) => setbillingAdress(e.target.value)}
          required 
          />
            </td>
          </tr>
        </table>
        <br />
        <div className="button-container">
          <input type="submit" value="Make Payment" className="submit" onClick={(e) => {e.preventDefault();
            if (validateForm())transactionapproved()}}/>
          <input type="reset" value="Reset" className="reset" />
        </div>
      </form>
    </div>
  );
};

export default CarRentalPayment;
