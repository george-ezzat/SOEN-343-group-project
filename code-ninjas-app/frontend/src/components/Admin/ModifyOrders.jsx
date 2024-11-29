import React, { useState, useEffect } from "react";
import { db } from "../../firebase.js";
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import Header from "../Header/Header";
import "../Header/Header.css";
import "./AdminPage.css";

const ModifyOrders = () => {
  const [orders, setOrders] = useState([]);

  // Fetch orders from Firestore
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersCollection = collection(db, "deliveries");
        const querySnapshot = await getDocs(ordersCollection);

        // Map documents into desired structure excluding names
        const ordersData = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            startLocation: data.startLocation || "Unknown",
            endLocation: data.endLocation || "Unknown",
            packageHeight: data.packageHeight || "0",
            packageLength: data.packageLength || "0",
            packageWidth: data.packageWidth || "0",
            packageWeight: parseFloat(data.packageWeight || "0"), 
            shippingType: data.shippingType || "Unknown",
            nameOfSender: data.nameOfSender || "Unknown",
            nameOfRecipient: data.nameOfRecipient || "Unknown",
            totalCost: parseFloat(data.totalCost || "0").toFixed(2),
          };
        });

        setOrders(ordersData);
      } catch (error) {
        console.error("Error fetching orders: ", error);
      }
    };

    fetchOrders();
  }, []);

  // Handle input change
  const handleInputChange = (e, orderId) => {
    const { name, value } = e.target;

    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, [name]: value } : order
      )
    );
  };

  // Update Firestore document
  const handleModify = async (orderId) => {
    try {
      const orderToModify = orders.find((order) => order.id === orderId);
      const orderDocRef = doc(db, "deliveries", orderId);

      const updateData = {
        startLocation: orderToModify.startLocation,
        endLocation: orderToModify.endLocation,
        packageHeight: orderToModify.packageHeight,
        packageLength: orderToModify.packageLength,
        packageWidth: orderToModify.packageWidth,
        packageWeight: orderToModify.packageWeight,
        shippingType: orderToModify.shippingType,
        nameOfSender: orderToModify.nameOfSender,
        nameOfRecipient: orderToModify.nameOfRecipient,
        totalCost: orderToModify.totalCost,
      };

      await updateDoc(orderDocRef, updateData);
      alert(`Order with ID: ${orderId} updated successfully!`);
    } catch (error) {
      console.error("Error updating order: ", error);
      alert("Failed to update the order");
    }
  };

  const handleDelete = async (orderId) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete the order with ID: ${orderId}?`);
    if (!confirmDelete) return;

    try {
      const orderDocRef = doc(db, "deliveries", orderId);
      await deleteDoc(orderDocRef);
      setOrders(orders.filter((order) => order.id !== orderId));
      alert(`Deleted order with ID: ${orderId}`);
    } catch (error) {
      console.error("Error deleting order: ", error);
      alert("Failed to delete the order");
    }
  };

  return (
    <>
      <Header />
      <div className="container">
        <h1>Modify Orders</h1>
        <table className="orders_Table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Start Location</th>
              <th>Sender</th>
              <th>End Location</th>
              <th>Recipient</th>
              <th>Package Height (cm)</th>
              <th>Package Length (cm)</th>
              <th>Package Width (cm)</th>
              <th>Package Weight (kg)</th>
              <th>Shipping Type</th>
              <th>Total Cost</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="fieldInputs">
                  <input
                    type="text"
                    name="orderId"
                    value={order.id}
                    readOnly
                  />
                </td>
                <td className="fieldInputs">
                  <input
                    type="text"
                    name="startLocation"
                    value={order.startLocation}
                    onChange={(e) => handleInputChange(e, order.id)} 
                  />
                </td>
                <td className="fieldInputs">
                  <input
                    type="text"
                    name="sender"
                    value={order.nameOfSender}
                    onChange={(e) => handleInputChange(e, order.id)} 
                  />
                </td>
                <td className="fieldInputs">
                  <input
                    type="text"
                    name="endLocation"
                    value={order.endLocation}
                    onChange={(e) => handleInputChange(e, order.id)} 
                  />
                </td>
                <td className="fieldInputs">
                  <input
                    type="text"
                    name="recipient"
                    value={order.nameOfRecipient}
                    onChange={(e) => handleInputChange(e, order.id)} 
                  />
                </td>
                <td className="fieldInputs">
                  <input
                    type="number"
                    name="packageHeight"
                    value={order.packageHeight}
                    onChange={(e) => handleInputChange(e, order.id)} 
                  />
                </td>
                <td className="fieldInputs">
                  <input
                    type="number"
                    name="packageLength"
                    min="0"
                    max="274"
                    value={order.packageLength}
                    onChange={(e) => handleInputChange(e, order.id)}  
                  />
                </td>
                <td className="fieldInputs">
                  <input
                    type="number"
                    name="packageWidth"
                    min="0"
                    max="274"
                    value={order.packageWidth}
                    onChange={(e) => handleInputChange(e, order.id)}  
                  />
                </td>
                <td className="fieldInputs">
                  <input
                    type="number"
                    name="packageWeight"
                    min="0"
                    max="68"
                    value={order.packageWeight}
                    onChange={(e) => handleInputChange(e, order.id)} 
                  />
                </td>
                <td className="fieldInputs">
                  <select
                    name="shippingType"
                    value={order.shippingType}
                    onChange={(e) => handleInputChange(e, order.id)}
                    className="inputDropdown"
                  >
                    <option value="free">free</option>
                    <option value="express">express</option>
                  </select>
                </td>
                <td className="fieldInputs">
                  <input
                    type="number"
                    name="totalCost"
                    value={order.totalCost}
                    onChange={(e) => handleInputChange(e, order.id)} 
                  />
                </td>
                <td>
                  <button 
                    className="updateButton" 
                    onClick={() => handleModify(order.id)}
                  >
                    Update
                  </button>
                  <button 
                    className="deleteButton" 
                    onClick={() => handleDelete(order.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ModifyOrders;
