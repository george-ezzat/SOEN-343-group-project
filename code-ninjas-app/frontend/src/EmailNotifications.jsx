import React, { useState, useEffect } from 'react';

const EmailNotifications = ({ order }) => {
  const [notificationStatus, setNotificationStatus] = useState({
    paymentSent: false,
    delaySent: false,
    deliveredSent: false,
  });

  // Simulate email sending at specific times
  useEffect(() => {
    const currentDateTime = new Date();
    
    // 1. Send Payment Confirmation after payment is received (immediate)
    if (!notificationStatus.paymentSent && order.paymentStatus === 'paid') {
      sendPaymentConfirmationEmail();
    }

    // 2. Send Delay Notification if there is a delay in delivery
    if (!notificationStatus.delaySent && order.deliveryStatus === 'delayed') {
      sendDelayNotificationEmail();
    }

    // 3. Send Delivery Confirmation once the package is delivered
    if (!notificationStatus.deliveredSent && order.deliveryStatus === 'delivered') {
      sendDeliveryConfirmationEmail();
    }
  }, [order, notificationStatus]);

  // Function to simulate sending payment confirmation email
  const sendPaymentConfirmationEmail = () => {
    const emailContent = `
      Dear ${order.customerName},
      
      Thank you for your order with [Company Name]. We're pleased to confirm that your payment of $${order.orderAmount} has been successfully processed.
      
      Order Details:
      - Order Number: ${order.orderNumber}
      - Delivery Address: ${order.deliveryAddress}
      - Estimated Delivery Time: ${order.estimatedDeliveryTime}
      
      You can track your order in real-time here: [tracking_link].
      
      Best regards,
      Turbotruck Support Team
    `;
    console.log('Payment Confirmation Email Sent:', emailContent);
    setNotificationStatus(prevState => ({ ...prevState, paymentSent: true }));
  };

  // Function to simulate sending delay notification email
  const sendDelayNotificationEmail = () => {
    const emailContent = `
      Dear ${order.customerName},
      
      We regret to inform you that there has been a slight delay with the delivery of your order #${order.orderNumber}. The new estimated delivery time is ${order.newEstimatedDeliveryTime}.
      
      We apologize for the inconvenience and appreciate your patience.
      
      Track your order in real-time: [tracking_link].
      
      Best regards,
      Turbotruck Support Team
    `;
    console.log('Delay Notification Email Sent:', emailContent);
    setNotificationStatus(prevState => ({ ...prevState, delaySent: true }));
  };

  // Function to simulate sending delivery confirmation email
  const sendDeliveryConfirmationEmail = () => {
    const emailContent = `
      Dear ${order.customerName},
      
      We are pleased to inform you that your order #${order.orderNumber} has been successfully delivered!
      
      Delivery Details:
      - Delivered to: ${order.deliveryAddress}
      - Delivery Date & Time: ${order.deliveryDateTime}
      
      Let us know how we did by clicking [Feedback Link].
      
      Thank you for choosing [Company Name].
      
      Best regards,
      [Company Name] Support Team
    `;
    console.log('Delivery Confirmation Email Sent:', emailContent);
    setNotificationStatus(prevState => ({ ...prevState, deliveredSent: true }));
  };

  return (
    <div>
      <h2>Email Notification System</h2>
      <p>Status of Email Notifications:</p>
      <ul>
        <li>Payment Confirmation: {notificationStatus.paymentSent ? 'Sent' : 'Not Sent'}</li>
        <li>Delay Notification: {notificationStatus.delaySent ? 'Sent' : 'Not Sent'}</li>
        <li>Delivery Confirmation: {notificationStatus.deliveredSent ? 'Sent' : 'Not Sent'}</li>
      </ul>
    </div>
  );
};

export default EmailNotifications;
