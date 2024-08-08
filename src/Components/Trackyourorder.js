import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar'; // Ensure Sidebar component is imported
import '../Styles/Trackyourorder.css'; // Import the CSS for TrackYourOrder

const TrackYourOrder = () => {
  const [order, setOrder] = useState({
    id: 'Order1',
    fromAddress: '123 Pickup St, City',
    toAddress: '456 Delivery Ave, City',
    deliveryTime: '30 mins',
    status: 'On the way',
    deliveryPartner: {
      name: 'John Doe',
      phone: '123-456-7890',
    },
  });

  const [rating, setRating] = useState(0);
  const [showRatingPopup, setShowRatingPopup] = useState(false);

  useEffect(() => {
    // Fetch order details from an API or other source here if needed
    // setOrder(fetchedOrder);
  }, []);

  const handleStarClick = (star) => {
    setRating(star);
    setShowRatingPopup(true);
    setTimeout(() => {
      setShowRatingPopup(false);
    }, 3000); // Hide the popup after 3 seconds
  };

  return (
    <div className="track-order-page">
      <Sidebar activePage="TrackYourOrder" onPageChange={() => {}} />
      <div className="track-order-container">
        <h2>Track Your Order</h2>
        <div className="order-summary">
          <h3>Order ID: {order.id}</h3>
          <p><strong>From:</strong> {order.fromAddress}</p>
          <p><strong>To:</strong> {order.toAddress}</p>
          <p><strong>Estimated Delivery Time:</strong> {order.deliveryTime}</p>
          <p><strong>Status:</strong> {order.status}</p>
          <div className="delivery-partner">
            <h4>Delivery Partner</h4>
            <p><strong>Name:</strong> {order.deliveryPartner.name}</p>
            <p><strong>Phone:</strong> {order.deliveryPartner.phone}</p>
          </div>
        </div>
        <div className="rating-section">
          <h4>Rate Your Delivery Partner</h4>
          <div className="stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`star ${star <= rating ? 'selected' : ''}`}
                onClick={() => handleStarClick(star)}
              >
                ★
              </span>
            ))}
          </div>
          {showRatingPopup && (
            <div className="rating-popup">
              <p>Thank you for your ratings!😊❤️</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrackYourOrder;
