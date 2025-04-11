import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";


const Footer = () => {
  

  return (
    <footer className="bg-gray-800 text-white text-center p-4 mt-auto ">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center max-w-[1010px]">
        {/* Navigation Links */}
        <div className="flex space-x-6">
          <Link to="/AboutUs" className="hover:text-gray-400">About Us</Link>
          <Link to="/ContactUs" className="hover:text-gray-400">Contacts</Link>
          
        </div>

        
      </div>

      
      
    </footer>
  );
};

export default Footer;
