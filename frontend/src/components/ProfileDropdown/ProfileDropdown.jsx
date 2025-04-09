import React, { useState, useRef, useEffect } from 'react';
import './ProfileDropdown.css';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Added missing import

const ProfileDropdown = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Remove authorization header
    delete axios.defaults.headers.common['Authorization'];
    
    // Call the logout callback
    if (onLogout) onLogout();
    
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="profile-dropdown" ref={dropdownRef}>
      <div className="profile-icon" onClick={toggleDropdown}>
        <span className="avatar">{user.name ? user.name.charAt(0).toUpperCase() : 'U'}</span>
      </div>
      
      {isOpen && (
        <div className="dropdown-menu">
          <div className="user-info">
            <span className="username">{user.name}</span>
            <span className="email">{user.email}</span>
          </div>
          <div className="dropdown-divider"></div>
          <Link to="/profile" className="dropdown-item" onClick={() => setIsOpen(false)}>
            My Profile
          </Link>
          <Link to="/orders" className="dropdown-item" onClick={() => setIsOpen(false)}>
            My Orders
          </Link>
          <div className="dropdown-divider"></div>
          <div className="dropdown-item logout" onClick={handleLogout}>
            Logout
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;