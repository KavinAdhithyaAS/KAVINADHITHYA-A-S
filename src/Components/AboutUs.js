import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import Sidebar from './Sidebar'; // Adjust the path according to your project structure
import '../Styles/AboutUs.css';

const AboutUs = () => {
  return (
    <div className="page-container">
      <Sidebar activePage="AboutUs" onPageChange={() => {}} />
      <div className="content">
        <div className="about-us-container">
          <h1>About Doorship</h1>
          <p>Welcome to Doorship! We are committed to delivering your orders with utmost efficiency and care. Our mission is to provide a seamless delivery experience for our customers, ensuring that their needs are met with the highest level of service.</p>
          <p>Founded in 2024, Doorship has grown to become a trusted name in the delivery industry. Our team of dedicated professionals works tirelessly to ensure that every delivery is handled with precision and care.</p>
          <p>We believe in the power of technology to transform the delivery experience. Our innovative platform allows you to track your orders in real-time, providing you with the peace of mind that your package is on its way.</p>
          <p>Thank you for choosing Doorship. We look forward to serving you!</p>

          <div className="contact-info">
            <h2>Contact Us</h2>
            <div className="contact-item">
              <FaPhone className="contact-icon" />
              <p>Phone: (123) 456-7890</p>
            </div>
            <div className="contact-item">
              <FaEnvelope className="contact-icon" />
              <p>Email: support@doorship.com</p>
            </div>
            <div className="contact-item">
              <FaMapMarkerAlt className="contact-icon" />
              <p>Address: 123 Delivery St, Shipping City, Country</p>
            </div>
          </div>

          <div className="copyright">
            © 2024 Doorship. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
