import React, { useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase.js";
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
            const docRef = doc(db, "deliveries", trackingId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setOrderData(docSnap.data()); // Store the order data
            } else {
                setError("Order ID not found. Please check and try again.");
                setOrderData(null); // Clear previous order data
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
                        <input type="submit" value="Track ->" className="Track_btn"/>
                    </div>
                </form>

                {error && <p style={{ color: "red" }}>{error}</p>}

                {orderData && (
                    <div className="order-details">
                        <h2>Order Details</h2>
                        {Object.entries(orderData).map(([key, value]) => (
                            <p key={key}>
                                <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
                            </p>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default Tracking;
