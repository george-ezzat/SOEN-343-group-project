import React, { useState, useEffect } from "react";
import FirebaseSingleton from "../../firebase.js";
import { collection, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import "./ModifyUsers.css";
import Header from "../Header/Header";
import "../Header/Header.css";

export default function ModifyUsers() {
  const [allUsers, setAllUsers] = useState([]);
  const [createUserModal, setCreateUserModal] = useState(false);
  const [loading, setLoading] = useState(true);

  function pageTitle() {
    return <title>Modify Users</title>;
  }

  // Fetch all users from Firestore
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const db = FirebaseSingleton.getFirestore();
        const querySnapshot = await getDocs(collection(db, "users"));
        const usersData = querySnapshot.docs.map((doc) => ({
          id: doc.id, // Firestore document ID
          ...doc.data(),
        }));
        setAllUsers(usersData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Update a user in Firestore
  const handleSubmit = async (event, updatedUserInfo) => {
    event.preventDefault();
    try {
      const db = FirebaseSingleton.getFirestore();
      const userDoc = doc(db, "users", updatedUserInfo.id);
      await updateDoc(userDoc, updatedUserInfo);
      alert("User updated successfully!");
      window.location.reload(); // Reload to reflect changes
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  // Delete a user from Firestore
  const deleteUser = async (userInfo) => {
    try {
      const db = FirebaseSingleton.getFirestore();
      const userDoc = doc(db, "users", userInfo.id);
      await deleteDoc(userDoc);
      alert("User deleted successfully!");
      setAllUsers(allUsers.filter((user) => user.id !== userInfo.id)); // Update UI
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Toggle create user modal
  const toggleCreateUserModal = () => {
    setCreateUserModal(!createUserModal);
  };

  // User row component
  function UserRow({ userInfo }) {
    const updatedUserInfo = { ...userInfo };

    return (
      <tr>
        <td className="fieldInputs">
          <input
            type="text"
            placeholder={userInfo.firstName}
            className="inputBoxes"
            onChange={(e) => (updatedUserInfo.firstName = e.target.value)}
          />
        </td>
        <td className="fieldInputs">
          <input
            type="text"
            placeholder={userInfo.lastName}
            className="inputBoxes"
            onChange={(e) => (updatedUserInfo.lastName = e.target.value)}
          />
        </td>
        <td className="fieldInputs">
          <input
            type="email"
            placeholder={userInfo.email}
            className="inputBoxes"
            onChange={(e) => (updatedUserInfo.email = e.target.value)}
          />
        </td>
        <td className="fieldInputs">
          <input
            type="password"
            placeholder="Enter new password"
            className="inputBoxes"
            onChange={(e) => (updatedUserInfo.password = e.target.value)}
          />
        </td>
        <td className="fieldInputs">
          <select
            defaultValue={userInfo.accType}
            onChange={(e) => (updatedUserInfo.accType = e.target.value)}
          >
            <option value="admin">Admin</option>
            <option value="customer">Regular Customer</option>
          </select>
        </td>
        <td className="confirmation">
          <button
            className="submitButton"
            onClick={(e) => handleSubmit(e, updatedUserInfo)}
          >
            Update
          </button>
          <button
            className="submitButton"
            onClick={() => deleteUser(userInfo)}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  }

  if (loading) {
    return (
      <>
        <Header />
        <div>Loading...</div>
      </>
    );
  }

  return (
    <>
      <Header />
      {pageTitle()}
      <h1>{document.title}</h1>
      <button className="LogBtn" onClick={toggleCreateUserModal}>
        Create Account
      </button>
      <table className="userTable">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>New Password</th>
            <th>Account Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {allUsers.map((user) => (
            <UserRow key={user.id} userInfo={user} />
          ))}
        </tbody>
      </table>
    </>
  );
}
