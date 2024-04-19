const mongoose = require('mongoose');
const _ = require('underscore');

const setTitle = (title) => _.escape(title).trim();
const setAuthor = (author) => _.escape(author).trim();
const setTags = (tags) => {
    for(let i = 0; i < tags.length; i++) {
        _.escape(tags[i]).trim();
    }
};
const setIngredients = (ingredients) => {
    for(let i = 0; i < ingredients.length; i++) {
        _.escape(ingredients[i]).trim();
    }
};
const setEquipment = (equipment) => {
    for(let i = 0; i < equipment.length; i++) {
        _.escape(equipment[i]).trim();
    }
};
const setInstructions = (instructions) => {
    for(let i = 0; i < instructions.length; i++) {
        _.escape(instructions[i]).trim();
    }
};

const RecipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        set: setTitle,
    },
    author: {
        type: String,
        required: true,
        trim: true,
        set: setAuthor,
    },
    tags: {
        type: [String],
        required: false,
        trim: true,
        set: setTags,
    },
    prepTime: {
        type: Number,
        min: 0,
        required: true,
    },
    cookTime: {
        type: Number,
        min: 0,
        required: true,
    },
    ingredients: {
        type: [String],
        required: true,
        trim: true,
        set: setIngredients,
    },
    equipment: {
        type: [String],
        required: true,
        trim: true,
        set: setEquipment,
    },
    instructions: {
        type: [String],
        required: true,
        trim: true,
        set: setInstructions,
    },
    owner: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'Account',
    },
    createdDate: {
        type: Date,
        default: Date.now,
    },
});

RecipeSchema.statics.toAPI = (doc) => ({
    title: doc.title,
    tags: doc.tags,
    prepTime: doc.prepTime,
    cookTime: doc.cookTime,
    ingredients: doc.ingredients,
    equipment: doc.equipment,
    instructions: doc.instructions,
});

const RecipeModel = mongoose.model('Recipe', RecipeSchema);
module.exports = RecipeModel;