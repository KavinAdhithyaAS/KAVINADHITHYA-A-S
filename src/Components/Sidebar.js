import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/Sidebar.css';

const Sidebar = ({ activePage, onPageChange }) => {
  const navigate = useNavigate();

  const handleNavigation = (page) => {
    onPageChange(page);
    switch (page) {
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
        navigate('/Trackyourorder');
        break;
      case 'AboutUs':
        navigate('/AboutUs');
        break;
      case 'Home':
        navigate('/Home');
        break;
      default:
        break;
    }
  };

  const handleLogout = () => {
    navigate('/'); // Navigate to the home page
  };

  return (
    <div className="sidebar">
      <h2>Doorship</h2>
      <ul>
        {['Home', 'App', 'Dashboard', 'Location', 'TrackYourOrder', 'History' , 'AboutUs'].map((page) => (
          <li
            key={page}
            onClick={() => handleNavigation(page)}
            className={activePage === page ? 'active' : ''}
          >
            {page}
          </li>
        ))}
      </ul>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
