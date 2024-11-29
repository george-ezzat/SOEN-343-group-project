import React, { useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import FirebaseSingleton from "../../firebase.js";
import Header from "../Header/Header";
import "./OrderTracking.css";

const Tracking = () => {
    const [trackingId, setTrackingId] = useState(""); 
    const [orderData, setOrderData] = useState(null); 
    const [error, setError] = useState(""); 

    const handleTrack = async (e) => {
        e.preventDefault();

        if (!trackingId.trim()) {
            setError("Please enter a valid tracking ID.");
            return;
        }

        try {
            setError(""); // Clear previous errors
            const db = FirebaseSingleton.getFirestore();
            const docRef = doc(db, "deliveries", trackingId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setOrderData(docSnap.data()); 
            } else {
                setError("Order ID not found. Please check and try again.");
                setOrderData(null); 
            }
        } catch (err) {
            setError("An error occurred while tracking the order. Please try again.");
            console.error(err);
        }
    };

    return (
        <>
            <Header />
            <div>
                <h1>Order Tracking</h1>
                <form onSubmit={handleTrack}>
                    <div className="tracking-container">
                        <input
                            type="text"
                            className="outlined_fields"
                            placeholder="Enter your tracking number"
                            value={trackingId}
                            onChange={(e) => setTrackingId(e.target.value)}
                            maxLength={20}
                            required
                        />
                        <input type="submit" value="Track ->" className="Track_btn" />
                    </div>
                </form>

                {error && <p style={{ color: "red" }}>{error}</p>}

                {orderData && (
                    <div className="order-details">
                        <h2>Order Details</h2>
                        <p><b>Pick-up location:</b> {orderData.startLocation}</p>
                        <p><b>Drop-off location:</b> {orderData.endLocation}</p>
                        <p><b>Sender name</b>: {orderData.nameOfSender}</p>
                        <p><b>Receiver name:</b> {orderData.nameOfRecipient}</p>
                        <p><b>Package Length:</b> {orderData.packageLength} cm</p>
                        <p><b>Package Width:</b> {orderData.packageWidth} cm</p>
                        <p><b>Package Height:</b> {orderData.packageHeight} cm</p>
                        <p><b>Package Weight:</b> {orderData.packageWeight} kg</p>
                        <p><b>Shipping type:</b> {orderData.shippingType}</p>
                    </div>
                )}
            </div>
        </>
    );
};

export default Tracking;
