import React , { useState } from 'react';
import './Chatbot.css';

function ChatModal({ isOpen, onClose }) {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
  
    if (!isOpen) return null;
  
    const handleSendMessage = () => {
      if (message.trim()) {
        setMessages([...messages, message]);
        setMessage(''); // Clear the input field
      }
    };
  
    return (
      <div className="chat-modal-overlay" onClick={onClose}>
        <div className="chat-modal" onClick={(e) => e.stopPropagation()}>
          <button className="close-chat" onClick={onClose}>X</button>
          <div className="chat-content">
            <p>Welcome to TurboTrucks support chat!</p>
            <div className="chat-area">
              {messages.length > 0 ? (
                messages.map((msg, index) => (
                  <p key={index} className="chat-message">{msg}</p>
                ))
              ) : (
                <p className="placeholder">Start typing your message...</p>
              )}
            </div>
            <div className="message-input">
              <input
                type="text"
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <button onClick={handleSendMessage}>Send</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default ChatModal;