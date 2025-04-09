import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './Profile.css';

const Profile = ({ setUser }) => {
  const [userData, setUserData] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const navigate = useNavigate();
  const { orderId } = useParams();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    const storedUserData = localStorage.getItem('user');
    
    if (!token || !storedUserData) {
      navigate('/');
      return;
    }

    setUserData(JSON.parse(storedUserData));
    
    // If there's an orderId parameter, load that specific order
    if (orderId) {
      fetchOrderDetails(orderId);
    } else {
      fetchOrders();
    }
  }, [navigate, orderId]);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await axios.get('http://localhost:4000/api/orders/my-orders', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setOrders(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
      setError('Failed to load your orders. Please try again later.');
      setLoading(false);
    }
  };

  const fetchOrderDetails = async (id) => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await axios.get(`http://localhost:4000/api/orders/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setSelectedOrder(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch order details:', error);
      setError('Failed to load order details. Please try again later.');
      setLoading(false);
    }
  };

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Remove authorization header
    delete axios.defaults.headers.common['Authorization'];
    
    // Update user state in the parent component
    if (setUser) {
      setUser(null);
    }
    
    // Navigate to home page
    navigate('/');
  };

  if (loading) {
    return <div className="profile-container loading">Loading...</div>;
  }

  // If viewing a specific order
  if (selectedOrder) {
    return (
      <div className="profile-container">
        <div className="profile-header">
          <h1>Order Details</h1>
          <button className="back-btn" onClick={() => navigate('/profile')}>
            Back to Profile
          </button>
        </div>

        <div className="order-detail-card">
          <div className="order-header">
            <div className="order-id">Order #{selectedOrder._id.substring(0, 8)}</div>
            <div className="order-date">{new Date(selectedOrder.createdAt).toLocaleDateString()}</div>
            <div className={`order-status ${selectedOrder.status.toLowerCase()}`}>{selectedOrder.status}</div>
          </div>
          
          <div className="order-items-detail">
            <h3>Items</h3>
            {selectedOrder.items.map((item, index) => (
              <div className="order-item-detail" key={index}>
                <span className="item-name">{item.name}</span>
                <span className="item-quantity">x{item.quantity}</span>
                <span className="item-price">${item.price.toFixed(2)}</span>
              </div>
            ))}
          </div>
          
          <div className="order-address">
            <h3>Delivery Address</h3>
            <p>{selectedOrder.deliveryAddress.street}</p>
            <p>{selectedOrder.deliveryAddress.city}, {selectedOrder.deliveryAddress.state} {selectedOrder.deliveryAddress.zipCode}</p>
          </div>
          
          <div className="order-footer">
            <div className="order-totals">
              <div className="subtotal">
                <span>Subtotal:</span>
                <span>${(selectedOrder.totalAmount - 5).toFixed(2)}</span>
              </div>
              <div className="delivery-fee">
                <span>Delivery Fee:</span>
                <span>$5.00</span>
              </div>
              <div className="total-amount">
                <span>Total:</span>
                <span>${selectedOrder.totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Regular profile view
  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>My Profile</h1>
      </div>

      {userData && (
        <div className="user-details">
          <div className="profile-avatar">{userData.name.charAt(0).toUpperCase()}</div>
          <div className="user-info-details">
            <h2>{userData.name}</h2>
            <p>{userData.email}</p>
          </div>
        </div>
      )}

      <div className="orders-section">
        <h2>My Orders</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        {orders.length === 0 ? (
          <div className="no-orders">
            <p>You haven't placed any orders yet.</p>
            <button className="shop-now-btn" onClick={() => navigate('/')}>Shop Now</button>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map(order => (
              <div className="order-card" key={order._id}>
                <div className="order-header">
                  <div className="order-id">Order #{order._id.substring(0, 8)}</div>
                  <div className="order-date">{new Date(order.createdAt).toLocaleDateString()}</div>
                  <div className={`order-status ${order.status.toLowerCase()}`}>{order.status}</div>
                </div>
                
                <div className="order-items">
                  {order.items.map((item, index) => (
                    <div className="order-item" key={index}>
                      <span className="item-name">{item.name}</span>
                      <span className="item-quantity">x{item.quantity}</span>
                      <span className="item-price">${item.price.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                
                <div className="order-footer">
                  <div className="order-total">
                    <span>Total:</span>
                    <span className="total-amount">${order.totalAmount.toFixed(2)}</span>
                  </div>
                  <button className="view-details-btn" onClick={() => navigate(`/orders/${order._id}`)}>
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Logout button placed at the bottom of the page */}
      <div className="profile-footer">
        <button className="logout-btn-bottom" onClick={handleLogout}>
          Logout from Account
        </button>
      </div>
    </div>
  );
};

export default Profile;