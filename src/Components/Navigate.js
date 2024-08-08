import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup1 from './Signup1';
import Home from './Home';
import Sidebar from './Sidebar'; // Ensure Sidebar is correctly imported
import App from './App';
import AboutUs from './AboutUs'; // Uncomment and ensure AboutUs is imported
import History from './History'; // Uncomment and ensure History is imported
import Location from './Location'; // Uncomment and ensure Location is imported
import Dashboard from './Dashboard'; // Uncomment and ensure Dashboard is imported
import TrackYourOrder from './Trackyourorder';

export default function Navigate() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup1 />} />
        <Route path="/Sb" element={<Sidebar />} /> 
        <Route path="/App" element={<App />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/History" element={<History />} />
        <Route path="/Location" element={<Location />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Trackyourorder" element={<TrackYourOrder />} />
      </Routes>
    </BrowserRouter>
  );
}
