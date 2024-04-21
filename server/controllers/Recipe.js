const models = require('../models');

const { Recipe } = models;

const creatorPage = async (req, res) => res.render('creator');
const homePage = async (req, res) => res.render('home');
const viewerPage = async (req, res) => res.render('viewer');

const getRecipes = async (req, res) => {
    try {
        const query = {};
        const docs = await Recipe.find(query)
            .select('title author prepTime cookTime ingredients equipment instructions createdDate')
            .lean().exec();

        return res.json({ recipes: docs });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Error retriving recipes!' });
    }
};

const getRecipeById = async (req, res) => {
    try {
        const query = { id: req.id };
        const docs = await Recipe.find(query)
            .select('title author prepTime cookTime ingredients equipment instructions')
            .lean().exec();
        
        return res.json({ recipe: docs });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Error retrieving recipe!' });
    }
};

const getRecipeByAuthor = async (req, res) => {
    try {
        const query = { author: req.author };
        const docs = await Recipe.find(query)
            .select('title author prepTime cookTime ingredients equipment instructions')
            .lean().exec();

        return res.json({ recipes: docs });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Error retrieving recipes!' });
    }
};

const createRecipe = async (req, res) => {
    if (!req.body.title || !req.body.prepTime || 
        !req.body.cookTime || !req.body.ingredients || 
        !req.body.equipment || !req.body.instructions) {
        return res.status(400).json({
            error: 'Title, Prep Time, Cook Time, Ingredients, Equipment, and Instructions are Required!'
        });
    }

    console.log("Ingredients: " + req.body.ingredients);
    console.log("Equipment: " + req.body.equipment);
    console.log("Instructions: " + req.body.instructions);

    const recipeData = {
        title: req.body.title,
        author: req.session.account.username,
        tags: req.body.tags,
        prepTime: req.body.prepTime,
        cookTime: req.body.cookTime,
        ingredients: req.body.ingredients,
        equipment: req.body.equipment,
        instructions: req.body.instructions,
        owner: req.session.account._id,
    };

    console.log("Recipe Data: " + recipeData);

    try {
        const newRecipe = new Recipe(recipeData);
        await newRecipe.save();
        return res.status(201).json({
            title: newRecipe.title,
            author: newRecipe.author,
            tags: newRecipe.tags,
            prepTime: newRecipe.prepTime,
            cookTime: newRecipe.cookTime,
            ingredients: newRecipe.ingredients,
            equipment: newRecipe.ingredients,
            instructions: newRecipe.instructions,
        });
    } catch (err) {
        console.log(err);
        if (err.code === 11000) {
            return res.status(400).json({ error: 'Recipe already exists!' });
        }
        return res.status(500).json({ error: 'An error occurred making recipe!' });
    }
};

module.exports = {
    creatorPage,
    createRecipe,
    homePage,
    viewerPage,
    getRecipes,
    getRecipeById,
    getRecipeByAuthor,
};