import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";

export const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);

  const userID = useGetUserID() || "none";

  const fetchRecipes = async () => {
    try {
      const { data } = (await axios.get("/recipes")) || [];
      setRecipes(data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchSavedRecipes = async () => {
    try {
      const { data } =
        (await axios.get(`/recipes/savedRecipes/ids/${userID}`)) || [];
      setSavedRecipes(data.savedRecipes);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRecipes();
    fetchSavedRecipes();
  }, []);

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put("/recipes", {
        recipeID,
        userID,
      });
      setSavedRecipes(response.data.savedRecipes);
    } catch (err) {
      console.log(err);
    }
  };

  const isRecipeSaved = (id) => savedRecipes.includes(id);

  return (
    <div>
      <h1 className="px-20">Recipes</h1>
      <ul className="recipe-category">
        {recipes.map((recipe) => (
          <li className="recipe-category-item" key={recipe._id}>
            <div>
              <h2>{recipe.name}</h2>
              <button
                className="custom-btn mb-20"
                onClick={() => saveRecipe(recipe._id)}
                disabled={isRecipeSaved(recipe._id)}
              >
                {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
              </button>
            </div>
            <img src={recipe.imageUrl} alt={recipe.name} />
            <p>Cooking Time: {recipe.cookingTime} minutes</p>
            <div className="instructions">
              <p dangerouslySetInnerHTML={{ __html: recipe.instructions }}></p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
