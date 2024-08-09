import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { useGetUserID } from '../hooks/useGetUserID.js';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';

const CreateRecipe = () => {
  // LOGIC

  const [cookies, _] = useCookies(["access_token"]);
  const userID = useGetUserID();
  const router = useRouter();

  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [],
    instructions: "",
    imageURL: "",
    cookingTime: 0,
    userOwner: null, // Initially null to indicate it hasn't been set yet
  });

  // Set userOwner once userID is available
  useEffect(() => {
    if (userID) {
      setRecipe((prevRecipe) => ({
        ...prevRecipe,
        userOwner: userID,
      }));
    }
  }, [userID]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const addIngredient = () => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] });
  };

  const handleIngredientChange = (event, idx) => {
    const { value } = event.target;
    const ingredients = recipe.ingredients;
    ingredients[idx] = value;
    setRecipe({ ...recipe, ingredients });
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    // Ensure userOwner is set before submitting
    if (!recipe.userOwner) {
      alert("User ID is not set. Please log in.");
      return;
    }

    try {
      await axios.post("http://localhost:3001/recipes", recipe, {
        headers: { Authorization: `Bearer ${cookies.access_token}` } // Add 'Bearer ' before the token
      });

      alert("Recipe Created");
      router.push("/");
    } catch (err) {
      console.error("Error creating recipe:", err.response?.data || err.message);
    }
  };


  // RETURN JSX
  return (
    <>
      <Navbar />
      <div className='flex justify-center items-center space-x-4'>
        <div className="card bg-neutral text-neutral-content w-96">
          <form className="card-body items-center text-center w-96" onSubmit={onSubmit}>
            <h2 className="card-title">Create Recipe</h2>
            <p>(Leave no field empty)</p>

            <label htmlFor='name'>Name</label>
            <input type='text' id='name' name='name' onChange={handleChange} className='input' />

            <label htmlFor='ingredients'>Ingredients</label>
            {recipe.ingredients.map((ingredient, idx) => (
              <input className='input' key={idx} type='text' name='ingredients' value={ingredient} onChange={(event) => handleIngredientChange(event, idx)} />
            ))}

            <button onClick={addIngredient} className="btn btn-primary" type='button'>Add Ingredient</button>

            <label htmlFor='instructions'>Instructions</label>
            <textarea className='input' id='instructions' name='instructions' onChange={handleChange}></textarea>

            <label htmlFor='imageURL'>Image URL</label>
            <input className='input' type='text' id='imageURL' name='imageURL' onChange={handleChange} />

            <label htmlFor='cookingTime'>Cooking Time (minutes)</label>
            <input className='input' type='number' id='cookingTime' name='cookingTime' onChange={handleChange} />

            <button className="btn  btn-primary" type='submit'>Create Recipe</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateRecipe;