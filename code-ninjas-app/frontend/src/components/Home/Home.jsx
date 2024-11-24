import React from 'react';
import { Link } from 'react-router-dom';
import "./Home.css";
import Header from "../Header/Header";

export default function Home() {
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
            <input type="text" placeholder="Pick-up Location" className='input-box'/>
            <input type="text" placeholder="Drop-off Destination" className='input-box'/>
          </div>
          <Link to="/delivery">
            <button className='SignupBtn'>Continue</button>
          </Link>
        </div>
      </div>
    </>
  );
}
