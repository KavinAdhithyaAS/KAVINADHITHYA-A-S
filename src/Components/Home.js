import React, { useState } from 'react';
import Sidebar from './Sidebar';
import '../Styles/Home.css';

const Home = () => {
  const [activePage, setActivePage] = useState('Home');

  return (
    <div className="home-container">
      <Sidebar activePage={activePage} onPageChange={setActivePage} />
      <div className="content">
        {activePage === 'Home' && (
          <div className="home-content">
            <h1>Welcome to Doorship</h1>
            <p>
              We are Doorship, your premier platform for seamless. Our mission is to provide top-notch services that ensure your products reach their destinations quickly and safely.
            </p>
            <p>
              With Doorship, you can easily manage and track your orders from a user-friendly interface. Whether you're a business owner or a consumer, our platform offers the flexibility and reliability you need to streamline your delivery processes.
            </p>
            <img 
              src="https://www.shutterstock.com/shutterstock/photos/1536731762/display_1500/stock-vector-young-girl-order-product-from-the-dropship-store-drop-shipper-order-to-the-supplier-to-deliver-the-1536731762.jpg"
              alt="Introduction"
              className="intro-image"
            />
            <footer className="footer">
              <p>&copy; {new Date().getFullYear()} Doorship. All rights reserved.</p>
            </footer>
          </div>
        )}
        {/* Add content for other pages here */}
      </div>
    </div>
  );
};

export default Home;
