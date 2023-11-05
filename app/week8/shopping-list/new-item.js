"use client";
import React, { useState, useEffect } from 'react';

async function getMealIdeas(ingredient) {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
    );
    const data = await response.json();

    if (data.meals && data.meals.length > 0) {
      const mealDetailsPromises = data.meals.map((meal) =>
        fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`
        ).then((res) => res.json())
      );

      const mealDetails = await Promise.all(mealDetailsPromises);
      return mealDetails.map((detail) => detail.meals[0]);
    }
    return [];
  } catch (error) {
    console.error('There was a problem with the fetch operation: ', error.message);
    throw error;
  }
}
const MealIdeas = ({ ingredient }) => {
  const [mealIdeas, setMealIdeas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMeal, setSelectedMeal] = useState(null); // Track selected meal
  const [hoveredMeal, setHoveredMeal] = useState(null); // Track hovered meal

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    getMealIdeas(ingredient)
      .then((fetchedMeals) => {
        setMealIdeas(fetchedMeals);
        setIsLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch meal ideas. Please try again later.');
        setIsLoading(false);
      });
  }, [ingredient]);

  const handleSelectMeal = (meal) => {
    setSelectedMeal(meal);
  };

  const handleDeselectMeal = () => {
    setSelectedMeal(null);
  };

  const handleHoverMeal = (meal) => {
    setHoveredMeal(meal);
  };

 
  return (
    <div className="container mx-auto mt-8">
      <div className="mb-4 flex items-center">
        <h2 className="text-2xl font-semibold text-white">Meal Ideas for {ingredient}</h2>
      </div>
      {isLoading && <p>Loading...</p>}
      {!isLoading && error && <p className="text-red-500">{error}</p>}
      {!isLoading && !error && mealIdeas.length === 0 && (
        <p>No meal ideas found for {ingredient}.</p>
      )}
      {!isLoading && !error && mealIdeas.length > 0 && (
        <div className="flex">
          <ul className="list-none p-0 mr-4">
            {mealIdeas.map((meal) => (
              <li
                key={meal.idMeal}
                className={`bg-dark-slate p-4 rounded-md shadow-md mb-4 border-white border hover:scale-105 transition-transform duration-300 cursor-pointer ${
                  meal === selectedMeal ? 'selected bg-orange-500' : ''
                }`}
                onClick={() => {
                  if (meal === selectedMeal) {
                    handleDeselectMeal();
                  } else {
                    handleSelectMeal(meal);
                  }
                }}
                onMouseEnter={() => handleHoverMeal(meal)}
                onMouseLeave={() => handleHoverMeal(null)}
              >
                <div className="text-lg font-semibold text-white">{meal.strMeal}</div>
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  width="75"
                  className="mt-2 mb-2 w-24 h-24 object-cover transition-transform transform scale-100 group-hover:scale-110 group-hover:opacity-100 opacity-80"
                />
              </li>
            ))}
          </ul>
          <div className="flex-grow flex flex-col">
            {selectedMeal && (
              <div className={`bg-dark-slate p-4 rounded-md shadow-md mb-4 border-white border hover:scale-105 transition-transform duration-300 ${selectedMeal ? 'selected bg-orange-500' : ''}`}>
                <div className="text-xs text-gray-400 ml-2">
                  <h4 className="font-semibold text-lg mb-2 text-white">
                    Ingredients for {selectedMeal.strMeal}:
                  </h4>
                  <ul className="list-disc pl-5">
                    {[
                      selectedMeal.strIngredient1,
                      selectedMeal.strIngredient2,
                      selectedMeal.strIngredient3,
                      selectedMeal.strIngredient4,
                      selectedMeal.strIngredient5,
                    ]
                      .filter((ingredient) => ingredient) // Filter out empty ingredients
                      .map((ingredient, index) => (
                        <li key={index} className="text-white">{ingredient}</li>
                      ))}
                  </ul>
                </div>
              </div>
            )}
            {hoveredMeal && (
              <div className={`bg-dark-slate p-4 rounded-md shadow-md mb-4 border-white border hover:scale-105 transition-transform duration-300 ${hoveredMeal ? 'flex-row' : ''}`}>
                <div className="text-xs text-gray-400 ml-2">
                  <h4 className="font-semibold text-lg mb-2 text-white">
                    Ingredients for {hoveredMeal.strMeal}:
                  </h4>
                  <ul className="list-disc pl-5">
                    {[
                      hoveredMeal.strIngredient1,
                      hoveredMeal.strIngredient2,
                      hoveredMeal.strIngredient3,
                      hoveredMeal.strIngredient4,
                      hoveredMeal.strIngredient5,
                    ]
                      .filter((ingredient) => ingredient)
                      .map((ingredient, index) => (
                        <li key={index} className="text-white">{ingredient}</li>
                      ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MealIdeas;
