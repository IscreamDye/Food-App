import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "./AuthContext";
import Bestdeals from "./Bestdeals";
import SearchMeals from "./SearchMeals";
import { useLocation } from "react-router-dom";


const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState([]);

  const { session, signOut } = UserAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // If user came from Cart, update cartItems with passed state
  useEffect(() => {
    if (location.state?.cartItems?.length > 0) {
      setCartItems(location.state.cartItems);
    }
  }, [location.state]);

  const handleSignOut = async (e) => {
    e.preventDefault();

    try {
      await signOut();
      navigate("/");
    } catch (err) {
      console.log("An unexpected error occurred.");
    }
  };

  return (
    <div className="App flex flex-col min-h-screen">
      <header className="bg-gray-800 text-white p-4 shadow-md">
        <div className="container mx-auto max-w-[1010px] flex justify-between items-center">
          <Link to="/dashboard" className="text-2xl font-bold" onClick={() => setSearchQuery("")}>
            FoodHub
          </Link>

          <div className="flex items-center bg-white text-gray-700 rounded-lg overflow-hidden w-80">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link
                  to="/account"
                  className="hover:text-gray-300"
                  onClick={() => setSearchQuery("")}
                  state={{ cartItems }} // Pass cartItems to Account
                >
                  Account
                </Link>
              </li>
              <li className="relative">
                <Link
                  to="/Cart"
                  state={{ cartItems }} // Pass cartItems to Cart
                  className="hover:text-gray-300"
                  onClick={() => setSearchQuery("")}
                >
                  Cart
                  {cartItems.length > 0 && (
                    <span className="absolute -top-2 -right-3 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex justify-center items-center">
                      {cartItems.length}
                    </span>
                  )}
                </Link>
              </li>
              <li>
                <button className="hover:text-gray-300" onClick={handleSignOut}>
                  Logout
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <div className="main-content p-4">
        {searchQuery ? (
          <SearchMeals query={searchQuery} setCartItems={setCartItems} />
        ) : (
          <Bestdeals visible={false} setCartItems={setCartItems} />
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
