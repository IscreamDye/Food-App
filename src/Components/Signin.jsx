import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "./AuthContext";
import Bestdeals from "./Bestdeals";
import Footer from "./Footer";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { signInUser } = UserAuth();
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    const { session, error } = await signInUser(email, password); // Use your signIn function

    if (error) {
      setError(error); // Set the error message if sign-in fails

      // Set a timeout to clear the error message after a specific duration (e.g., 3 seconds)
      setTimeout(() => {
        setError("");
      }, 3000); // 3000 milliseconds = 3 seconds
    } else {
      // Redirect or perform any necessary actions after successful sign-in
      navigate("/dashboard");
    }

    if (session) {
      closeModal();
      setError(""); // Reset the error when there's a session
    }
  };

  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
    <div className="flex flex-col min-h-screen">
        <header className="bg-gray-800 text-white p-4 shadow-md">
            <div className="container mx-auto max-w-[1010px] flex justify-between items-center">
                <h1 className="text-2xl font-bold">FoodHub</h1>
                <button onClick={() => setIsVisible(!isVisible)} className="px-4 py-2 bg-blue-500 text-white rounded-md">Sign in</button>
            </div> 
        </header>
    

    <Bestdeals visable={isVisible}/>
    
    <div className={`${isVisible ? "block" : "hidden"} mt-8 `}>
        <div className="flex items-center justify-center ">
            <p className="font-bold text-gray-800 text-xl mr-4 ">Sign In</p>
            
        </div>

        <form onSubmit={handleSignIn} className="max-w-md mx-auto ">
            <div className="flex flex-col py-4">
            <input
                onChange={(e) => setEmail(e.target.value)}
                className="p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                required
            />
            </div>

            <div className="flex flex-col py-4">
            <input
                onChange={(e) => setPassword(e.target.value)}
                className="p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                required
            />
            </div>

            <p className="text-gray-600 text-sm flex items-center justify-center gap-4">
            Don't have an account yet?{" "}
            <Link to="/signup" className="text-blue-500 hover:underline">
                Sign up
            </Link>
            </p>

            <button
            className="w-full mt-4 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition duration-200"
            type="submit"
            >
            Sign In
            </button>

            {error && <p className="text-red-600 text-center pt-4 text-sm">{error}</p>}
        </form>
    </div>


    <Footer/>
    </div>
    </>

  );
};

export default Signin;
