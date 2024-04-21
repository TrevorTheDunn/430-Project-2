const helper = require('./helper.js');
const React = require('react');
const { useState, useEffect } = React;
const { createRoot } = require('react-dom/client');

const RecipeList = (props) => {
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

    const sortRecipes = (recipes) => {
        for(let i = 0; i < recipes.length; i++) {
            let currentRecipe = recipes[0];
            for(let j = 1; j < recipes.length; j++) {
                
            }
        }
    }

    sortRecipes(recipes);

    const recipeNodes = recipes.map(recipe => {
        return (
            <div key="recipe.id" className="recipe">
                <h1 className="recipeListTitle"><a className="recipeLink" href="/viewer">{recipe.title}</a></h1>
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
    const root = createRoot(document.getElementById('content'));
    root.render( <Content />);
}
window.onload = init;