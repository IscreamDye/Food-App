import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserAuth } from "./AuthContext";
import { supabase } from "../supabaseClient.js";
import Footer from "./Footer";

function Cart() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const cartItemsFromLocation = location.state?.cartItems || [];
  const [updatedCartItems, setUpdatedCartItems] = useState(cartItemsFromLocation);
  
  const [showPaymentOverlay, setShowPaymentOverlay] = useState(false);
  const [email, setEmail] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const { session, signOut } = UserAuth();
  const paymentFormRef = useRef(null);  // Ref to the payment form to detect outside click

  useEffect(() => {
    if (cartItemsFromLocation.length > 0) {
      const initializedCart = cartItemsFromLocation.map(item => ({
        ...item,
        quantity: item.quantity || 1,
        totalPrice: item.price * (item.quantity || 1),
      }));
      setUpdatedCartItems(initializedCart);
    }
  }, [cartItemsFromLocation]);

  useEffect(() => {
    // Close the overlay if user clicks outside the payment form
    const handleOutsideClick = (event) => {
      if (paymentFormRef.current && !paymentFormRef.current.contains(event.target)) {
        setShowPaymentOverlay(false);
      }
    };

    if (showPaymentOverlay) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showPaymentOverlay]);

  const handleQuantityChange = (index, newQuantity) => {
    const updatedItems = [...updatedCartItems];
    if (newQuantity === 0) {
      handleRemoveItem(index);
    } else {
      updatedItems[index].quantity = newQuantity;
      updatedItems[index].totalPrice = updatedItems[index].price * newQuantity;
      setUpdatedCartItems(updatedItems);
    }
  };

  const handleRemoveItem = (index) => {
    setUpdatedCartItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  const handlePayment = () => {
    setShowPaymentOverlay(true);
  };

  const handlePayNow = () => {
    if (email && cardNumber && expiryDate && cvv) {
      setPaymentSuccess(true);
      setShowPaymentOverlay(false);
      clearCart();
      addToList();
    } else {
      alert("Please fill in all the fields.");
    }
  };

  const addToList = async () => {
    const currentDateTime = new Date().toISOString();
  
    const mealInfo = updatedCartItems.map(item => ({
      name: item.name,
      price: item.totalPrice,
      id: session?.user?.id,
      time: currentDateTime
    }));
  
    const { error } = await supabase
      .from("orderList")
      .insert(mealInfo);
  
    if (error) {
      console.log("Error inserting into orderList:", error);
    } else {
      console.log("Order information sent to Supabase successfully.");
    }
  };

  const handleSignOut = async (e) => {
    e.preventDefault();
    try {
      await signOut();
      navigate("/");
    } catch (err) {
      console.log("An unexpected error occurred.");
    }
  };

  const clearCart = () => {
    setUpdatedCartItems([]);
  };

  const getTotalPrice = () => {
    return updatedCartItems.reduce((total, item) => total + item.totalPrice, 0);
  };

  // Close the payment overlay
  const handleCloseOverlay = () => {
    setShowPaymentOverlay(false);
  };

  return (
    <div className="App flex flex-col min-h-screen">
      <header className="bg-gray-800 text-white p-4 shadow-md">
        <div className="container mx-auto max-w-[1010px] flex justify-between items-center">
          <Link to="/dashboard" className="text-2xl font-bold" state={{ cartItems: updatedCartItems }}>
            FoodHub
          </Link>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link to="/account" className="hover:text-gray-300" state={{ cartItems: updatedCartItems }}>Account</Link>
              </li>
              <li>
                <button className="hover:text-gray-300" onClick={handleSignOut}>Logout</button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <div className="container mx-auto max-w-[1010px] justify-between items-center mt-4">
        <h2 className="text-3xl font-bold text-center mb-6 mt-4">Cart</h2>
        {updatedCartItems.length > 0 ? (
          <div className="w-full">
            <ul className="w-full">
              {updatedCartItems.map((item, index) => (
                <li key={index} className="mb-4 flex justify-between items-center w-full">
                  <div className="flex-1 w-full">
                    <p className="text-xl">{item.name} - ${item.price}</p>
                    <div className="flex items-center mt-2">
                      <button
                        onClick={() => handleQuantityChange(index, item.quantity - 1)}
                        className="px-2 py-1 bg-gray-300 rounded"
                      >
                        -
                      </button>
                      <p className="px-4">{item.quantity}</p>
                      <button
                        onClick={() => handleQuantityChange(index, item.quantity + 1)}
                        className="px-2 py-1 bg-gray-300 rounded"
                      >
                        +
                      </button>
                      <button
                        onClick={() => handleRemoveItem(index)}
                        className="ml-4 text-red-500"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <p className="text-xl">${item.totalPrice}</p>
                </li>
              ))}
            </ul>
            <div className="mt-4 w-full">
              <p className="text-xl font-semibold">
                Total: ${getTotalPrice().toFixed(2)}
              </p>
              <button
                onClick={handlePayment}
                className="mt-4 w-full py-2 bg-green-500 text-white font-semibold rounded"
              >
                Pay Now
              </button>
            </div>
          </div>
        ) : (
          <p>Your cart is empty</p>
        )}
      </div>

      <Footer />

      {/* Payment Overlay */}
      {showPaymentOverlay && !paymentSuccess && (
        <div className="overlay fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div
            ref={paymentFormRef}
            className="payment-form bg-white p-8 rounded-lg max-w-sm w-full relative"
          >
            {/* Close Button in Top Right Corner */}
            <button
              onClick={handleCloseOverlay}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>
            <h3 className="text-2xl font-semibold mb-4">Payment Details</h3>
            <label className="block mb-2">Email Address:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 mb-4 border border-gray-300 rounded"
              placeholder="Enter your email"
            />
            <label className="block mb-2">Card Number:</label>
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className="w-full p-2 mb-4 border border-gray-300 rounded"
              placeholder="Enter card number"
            />
            <label className="block mb-2">Expiry Date:</label>
            <input
              type="text"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              className="w-full p-2 mb-4 border border-gray-300 rounded"
              placeholder="MM/YY"
            />
            <label className="block mb-2">CVV:</label>
            <input
              type="text"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              className="w-full p-2 mb-4 border border-gray-300 rounded"
              placeholder="Enter CVV"
            />
            <button
              onClick={handlePayNow}
              className="w-full py-2 bg-green-500 text-white font-semibold rounded"
            >
              Pay
            </button>
          </div>
        </div>
      )}

      {/* Thank You Message */}
      {paymentSuccess && (
        <div className="thank-you-message bg-green-500 text-white p-4 text-center rounded">
          <h2 className="text-3xl">Thank You for Your Order!</h2>
          <p>Your payment was successful. We will process your order shortly.</p>
        </div>
      )}
    </div>
  );
}

export default Cart;
