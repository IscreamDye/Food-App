import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { UserAuth } from "./AuthContext";

function Bestdeals({ visable, setCartItems}) {
  const [mealsFirst10, setMealsFirst10] = useState([]);
  const [mealsNext10, setMealsNext10] = useState([]);
  const [prices, setPrices] = useState([]);
  const { session } = UserAuth();
  

  // Fetch first 10 meals
  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")
      .then((response) => response.json())
      .then((data) => setMealsFirst10(data.meals.slice(0, 10))) // First 10 meals
      .catch((error) => console.error("Error fetching meals:", error));
  }, []);

  // Fetch next 10 meals (skip first 10)
  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")
      .then((response) => response.json())
      .then((data) => setMealsNext10(data.meals.slice(10, 20))) // Next 10 meals
      .catch((error) => console.error("Error fetching meals:", error));

      if (session) {
        fetch("https://raw.githubusercontent.com/IscreamDye/Prices/main/Prices.json")
          .then((response) => response.json())
          .then((data) => setPrices(data)) // Set prices array
          .catch((error) => console.error("Error fetching prices:", error));
          //console.log(session);
        }
    }, [session]);

    //console.log("this is ", session);

    const handleAddToCart = (mealName, price) => {
      setCartItems((prevCart) => [...prevCart, { name: mealName, price }]);
    };

  return (
    <div className={`${visable ? "hidden" : "block"} relative max-w-5xl mx-auto mt-8`}>
      <h2 className="text-3xl font-bold mb-6 text-center">Deals of the week</h2>

      {/* Slider for first 10 meals */}
      <Slider
        dots
        infinite
        speed={500}
        slidesToShow={4}
        slidesToScroll={1}
        autoplay
        autoplaySpeed={3000}
      >
        {mealsFirst10.length > 0 ? (
          mealsFirst10.map((meal, index) => (
            <div key={meal.idMeal} className="px-2 mt-10px">
              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  className="w-full h-48 object-cover"
                />
                <div className="p-2 text-center flex justify-between items-center">
                  <h3 className="text-lg font-semibold">{meal.strMeal}</h3>
                  {session ? 
                  (<>
                  <p className="text-lg font-semibold line-through text-gray-500"> ${prices[index] ? (parseFloat(prices[index]) + 2).toFixed(2) : "N/A"}</p>
                  <p className="text-lg font-semibold text-green-600"> ${prices[index] || "N/A"}</p>
                  <button className="bg-green-500 text-white px-3 py-1 rounded-full hover:bg-green-600 transition-all" onClick={() => handleAddToCart(meal.strMeal, prices[index] || "N/A")}>
                      +
                  </button>
                  </>)
                  :
                  ("")}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">Loading first 10 meals...</p>
        )}
      </Slider>

      {/* Slider for next 10 meals */}
      <Slider
        dots
        infinite
        speed={500}
        slidesToShow={4}
        slidesToScroll={1}
        autoplay
        autoplaySpeed={3000}
      >
        {mealsNext10.length > 0 ? (
          mealsNext10.map((meal, index) => (
            <div key={meal.idMeal} className="px-2 mt-20">
              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  className="w-full h-48 object-cover"
                />
                <div className="p-2 text-center flex justify-between items-center">
                  <h3 className="text-lg font-semibold">{meal.strMeal}</h3>
                  {session ? 
                  (<>
                  <p className="text-lg font-semibold line-through text-gray-500"> ${prices[index] ? (parseFloat(prices[index]) + 2).toFixed(2) : "N/A"}</p>
                  <p className="text-lg font-semibold text-green-600"> ${prices[index] || "N/A"}</p>
                  <button className="bg-green-500 text-white px-3 py-1 rounded-full hover:bg-green-600 transition-all" onClick={() => handleAddToCart(meal.strMeal, prices[index] || "N/A")}>
                      +
                  </button>
                  </>)
                  :
                  ("")}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">Loading next 10 meals...</p>
        )}
      </Slider>
    </div>
  );
}

export default Bestdeals;
