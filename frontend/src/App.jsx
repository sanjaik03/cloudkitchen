import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import StoreContextProvider from "./Context/Storecontext"; 
import Cart from "./pages/Cart/Cart"; 
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import Profile from "./pages/Profile/Profile";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in on app load
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  return (
    <>
      {showLogin && <LoginPopup setShowLogin={setShowLogin} onLoginSuccess={handleLoginSuccess} />}
      
      <StoreContextProvider>  
        <div className="app">
          <Navbar setShowLogin={setShowLogin} user={user} setUser={setUser} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} /> 
            <Route path="/order" element={<PlaceOrder />} />
            <Route path="/profile" element={<Profile setUser={setUser} />} />
            <Route path="/orders/:orderId" element={<Profile setUser={setUser} />} />
          </Routes>
        </div>
      </StoreContextProvider>
    </>
  );
};

export default App;