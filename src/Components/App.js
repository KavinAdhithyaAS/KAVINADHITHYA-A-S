import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/App.css';

const App = () => {
  const [activePage, setActivePage] = useState('App');
  const [activeTab, setActiveTab] = useState(1);
  const [activeSubTab, setActiveSubTab] = useState('notes');
  const [cameraActive, setCameraActive] = useState(false);
  const [imageSrc, setImageSrc] = useState({ 1: null, 2: null, 3: null, 4: null });
  const [notes, setNotes] = useState({ 1: '', 2: '', 3: '', 4: '' });
  const videoRefs = useRef({ 1: null, 2: null, 3: null, 4: null });
  const canvasRefs = useRef({ 1: null, 2: null, 3: null, 4: null });
  const navigate = useNavigate();

  useEffect(() => {
    if ([1, 2, 3, 4].includes(activeTab) && activeSubTab === 'camera' && cameraActive) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          videoRefs.current[activeTab].srcObject = stream;
        })
        .catch(err => {
          console.error("Error accessing camera: ", err);
        });

      return () => {
        if (videoRefs.current[activeTab] && videoRefs.current[activeTab].srcObject) {
          videoRefs.current[activeTab].srcObject.getTracks().forEach(track => track.stop());
        }
      };
    }
  }, [activeTab, activeSubTab, cameraActive]);

  const handleNavigation = (page) => {
    setActivePage(page);
    navigate(`/${page}`);
  };

  const handleLogout = () => {
    navigate('/'); // Navigate to the home page
  };

  const captureImage = (tabNumber) => {
    const context = canvasRefs.current[tabNumber].getContext('2d');
    context.drawImage(videoRefs.current[tabNumber], 0, 0, canvasRefs.current[tabNumber].width, canvasRefs.current[tabNumber].height);
    setImageSrc(prevState => ({ ...prevState, [tabNumber]: canvasRefs.current[tabNumber].toDataURL('image/png') }));
  };

  const openCamera = () => setCameraActive(true);
  const closeCamera = () => {
    setCameraActive(false);
    if (videoRefs.current[activeTab] && videoRefs.current[activeTab].srcObject) {
      videoRefs.current[activeTab].srcObject.getTracks().forEach(track => track.stop());
    }
  };

  const saveNotes = () => {
    // This function saves the notes in the state for the active tab
    setNotes(prevState => ({ ...prevState, [activeTab]: document.getElementById(`notes-textarea-${activeTab}`).value }));
  };

  return (
    <div className="app-container">
      <div className="sidebar">
        <h2>Doorship</h2>
        <ul>
          <li onClick={() => handleNavigation('Home')} className={activePage === 'Home' ? 'active' : ''}>Home</li>
          <li onClick={() => handleNavigation('App')} className={activePage === 'App' ? 'active' : ''}>App</li>
          <li onClick={() => handleNavigation('Dashboard')} className={activePage === 'Dashboard' ? 'active' : ''}>Dashboard</li>
          <li onClick={() => handleNavigation('Location')} className={activePage === 'Location' ? 'active' : ''}>Location</li>
          <li onClick={() => handleNavigation('TrackYourOrder')} className={activePage === 'TrackYourOrder' ? 'active' : ''}>Track Your Order</li>
          <li onClick={() => handleNavigation('Orders')} className={activePage === 'History' ? 'active' : ''}>History</li>
          <li onClick={() => handleNavigation('AboutUs')} className={activePage === 'AboutUs' ? 'active' : ''}>About Us</li>
        </ul>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
      <div className="content">
        <article className="article">
          <h2 className="article-title">Add your Orders</h2>
          <div className="tabs">
            {/* Main Tab Buttons */}
            {[1, 2, 3, 4].map(num => (
              <React.Fragment key={num}>
                <input 
                  type="radio" 
                  name="tabs" 
                  id={`tab${num}`} 
                  checked={activeTab === num} 
                  onChange={() => setActiveTab(num)} 
                />
                <label htmlFor={`tab${num}`} className={activeTab === num ? 'tab-label active' : 'tab-label'}>
                  <i className={`icon ${num === 1 ? 'email-cal' : num === 2 ? 'snapshot' : num === 3 ? 'inbox-apps' : 'log-calls'}`}></i>
                  <span>{`Order ${num}`}</span>
                </label>
              </React.Fragment>
            ))}

            {/* Tab Content */}
            {[1, 2, 3, 4].map(num => (
              <div key={num} className={`tab__content ${activeTab === num ? 'active' : ''}`}>
                <div className="sub-tabs">
                  <button onClick={() => setActiveSubTab('notes')} className={activeSubTab === 'notes' ? 'active-subtab' : ''}>Notes 🗒️</button>
                  <button onClick={() => setActiveSubTab('camera')} className={activeSubTab === 'camera' ? 'active-subtab' : ''}>Camera 📷</button>
                </div>
                {activeSubTab === 'camera' ? (
                  <div className="camera-section">
                    {cameraActive ? (
                      <>
                        {imageSrc[num] ? (
                          <img src={imageSrc[num]} alt="Captured" className="captured-image" />
                        ) : (
                          <div className="camera-controls">
                            <video ref={el => videoRefs.current[num] = el} autoPlay width="200" height="200"></video>
                            <button onClick={() => captureImage(num)} className="capture-button">Capture Image</button>
                            <canvas ref={el => canvasRefs.current[num] = el} style={{ display: 'none' }} width="200" height="200"></canvas>
                          </div>
                        )}
                        <button onClick={closeCamera} className="close-camera-button">Close Camera</button>
                      </>
                    ) : (
                      <button onClick={openCamera} className="open-camera-button">Open Camera</button>
                    )}
                  </div>
                ) : (
                  <div className="notes-section">
                    <textarea 
                      id={`notes-textarea-${num}`} 
                      placeholder="Write your notes here..." 
                      rows="10" 
                      cols="50"
                      defaultValue={notes[num]}
                    ></textarea>
                    <button onClick={saveNotes} className="save-notes-button">OK</button>
                    <div className="notes-display">
                      <h3>Notes for Order {num}</h3>
                      <p>{notes[num]}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </article>
      </div>
    </div>
  );
};

export default App;
