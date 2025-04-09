import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../Context/Storecontext';
import './PlaceOrder.css';

const PlaceOrder = () => {
  const { cartItems, food_list } = useContext(StoreContext);
  const navigate = useNavigate();

  
  const subtotal = food_list.reduce((acc, item) => {
    return acc + item.price * (cartItems[item._id] || 0);
  }, 0);

  
  const total = subtotal; 
  return (
    <form className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>

        <div className="multi-fields">
          <input type="text" placeholder="First name" />
          <input type="text" placeholder="Last name" />
        </div>

        <input type="email" placeholder="Email address" />
        <input type="text" placeholder="Street" />

        <div className="multi-fields">
          <input type="text" placeholder="City" />
          <input type="text" placeholder="State" />
        </div>

        <div className="multi-fields">
          <input type="text" placeholder="Zip code" />
          <input type="text" placeholder="Country" />
        </div>

        <input type="text" placeholder="Phone" />
      </div>

      <div className="place-order-right">
      
        <div className="cart-summary">
          <h3>Cart Summary</h3>
          <div className="cart-summary-details">
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>${subtotal}</span>
            </div>
            <div className="summary-row">
              <span>Total:</span>
              <span>${total}</span>
            </div>
          </div>
          <button onClick={() => navigate('/order')}> PROCEED TO CHECKOUT </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
