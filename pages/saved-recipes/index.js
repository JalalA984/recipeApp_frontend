import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { useGetUserID } from '../hooks/useGetUserID';

const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = useGetUserID();

  useEffect(() => {
    const fetchSavedRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/recipes/savedRecipes/${userID}`);
        if (response.data && Array.isArray(response.data.savedRecipes)) {
          setSavedRecipes(response.data.savedRecipes);
        } else {
          setSavedRecipes([]);
        }
      } catch (err) {
        console.log(err);
        setSavedRecipes([]);
      }
    };

    fetchSavedRecipe();
  }, [userID]);


  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center space-y-8 p-4">
        <div className="badge badge-info badge-lg">Saved Recipes</div>

        <div className="card bg-neutral text-neutral-content w-full max-w-md p-6 shadow-lg">
          <ul className="space-y-8">
            {savedRecipes.map((recipe) => (
              <li key={recipe._id} className="flex flex-col items-center space-y-4 border-b border-gray-700 pb-6 last:border-b-0">
                <div className="text-center">
                  <h2 className="text-2xl font-semibold mb-4">{recipe.name}</h2>
                  <img
                    className="w-64 h-64 object-cover rounded"
                    src={recipe.imageURL}
                    alt={recipe.name}
                  />
                  <p className="text-gray-300 mb-4">{recipe.instructions}</p>
                  <p className="text-gray-400 font-medium">
                    Cooking Time: {recipe.cookingTime} minutes
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default SavedRecipes;