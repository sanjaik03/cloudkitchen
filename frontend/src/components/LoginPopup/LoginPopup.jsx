import React, { useState } from 'react';
import axios from 'axios';
import './LoginPopup.css';

const LoginPopup = ({ setShowLogin, onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    agreeToTerms: false
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const { name, email, password, agreeToTerms } = formData;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Email validation
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    // Password validation
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    // Name validation (only for signup)
    if (!isLogin && !name) {
      newErrors.name = 'Name is required';
    }
    
    // Terms validation
    if (!isLogin && !agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    
    // Validate form
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      let response;
      
      if (isLogin) {
        // Login request
        response = await axios.post('http://localhost:4000/api/auth/login', {
          email,
          password
        });
      } else {
        // Register request
        response = await axios.post('http://localhost:4000/api/auth/register', {
          name,
          email,
          password
        });
      }
      
      // Store token and user data
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      // Set axios default header for future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      
      // Call the success callback and close popup
      if (onLoginSuccess) {
        onLoginSuccess(response.data.user);
      }
      setShowLogin(false);
      
    } catch (error) {
      console.error('Auth error:', error);
      setApiError(
        error.response?.data?.message || 
        (isLogin ? 'Login failed. Please check your credentials.' : 'Registration failed. Please try again.')
      );
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setApiError('');
    setErrors({});
  };

  return (
    <div className="login-popup" onClick={() => setShowLogin(false)}>
      <div className="popup-card" onClick={(e) => e.stopPropagation()}>
        <h2>{isLogin ? "Welcome Back!" : "Create Account"}</h2>

        <p className="subtitle">
          {isLogin ? "Login to continue" : "Join us and start your journey"}
        </p>

        {apiError && <div className="error-message">{apiError}</div>}

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <input 
                type="text" 
                name="name" 
                placeholder="Full Name" 
                value={name}
                onChange={handleChange}
                className={errors.name ? 'error' : ''}
              />
              {errors.name && <span className="error-text">{errors.name}</span>}
            </>
          )}

          <input 
            type="email" 
            name="email" 
            placeholder="Email Address" 
            value={email}
            onChange={handleChange}
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <span className="error-text">{errors.email}</span>}

          <input 
            type="password" 
            name="password" 
            placeholder="Password" 
            value={password}
            onChange={handleChange}
            className={errors.password ? 'error' : ''}
          />
          {errors.password && <span className="error-text">{errors.password}</span>}

          <div className="terms">
            <label htmlFor="agree">
              <input 
                type="checkbox" 
                id="agree" 
                name="agreeToTerms"
                checked={agreeToTerms}
                onChange={handleChange}
              />
              <span>I agree to the <strong>Terms of Use</strong> & <strong>Privacy Policy</strong></span>
            </label>
            {errors.agreeToTerms && <span className="error-text">{errors.agreeToTerms}</span>}
          </div>

          <button 
            type="submit" 
            className="primary-btn"
            disabled={loading}
          >
            {loading ? (isLogin ? 'Logging in...' : 'Signing up...') : (isLogin ? 'Login' : 'Sign Up')}
          </button>
        </form>

        <div className="toggle-text">
          {isLogin ? (
            <>
              New here? <span onClick={switchMode}>Create account</span>
            </>
          ) : (
            <>
              Already have an account? <span onClick={switchMode}>Login here</span>
            </>
          )}
        </div>

        <div className="cancel-btn" onClick={() => setShowLogin(false)}>
          Cancel
        </div>
      </div>
    </div>
  );
};

export default LoginPopup;