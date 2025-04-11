import React, { useState, useEffect } from "react";

function SearchMeals({ query, setCartItems }) {
  const [meals, setMeals] = useState([]);
  const [prices, setPrices] = useState([]);

  useEffect(() => {
    if (query) {
      fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
        .then((res) => res.json())
        .then((data) => setMeals(data.meals || []));

        fetch("https://raw.githubusercontent.com/IscreamDye/Prices/main/Prices.json")
          .then((response) => response.json())
          .then((data) => setPrices(data)) // Set prices array
          .catch((error) => console.error("Error fetching prices:", error));
    }
  }, [query]);

  const handleAddToCart = (mealName, price) => {
    setCartItems((prevCart) => [...prevCart, { name: mealName, price }]);
  };

  return (
    <div className="container max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Search Results</h2>
      {meals.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <div className="grid grid-cols-4 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {meals.map((meal, index) => (
            <div key={meal.idMeal} className="border rounded-lg p-2 shadow-lg">
              <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full h-40 object-cover rounded-md" />
              <div className="p-2 text-center flex justify-between items-center">
              <h3 className="text-lg font-semibold mt-2">{meal.strMeal}</h3>
              <p className="text-lg font-semibold text-green-600"> ${prices[index] || "N/A"}</p>
              <button className="bg-green-500 text-white px-3 py-1 rounded-full hover:bg-green-600 transition-all" onClick={() => handleAddToCart(meal.strMeal, prices[index] || "N/A")}>
                      +
                  </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchMeals;
