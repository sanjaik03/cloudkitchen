import React, { useState, useEffect } from 'react';
import './Home.css';
import Header from '../../components/Header/Header';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";
import { useLocation } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Home = () => {
  console.log("Home component is rendering!");
  const [category, setCategory] = useState('All');
  const location = useLocation();

  // Handle hash links when the page loads
  useEffect(() => {
    // Check if there's a hash in the URL
    if (location.hash) {
      // Remove the # character
      const sectionId = location.hash.substring(1);
      
      // Add a slight delay to ensure the DOM is fully loaded
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
    }
  }, [location]);

  return (
    <div>
      <Header />
      
      {/* Menu Section */}
      <div id="menu-section">
        <ExploreMenu category={category} setCategory={setCategory} />
        <FoodDisplay category={category} />
      </div>
      
      {/* Contact Section - Add your contact component or content here */}
      <div id="contact-section" className="contact-section">
        <h2>Contact Us</h2>
        <div className="contact-content">
          <div className="contact-info">
            <h3>Get in Touch</h3>
            <p>We'd love to hear from you! Send us a message or reach out through one of our channels below.</p>
            <div className="contact-details">
              <p><strong>Email:</strong> info@cloudkitchen.com</p>
              <p><strong>Phone:</strong> (555) 123-4567</p>
              <p><strong>Address:</strong> 123 Foodie Lane, Tasty Town</p>
            </div>
          </div>
          
          <div className="contact-form">
            <h3>Send Us a Message</h3>
            <form>
              <div className="form-group">
                <input type="text" placeholder="Your Name" />
              </div>
              <div className="form-group">
                <input type="email" placeholder="Your Email" />
              </div>
              <div className="form-group">
                <textarea placeholder="Your Message"></textarea>
              </div>
              <button type="submit" className="submit-btn">Send Message</button>
            </form>
          </div>
        </div>
        
        {/* Social Media Section */}
        <div className="social-media-section">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
          </div>
        </div>
        
        {/* Copyright Section */}
        <div className="copyright-section">
          <p>© 2025 Cloud Kitchen. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;