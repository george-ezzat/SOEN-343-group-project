import React, { useState, useEffect } from 'react';
import './AboutUs.css';
import Header from '../Header/Header.jsx';
import Firebase from '../../firebase.js';  // Import the Firebase instance
import { collection, getDocs } from 'firebase/firestore';  // New modular Firestore imports

const AboutUs = () => {
  const [reviews, setReviews] = useState([]);  // State to store reviews

  // Fetch reviews from Firestore
  const fetchReviews = async () => {
    try {
      const db = Firebase.getFirestore();  // Get Firestore instance using your Firebase singleton
      const feedbackRef = collection(db, 'feedbacks');  // Reference to 'feedbacks' collection
      const querySnapshot = await getDocs(feedbackRef);  // Fetch all documents from the collection

      const feedbackList = querySnapshot.docs.map(doc => doc.data());  // Map the documents to an array of data
      setReviews(feedbackList);  // Set the reviews state with the fetched data
    } catch (error) {
      console.error('Error fetching reviews:', error);  // Log any errors
    }
  };

  // Fetch reviews on component mount
  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <>
      <Header />
      <h1>About Us</h1>
      <p>
        TurboTrucks is an easy-to-use delivery service that helps you send packages quickly and safely.
        Whether you're sending something nearby or far away, we make it simple to request a delivery, get a price,
        track your package, and pay securely. Our goal is to provide fast, reliable, and straightforward deliveries with great customer support.
        TurboTracks is here to make your delivery experience smooth and stress-free!
      </p>
      <div>
        <h2>Reviews</h2>
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={index} className="review">
              <div className="rating-column">
                <label className="rating-label">Rating:</label>
                <div className="stars-container">
                  <span className="rating-number">{review.rating}</span>
                  &nbsp;
                  {[...Array(5)].map((_, starIndex) => (
                    <span
                      key={starIndex}
                      className={`fa fa-star ${starIndex < review.rating ? 'checked' : ''}`}
                    ></span>
                  ))}
                </div>
              </div>
              <div className="comment-column">
                <label className="comment-label">Comment:</label>
                <p>{review.comments}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No reviews yet.</p> // Display message if there are no reviews
        )}
      </div>
    </>
  );
};

export default AboutUs;
