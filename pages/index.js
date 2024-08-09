import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import axios from 'axios';
import { useGetUserID } from './hooks/useGetUserID';
import { useCookies } from 'react-cookie';

const Home = () => {
  // LOGIC

  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [cookies, _] = useCookies(["access_token"]);
  const userID = useGetUserID();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get("http://localhost:3001/recipes");
        setRecipes(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchSavedRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/recipes/savedRecipes/ids/${userID}`);
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

    fetchRecipe();
    fetchSavedRecipe();
  }, [userID]);

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put("http://localhost:3001/recipes", { recipeID, userID }, {
        headers: { Authorization: `Bearer ${cookies.access_token}` }
      });
      setSavedRecipes(response.data.savedRecipes);
    } catch (err) {
      console.log(err);
    }
  };

  const isRecipeSaved = (recipeID) => savedRecipes.includes(recipeID);

  // RETURN JSX
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center space-y-8 p-4">
        <div className="badge badge-info badge-lg">Recipes</div>

        <div class="collapse bg-red-300 w-1/4 text-black">
          <input type="checkbox" />
          <div class="collapse-title text-xl font-medium">Click for assistance</div>
          <div class="collapse-content">
            <p>SAVING*: To save you may have to push button initially twice.</p><br />
            <p>*You can only save if you are logged in.</p>
          </div>
        </div>

        <div className="card bg-neutral text-neutral-content w-full max-w-md p-6 shadow-lg">
          <ul className="space-y-6">
            {recipes.map((recipe) => {
              return (
                <li key={recipe._id} className="flex flex-col items-center space-y-4 border-b border-gray-700 pb-6 last:border-b-0">
                  <h2 className="text-2xl font-bold">{recipe.name}</h2>
                  <img className="w-64 h-64 object-cover rounded" src={recipe.imageURL} alt={recipe.name} />
                  <p className="text-center">{recipe.instructions}</p>
                  <p className="text-center font-medium">Cooking Time: {recipe.cookingTime} minutes</p>
                  <button
                    className={`btn ${isRecipeSaved(recipe._id) ? 'btn-success' : 'btn-primary'}`}
                    type="button"
                    disabled={isRecipeSaved(recipe._id)}
                    onClick={() => saveRecipe(recipe._id)}
                  >
                    {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Home;