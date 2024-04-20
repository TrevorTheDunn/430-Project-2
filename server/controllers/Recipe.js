const models = require('../models');

const { Recipe } = models;

const creatorPage = async (req, res) => res.render('creator');
const homePage = async (req, res) => res.render('home');

const createRecipe = async (req, res) => {
    if (!req.body.title || !req.body.prepTime || 
        !req.body.cookTime || !req.body.ingredients || 
        !req.body.equipment || !req.body.instructions) {
        return res.status(400).json({
            error: 'Title, Prep Time, Cook Time, Ingredients, Equipment, and Instructions are Required!'
        });
    }

    const recipeData = {
        title: req.body.title,
        author: req.body.author,
        tags: req.body.tags,
        prepTime: req.body.prepTime,
        cookTime: req.body.cookTime,
        ingredients: req.body.ingredients,
        equipment: req.body.equipment,
        instructions: req.body.instructions,
        owner: req.session.accout._id,
    };

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
            instructions: newRecipe.instructions
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
};