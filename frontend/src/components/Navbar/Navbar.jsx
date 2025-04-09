import React, { useContext, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom"; 
import { StoreContext } from "../../Context/Storecontext";
import { assets } from "../../assets/assets"; 
import ProfileDropdown from "../ProfileDropdown/ProfileDropdown";
import "./Navbar.css";

const Navbar = ({ setShowLogin, user, setUser }) => {
  const { cartItems } = useContext(StoreContext);  
  const location = useLocation();
  const hasItems = Object.values(cartItems).some((count) => count > 0);
  
  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, [setUser]);

  const scrollToSection = (sectionId) => {
    // If we're not on the home page, navigate to home first
    if (location.pathname !== '/') {
      // We'll use window.location instead of Link to force a full page reload
      window.location.href = `/#${sectionId}`;
      return;
    }
    
    // If we're already on the home page, just scroll to the section
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">Cloud Kitchen</div>
      
      <ul className="navbar-menu">
        <li><Link to="/">Home</Link></li>
        <li><a href="#menu-section" onClick={(e) => {
          e.preventDefault();
          scrollToSection('menu-section');
        }}>Menu</a></li>
        <li><a href="#contact-section" onClick={(e) => {
          e.preventDefault();
          scrollToSection('contact-section');
        }}>Contact Us</a></li>
      </ul>
     
      <div className="navbar-right">
        <div className="navbar-search-icon">
          <Link to='/cart'>
            <img src={assets.basket_icon} alt="Basket" className="basket-icon" />
          </Link>
         
          {hasItems && <div className="dot"></div>}
        </div>
        
        {user ? (
          <ProfileDropdown user={user} onLogout={handleLogout} />
        ) : (
          <button className="signin-btn" onClick={() => setShowLogin(true)}>Sign In</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;