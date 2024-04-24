const models = require('../models');

const { Recipe } = models;

//Renders the creator or home pages if called
const creatorPage = async (req, res) => res.render('creator');
const homePage = async (req, res) => res.render('home');

//Retrieves recipes from the database and returns them
const getRecipes = async (req, res) => {
    try {
        const query = {};
        const docs = await Recipe.find(query)
            .select('title author prepTime cookTime ingredients equipment instructions createdDate _id')
            .lean().exec();

        return res.json({ recipes: docs });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Error retriving recipes!' });
    }
};


const getRecipeById = async (req, res) => {
    try {
        const query = { _id: req.query.id };
        console.log("Id: " + query);
        const docs = await Recipe.find(query)
            .select('title author prepTime cookTime ingredients equipment instructions createdDate _id')
            .lean().exec();

        console.log("Docs: " + docs);

        return res.json({ recipe: docs });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Error retrieving recipes!' });
    }
};

//Creates a Recipe and sends it to the database
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
        author: req.session.account.username,
        tags: req.body.tags,
        prepTime: req.body.prepTime,
        cookTime: req.body.cookTime,
        ingredients: req.body.ingredients,
        equipment: req.body.equipment,
        instructions: req.body.instructions,
        owner: req.session.account._id,
    };

    try {
        const newRecipe = new Recipe(recipeData);
        await newRecipe.save();
        return res.status(201).json({
            redirect: '/home'
        });
    } catch (err) {
        console.log(err);
        if (err.code === 11000) {
            return res.status(400).json({ error: 'Recipe already exists!' });
        }
        return res.status(500).json({ error: 'An error occurred making recipe!' });
    }
};

//exports functions
module.exports = {
    creatorPage,
    createRecipe,
    homePage,
    getRecipes,
    getRecipeById,
};