import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/Dashboard.css';

const Dashboard = () => {
  const [orders, setOrders] = useState([
    { name: 'Order 1', distance: 10, price: 50 },
    { name: 'Order 2', distance: 20, price: 30 },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('');
  const navigate = useNavigate();

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (option) => {
    setSortOption(option);
    const sortedOrders = [...orders].sort((a, b) => {
      if (option === 'distance') {
        return a.distance - b.distance;
      }
      if (option === 'price') {
        return a.price - b.price;
      }
      return 0;
    });
    setOrders(sortedOrders);
  };

  const handleAddOrder = () => {
    navigate('/App'); // Navigate to the App page when adding an order
  };

  const handleNavigation = (page) => {
    switch (page) {
      case 'Home':
        navigate('/Home');
        break;
        case 'App':
          navigate('/App');
          break;
      case 'Dashboard':
        navigate('/Dashboard');
        break;
      case 'Location':
        navigate('/Location');
        break;
      case 'History':
        navigate('/History');
        break;
      case 'TrackYourOrder':
        navigate('/TrackYourOrder');
        break;
      case 'AboutUs':
        navigate('/AboutUs');
        break;
      default:
        break;
    }
  };

  const handleLogout = () => {
    navigate('/'); // Navigate to the home page on logout
  };

  const filteredOrders = orders.filter((order) =>
    order.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2>Doorship</h2>
        <ul>
          <li onClick={() => handleNavigation('Home')}>Home</li>
          <li onClick={() => handleNavigation('App')}>App</li>
          <li onClick={() => handleNavigation('Dashboard')} className="active">Dashboard</li>
          <li onClick={() => handleNavigation('Location')}>Location</li>
          <li onClick={() => handleNavigation('TrackYourOrder')}>Track Your Order</li>
          <li onClick={() => handleNavigation('History')}>History</li>
          <li onClick={() => handleNavigation('AboutUs')}>About Us</li>
        </ul>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className="dashboard-content">
        <h1>Orders Dashboard</h1>
        <div className="controls">
          <input
            type="text"
            placeholder="Search Your Orders"
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
          <button onClick={() => handleSort('distance')} className="sort-button">
            Sort by Distance
          </button>
          <button onClick={() => handleSort('price')} className="sort-button">
            Sort by Price
          </button>
          <button onClick={handleAddOrder} className="add-order-button">
            Add More Orders
          </button>
        </div>
        <ul className="orders-list">
          {filteredOrders.map((order, index) => (
            <li key={index} className="order-item">
              <p>{order.name}</p>
              <p>Distance: {order.distance} km</p>
              <p>Price: ${order.price}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
