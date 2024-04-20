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
};

const addListItem = (list, id, item) => {
    let li = document.createElement('li');
    li.className = 'listItem';
    li.id = id;
    li.innerText = item;
    list.appendChild(li);
    return false;
};

const determineList = (e) => {
    if(e.target.id === 'ingredientsButton') {
        const ingredientList = document.getElementById('ingredientList');
        const ingredientInput = document.getElementById('ingredientInput');
        addListItem(ingredientList, 'ingredient', ingredientInput.value);
        ingredientInput.value = '';
    } else if(e.target.id === 'equipmentButton') {
        const equipmentList = document.getElementById('equipmentList');
        const equipmentInput = document.getElementById('equipmentInput');
        addListItem(equipmentList, 'equipment', equipmentInput.value);
        equipmentInput.value = '';
    } else if(e.target.id === 'instructionsButton') {
        const instructionList = document.getElementById('instructionList');
        const instructionInput = document.getElementById('instructionInput');
        addListItem(instructionList, 'instruction', instructionInput.value);
        instructionInput.value = '';
    }

    return false;
};

const RecipeForm = (props) => {
    return (
        <form id="recipeForm"
              onSubmit={ (e) => handleRecipe(e, props.triggerReload) }
              name="recipeForm"
              action="/creator"
              method="POST"
              className="recipeForm"
        >
            <input id="recipeTitle" type="text" name="title" placeholder="Recipe Title" />
            <label htmlFor="prepTime">Prep Time: </label>
            <input id="recipePrepTime" type="number" min="0" name="prepTime" />
            <label htmlFor="cookTime">Cook Time: </label>
            <input id="recipeCookTime" type="number" min="0" name="cookTime" />
            <div id="ingredientsDiv">
                <ul className="list" id="ingredientList"></ul>
                <input id="ingredientInput" className="listInput" type="text" placeholder="Enter Ingredient" />
                <button type="button" id="ingredientsButton" onClick={ (e) => determineList(e) }>Add</button>
            </div>
            <div id="equipmentDiv">
                <ul className="list" id="equipmentList"></ul>
                <input id="equipmentInput" className="listInput" type="text" placeholder="Enter Equipment" />
                <button type="button" id="equipmentButton" onClick={ (e) => determineList(e) }>Add</button>
            </div>
            <div id="instructionsDiv">
                <ol className="list" id="instructionList"></ol>
                <input id="instructionInput" className="listInput" type="text" placeholder="Enter Instruction" />
                <button type="button" id="instructionsButton" onClick={ (e) => determineList(e) }>Add</button>
            </div>
            <input className="submit" id="recipeSubmit" type="submit" value="Create Recipe" />
        </form>
    );
};

const init = () => {
    const root = createRoot(document.getElementById('content'));
    root.render( <RecipeForm /> );
};
window.onload = init;