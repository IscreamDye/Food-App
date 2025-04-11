import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';

function AboutUs() {
  return (
    <div className="App flex flex-col min-h-screen">
      <header className="bg-gray-800 text-white p-4 shadow-md">
        <div className="container mx-auto max-w-[1010px] flex justify-between items-center">
          <Link to="/dashboard" className="text-2xl font-bold">
            FoodHub
          </Link>
          
        </div>
      </header>

      <div className="container mx-auto max-w-[1010px] mt-8 mb-8">
        <h2 className="text-3xl font-bold text-center mb-6">About Us</h2>
        
        <div className="text-lg">
          <p className="mb-4">
            Welcome to FoodHub! We are passionate about bringing the best food experiences to your table.
            Our mission is to provide delicious meals made from fresh, high-quality ingredients. Whether you're
            looking for quick bites, healthy options, or indulgent treats, FoodHub has something for everyone.
          </p>
          
          <p className="mb-4">
            At FoodHub, we believe in creating meals that bring people together. We source ingredients from local 
            suppliers and ensure that each dish is crafted with care. Our chefs are dedicated to bringing out the
            authentic flavors of the world and delivering a satisfying dining experience.
          </p>

          <p className="mb-4">
            Join us in celebrating food, community, and great memories. At FoodHub, we’re more than just a food 
            delivery service – we’re your partner in bringing great meals straight to your door.
          </p>

          <p className="font-semibold">Thank you for choosing FoodHub!</p>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default AboutUs;
