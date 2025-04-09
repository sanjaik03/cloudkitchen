import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css';
import { StoreContext } from '../../Context/Storecontext';

const Cart = () => {
  const { cartItems, food_list, removeFromCart } = useContext(StoreContext);
  const navigate = useNavigate();


  const subtotal = food_list.reduce((acc, item) => {
    return acc + item.price * (cartItems[item._id] || 0);
  }, 0);

  const total = subtotal; 
  return (
    <div className="cart-container">  
      <div className="cart">
        <h2>Your Cart</h2>

        <div className="cart-items">
          <div className="cart-items-title">
            <p>Items</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
          </div>
          <hr />

          {food_list.map((item) => {
            if (cartItems[item._id] > 0) {
              return (
                <div className="cart-items-title cart-items-item" key={item._id}>
                  <img src={item.image} alt={item.name} />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>${item.price * cartItems[item._id]}</p>
                  <button onClick={() => removeFromCart(item._id)}>Remove</button>
                </div>
              );
            }
            return null;
          })}
        </div>

      
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
          <button onClick={()=>navigate('/order')}> PROCEED TO CHECKOUT </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
