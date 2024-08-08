//trackyourorder
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/Location.css';
import '../Styles/Sidebar.css'; // Import the CSS for the sidebar

const calculateDeliveryTime = (from, to) => {
  // Dummy implementation for delivery time calculation
  const distance = Math.random() * 100;
  const time = (distance / 40) * 60;
  return { time: time.toFixed(2), distance: distance.toFixed(2) };
};

const calculateDeliveryCost = (distance) => {
  // Dummy implementation for cost calculation
  const costPerKm = 1.5; // Cost per kilometer
  return (distance * costPerKm).toFixed(2);
};

const Location = () => {
  const [fromAddress, setFromAddress] = useState('');
  const [toAddress, setToAddress] = useState('');
  const [deliveryInfo, setDeliveryInfo] = useState(null);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({ cardNumber: '', expiryDate: '', cvv: '', upiId: '' });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const { time, distance } = calculateDeliveryTime(fromAddress, toAddress);
    const cost = calculateDeliveryCost(distance);
    setDeliveryInfo({ time, distance, cost });
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleOrderPlaced = () => {
    setOrderPlaced(true);
    setTimeout(() => {
      setOrderPlaced(false);
    }, 3000); // Hide the popup after 3 seconds
  };

  const handleNavigation = (page) => {
    navigate(/${page});
  };

  return (
    <div className="app-container">
      <div className="sidebar">
        <h2>Doorship</h2>
        <ul>
          <li onClick={() => handleNavigation('Home')} className={window.location.pathname === '/Home' ? 'active' : ''}>Home</li>
          <li onClick={() => handleNavigation('App')} className={window.location.pathname === '/App' ? 'active' : ''}>App</li>
          <li onClick={() => handleNavigation('Dashboard')} className={window.location.pathname === '/Dashboard' ? 'active' : ''}>Dashboard</li>
          <li onClick={() => handleNavigation('Location')} className={window.location.pathname === '/Location' ? 'active' : ''}>Location</li>
          <li onClick={() => handleNavigation('TrackYourOrder')} className={window.location.pathname === '/TrackYourOrder' ? 'active' : ''}>Track Your Order</li>
          <li onClick={() => handleNavigation('History')} className={window.location.pathname === '/History' ? 'active' : ''}>History</li>
          <li onClick={() => handleNavigation('AboutUs')} className={window.location.pathname === '/AboutUs' ? 'active' : ''}>About Us</li>
        </ul>
        <button className="logout-button" onClick={() => navigate('/')}>Logout</button>
      </div>
      <div className="content">
        <div className="location-container">
          <h2>Address</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="from">From Address:</label>
              <input
                type="text"
                id="from"
                value={fromAddress}
                onChange={(e) => setFromAddress(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="to">To Address:</label>
              <input
                type="text"
                id="to"
                value={toAddress}
                onChange={(e) => setToAddress(e.target.value)}
                required
              />
            </div>
            <button type="submit">Calculate Time</button>
          </form>
          {deliveryInfo && (
            <div className="result">
              <p>Estimated Delivery Time: {deliveryInfo.time} minutes</p>
              <p>Estimated Distance: {deliveryInfo.distance} km</p>
              <p>Estimated Cost: ${deliveryInfo.cost}</p>
              <button onClick={() => setShowPayment(true)}>OK</button>
            </div>
          )}
          {showPayment && (
            <div className="payment-options">
              <h3>Payment Options</h3>
              <p>Select your payment method:</p>
              <div className="payment-info">
          <h2>Payment Details</h2>
          <label>
            <input 
              type="radio" 
              name="paymentMethod" 
              value="card" 
              checked={paymentMethod === 'card'} 
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Credit/Debit Card
          </label>
          <label>
            <input 
              type="radio" 
              name="paymentMethod" 
              value="upi" 
              checked={paymentMethod === 'upi'} 
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            UPI
          </label>

          {paymentMethod === 'card' && (
            <>
              <label>
                Card Number:
                <input type="text" name="cardNumber" value={paymentDetails.cardNumber} onChange={handlePaymentChange} />
              </label>
              <label>
                Expiry Date:
                <input type="text" name="expiryDate" value={paymentDetails.expiryDate} onChange={handlePaymentChange} />
              </label>
              <label>
                CVV:
                <input type="text" name="cvv" value={paymentDetails.cvv} onChange={handlePaymentChange} />
              </label>
            </>
          )}

          {paymentMethod === 'upi' && (
            <label>
              UPI ID:
              <input type="text" name="upiId" value={paymentDetails.upiId} onChange={handlePaymentChange} />
            </label>
          )}
        </div>

        <div className="checkout-actions">
          <button className="confirm-order" onClick={handleConfirmOrder}>Confirm Order</button>
          <button className="add-to-cart" onClick={() => navigate('/add')}>Add to Cart</button>
       
  
    </div>
              <button onClick={handleOrderPlaced}>Done</button>
            </div>
          )}
          {orderPlaced && (
            <div className="popup">
              <img src="https://static.vecteezy.com/system/resources/thumbnails/017/110/950/original/green-check-mark-icon-animation-animated-check-mark-on-white-background-free-video.jpg" alt="Green Tick" className="tick-image" />
              <p>Your order has been placed!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Location;