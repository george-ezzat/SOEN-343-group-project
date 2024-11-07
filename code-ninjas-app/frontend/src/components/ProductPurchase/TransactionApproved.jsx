import React from "react";
import { useNavigate } from "react-router-dom";
import Header from '../Header/Header';
import "../Header/Header.css";

const TransactionApproved = () => {
  const history = useNavigate(); 

  const handleExit = () => {
    history("/"); 
  };

  return (
    <div>
      <Header />
      <div className="background_confirm">
        <h1>Transaction Approved</h1>
        <p>
          Your payment has been successfully processed. Thank you for your reservation! You will receive an confirmation email shortly.
        </p>
        <button onClick={handleExit}>Exit</button> 
      </div>
    </div>
  );
};

export default TransactionApproved;
