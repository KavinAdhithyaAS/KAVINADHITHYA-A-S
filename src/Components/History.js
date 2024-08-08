import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import Sidebar from './Sidebar'; // Ensure Sidebar component is imported
import '../Styles/History.css'; // Import the CSS for History

const History = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Simulate fetching order history from an API or local storage
    const fetchedOrders = [
      { id: 'Order1', date: '2024-08-01', items: ['Item A', 'Item B'], total: '$20' },
      { id: 'Order2', date: '2024-08-02', items: ['Item C', 'Item D'], total: '$30' },
      { id: 'Order3', date: '2024-08-03', items: ['Item E', 'Item F'], total: '$40' },
    ];
    setOrders(fetchedOrders);
  }, []);

  return (
    <div className="history-page">
      <Sidebar activePage="History" onPageChange={() => {}} />
      <div className="history-container">
        <h2>Order History</h2>
        {orders.length > 0 ? (
          <ul className="order-list">
            {orders.map((order) => (
              <li key={order.id} className="order-item">
                <h3>Order ID: {order.id}</h3>
                <p><strong>Date:</strong> {order.date}</p>
                <p><strong>Items:</strong> {order.items.join(', ')}</p>
                <p><strong>Total:</strong> {order.total}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default History;
