import React from 'react';
import "./Home.css";
import Header from "../Header/Header";

export default function Home() {
  return (
    <>
      <div className="background"/>
        <div className="content">
        <Header />
        <h1>Turbo Trucks</h1>
      </div>
    </>
  );
}
