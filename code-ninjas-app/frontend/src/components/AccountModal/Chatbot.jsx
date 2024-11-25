import React, { useState, useEffect } from 'react';
import './Chatbot.css';

function ChatModal({ isOpen, onClose }) {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [step, setStep] = useState(0);  // Track conversation flow

    useEffect(() => {
        if (isOpen) {
            // Immediately show the welcome message when the chat opens
            setMessages([{ text: 'Welcome to TurboTrucks Chat Assistance! How can I help you today? 😊', isUser: false }]);
            setStep(1); // Move to the next step after the welcome message
        }
    }, [isOpen]); // Trigger when chat is opened

    const handleSendMessage = () => {
        if (message.trim()) {
            // Add user message to the chat
            setMessages([...messages, { text: message, isUser: true }]);
            setMessage(''); // Clear the input field

            // Simulate bot response with a delay
            setTimeout(() => {
                let botMessage = '';
                
                // Implementing the conversational flow based on user input
                if (step === 1) {
                    if (message.toLowerCase().includes('track')) {
                        botMessage = 'Sure! Can you provide your order ID?';
                        setStep(2);
                    } else if (message.toLowerCase().includes('delivery')) {
                        botMessage = 'Let’s get your delivery started! 🚚 Where will the package be picked up from?';
                        setStep(3);
                    } else if (message.toLowerCase().includes('quote')) {
                        botMessage = 'Sure! Could you tell me the weight of your package?';
                        setStep(4);
                    } else if (message.toLowerCase().includes('help')) {
                        botMessage = 'I can help with that! Could you please provide more details?';
                        setStep(5);
                    } else if (message.toLowerCase().includes('explain me the services')) {
                        botMessage = `
                            Here are the services we offer:
                            1️⃣ Track an order
                            2️⃣ Request a delivery
                            3️⃣ Get a quote
                            4️⃣ Help with something else
                        `;
                        setStep(1);  // Continue conversation after explaining services
                    } else {
                        botMessage = 'I didn’t quite catch that. Could you please tell me if you want to track an order, request a delivery, or get a quote?';
                        setStep(1); // Stay in step 1 until user gives a valid input
                    }
                } else if (step === 2) {
                    botMessage = 'Your order is being processed! Is there anything else I can assist you with?';
                    setStep(6);  // Ask if the user needs anything else
                } else if (step === 3) {
                    botMessage = 'Got it! Now, where should we deliver the package?';
                    setStep(4);
                } else if (step === 4) {
                    botMessage = 'Thanks! Your delivery is now confirmed! 🎉 Would you like to proceed with something else?';
                    setStep(6); // Ask if the user needs anything else
                } else if (step === 5) {
                    botMessage = 'Please provide more details so I can assist you further.';
                    setStep(0); // Restart after help request
                } else if (step === 6) {
                    // If user asks if they need anything else
                    if (message.toLowerCase().includes('no')) {
                        botMessage = 'Let me know if there is anything else. 😊';
                        setStep(0); // End the conversation flow
                    } else if (message.toLowerCase().includes('yes')) {
                        botMessage = 'How can I help you?';
                        setStep(1); // Loop back to the initial state to continue helping
                    } else {
                        botMessage = 'Please respond with "yes" or "no" if you need further assistance.';
                    }
                }

                setMessages((prevMessages) => [
                    ...prevMessages,
                    { text: botMessage, isUser: false },
                ]);
            }, 1000); // Simulate delay before bot response
        }
    };

    return (
        <div className="chat-modal-overlay" onClick={onClose}>
            <div className="chat-modal" onClick={(e) => e.stopPropagation()}>
                <button className="close-chat" onClick={onClose}>X</button>
                <div className="chat-content">
                    <div className="chat-area">
                        {messages.length > 0 ? (
                            messages.map((msg, index) => (
                                <p 
                                    key={index} 
                                    className={`chat-message ${msg.isUser ? 'user-message' : 'bot-message'}`}
                                >
                                    {msg.text}
                                </p>
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
