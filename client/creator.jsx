const helper = require('./helper.js');
const React = require('react');
const { useState, useEffect } = React;
const { createRoot } = require('react-dom/client');

const handleRecipe = (e, onRecipeAdded) => {
    e.preventDefault();
    helper.hideError();

    const title = e.target.querySelector('#recipeTitle').value;
    const author = e.target.querySelector('#username').value;
    const tags = e.target.querySelectorAll('li.tag').value;
    const prepTime = e.target.querySelector('#recipePrepTime').value;
    const cookTime = e.target.querySelector('#recipeCookTime').value;
    const ingredients = e.target.querySelectorAll('li.ingredient').value;
    const equipment = e.target.querySelectorAll('li.equipment').value;
    const instructions = e.target.querySelectorAll('li.instruction').value;

    if(!title) {
        helper.handleError('Title is required!');
        return false;
    } else if(!prepTime) {
        helper.handleError('Prep Time is required!');
        return false;
    } else if(!cookTime) {
        helper.handleError('Cook Time is required!');
        return false;
    } else if(!ingredients) {
        helper.handleError('Ingredients are required!');
        return false;
    } else if(!equipment) {
        helper.handleError('Equipment is required!');
        return false;
    } else if(!instructions) {
        helper.handleError('Instructions are required!');
        return false;
    }

    helper.sendPost(e.target.action, 
        {title, author, tags, prepTime, cookTime, ingredients, equipment, instructions},
        onRecipeAdded);
    return false;
}

const RecipeForm = (props) => {
    return (
        <form id="recipeForm"
              onSubmit={ (e) => handleRecipe(e, props.triggerReload) }
              name="recipeForm"
              action="/creator"
              method="POST"
              className="recipeForm"
        >
            
        </form>
    );
};