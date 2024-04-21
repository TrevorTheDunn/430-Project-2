const helper = require('./helper.js');
const React = require('react');
const { useState, useEffect } = React;
const { createRoot } = require('react-dom/client');

let allRecipes = [];

const renderHome = () => {
    const root = createRoot(document.getElementById('content'));
    root.render( <RecipeList /> );
};

const Recipe = (props) => {
    let recipe;

    for(let i = 0; i < allRecipes.length; i++) {
        if(allRecipes[i]._id === props.id) {
            recipe = allRecipes[i];
        }
    }

    console.log("Recipe: " + recipe);

    const ingredientsNodes = recipe.ingredients.map(ingredient => {
        return ( <li className="ingredient">{ingredient}</li> );
    });

    const equipmentNodes = recipe.equipment.map(equipment => {
        return ( <li className="equipment">{equipment}</li> );
    });

    const instructionsNodes = recipe.instructions.map(instruction => {
        return ( <li className="instruction">{instruction}</li> );
    });

    return (
        <div className="recipe">
            <h1 className="recipeTitle">{recipe.title}</h1>
            <h3 className="recipeAuthor">By: {recipe.author}</h3>
            <h3 className="recipePrepTime">Prep Time: {recipe.prepTime} mins</h3>
            <h3 className="recipeCookTime">Cook Time: {recipe.cookTime} mins</h3>
            <ul className="recipeIngredients">
                <h3>Ingredients: </h3>
                {ingredientsNodes}
            </ul>
            <ul className="recipeEquipment">
                <h3>Equipment: </h3>
                {equipmentNodes}
            </ul>
            <ol className="recipeInstructions">
                <h3>Instructions: </h3>
                {instructionsNodes}
            </ol>
        </div>
    );
};

const Viewer = (props) => {
    const [reloadRecipe, setReloadRecipe] = useState(false);

    return (
        <div>
            <Recipe id={props.id} recipe={null} reloadRecipe={reloadRecipe} />
        </div>
    );
};

const viewRecipe = (e) => {
    e.preventDefault();
    const recipeId = e.target.id;
    console.log("Id: " + recipeId);

    const root = createRoot(document.getElementById('content'));
    root.render( <Viewer id={recipeId} /> );
};

const RecipeList = (props) => {
    console.log("AllRecipes Length: " + allRecipes.length);
    if(allRecipes.length === 0) {
        const [recipes, setRecipes] = useState(props.recipes);

        useEffect(() => {
            const loadRecipesFromServer = async () => {
                const response = await fetch('/getRecipes');
                const data = await response.json();
                setRecipes(data.recipes);
            };
            loadRecipesFromServer();
        }, [props.reloadRecipes]);

        if(recipes.length === 0) {
            return (
                <div className="recipeList">
                    <h3 className="emptyRecipe">No Recipes Yet!</h3>
                    <h4 className="suggestion">(Maybe Make One)</h4>
                </div>
            );
        }

        allRecipes = recipes;
    }

    const sortRecipes = (recipes) => {
        for(let i = 0; i < recipes.length; i++) {
            let currentRecipe = recipes[0];
            for(let j = 1; j < recipes.length; j++) {

            }
        }
    }

    //sortRecipes(recipes);

    const recipeNodes = allRecipes.map(recipe => {
        console.log("Id: " + recipe._id);
        return (
            <div key={recipe.id} className="recipe">
                <h1 className="recipeListTitle"><a id={recipe._id} href="" className="recipeLink" onClick={(e) => viewRecipe(e) }>{recipe.title}</a></h1>
                <h3 className="recipeListAuthor">{recipe.author}</h3>
                <h2 className="recipeListPrepTime">Prep Time: {recipe.prepTime} mins</h2>
                <h2 className="recipeListCookTime">Cook Time: {recipe.cookTime} mins</h2>
            </div>
        );
    });

    return (
        <div className="recipeList">
            {recipeNodes}
        </div>
    );
};

const Content = () => {
    const [reloadRecipes, setReloadRecipes] = useState(false);

    return (
        <RecipeList recipes={[]} reloadRecipes={reloadRecipes} />
    );
};

const init = () => {
    allRecipes = [];
    const root = createRoot(document.getElementById('content'));
    root.render( <Content />);
}
window.onload = init;