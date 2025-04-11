// Account.js
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { UserAuth } from "./AuthContext";
import { supabase } from "../supabaseClient.js";


const Account = () => {
  const [orderList, setOrderList] = useState([]);
  const { session, signOut } = UserAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Get cartItems passed via location.state
  const cartItems = location.state?.cartItems || [];
  console.log(cartItems);

  const handleSignOut = async (e) => {
    e.preventDefault();
    try {
      await signOut();
      navigate("/");
    } catch (err) {
      console.error("An unexpected error occurred.");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [session?.user?.id]);

  const fetchOrders = async () => {
    if (!session?.user?.id) return;
    const { data, error } = await supabase
      .from("orderList")
      .select("*")
      .eq("id", session?.user?.id);
    if (error) {
      console.log(error);
    } else {
      setOrderList(data);
    }
  };

  return (
    <div className="App flex flex-col min-h-screen">
      <header className="bg-gray-800 text-white p-4 shadow-md">
        <div className="container mx-auto max-w-[1010px] flex justify-between items-center">
          <Link to="/dashboard" className="text-2xl font-bold" state={{ cartItems: cartItems }}>
            FoodHub
          </Link>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <button className="hover:text-gray-300" onClick={handleSignOut}>
                  Logout
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <div className="container mx-auto max-w-[1010px] flex justify-between items-center mt-4">
        <h2 className="text-xl font-semibold text-center w-full">
          Welcome, {session?.user?.email}
        </h2>
      </div>

      <div className="flex justify-center items-center my-6">
        <div className="bg-white p-6 shadow-lg rounded-lg w-3/4 md:w-1/2">
          <h1 className="text-2xl font-semibold mb-4 text-center">Your Orders:</h1>
          <ul className="space-y-4">
            {orderList.map((order) => (
              <li key={order.id2} className="border-b p-4 flex justify-between">
                <p className="text-lg font-semibold">{order.name}</p>
                <p className="text-lg">Price: ${order.price}</p>
                <p className="text-lg">Ordered on: {order.time}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Account;
