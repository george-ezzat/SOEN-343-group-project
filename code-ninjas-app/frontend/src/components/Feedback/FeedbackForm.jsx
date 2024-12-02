import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import firebase from '../../firebase'; // Import your firebase.js instance
import { collection, addDoc } from 'firebase/firestore'; // Firestore methods
import './feedback.css';
import Header from '../Header/Header';

const FeedbackForm = () => {
  const [rating, setRating] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [comments, setComments] = useState('');
  const [, setLoading] = useState(false);
  const history = useNavigate(); // useNavigate is used for navigation

  const handleStarClick = (index) => {
    const newRating = index + 1;
    setRating(newRating);
  };

  const handleMouseOver = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseOut = () => {
    setHoveredIndex(-1);
  };

  const handleCommentChange = (event) => {
    setComments(event.target.value);
  };

  const handlereset = () => {
    setRating(0);
    setComments('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      // Save feedback to Firestore under the 'feedbacks' collection
      const feedbackRef = collection(firebase.getFirestore(), 'feedbacks');
      await addDoc(feedbackRef, {
        rating,
        comments,
        timestamp: new Date(),
      });

      console.log('Feedback submitted successfully');
      // Redirect to the main page after successful submission
      history('/');

      setRating(0);
      setComments('');
    } catch (error) {
      // Catch any error that occurred during the request
      console.error('Error submitting feedback:', error);
      alert('Error submitting feedback, please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="feedback-container">
        <h1>Rate your experience</h1>
        <p>We highly value your feedback! Kindly take a moment to rate your experience and provide us with your valuable feedback.</p>
        <div className="rating">
          <label className="rating-label">Rate:</label>
          <div className="stars-container">
            {[...Array(5)].map((_, index) => (
              <span
                key={index}
                className={`fa fa-star ${index < rating || index <= hoveredIndex ? 'checked' : ''}`}
                onMouseOver={() => handleMouseOver(index)}
                onMouseOut={handleMouseOut}
                onClick={() => handleStarClick(index)}
              ></span>
            ))}
          </div>
          <p id="stars_filled">{rating > 0 ? `${rating}/5` : ''}</p>
        </div>
        <br />
        <div>
          <label>Comments:</label><br />
          <textarea
            rows={8}
            cols={45}
            value={comments}
            onChange={handleCommentChange}
            className="comment"
          ></textarea>
        </div>
        <br />
        <div>
          <input
            type="submit"
            value="Submit Feedback"
            className="submit"
            onClick={handleSubmit}
          />
          <input
            type="reset"
            value="Reset"
            className="reset"
            onClick={handlereset}
          />
        </div>
      </div>
    </>
  );
};

export default FeedbackForm;
