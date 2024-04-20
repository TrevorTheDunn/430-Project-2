const mongoose = require('mongoose');
const _ = require('underscore');

const setTitle = (title) => _.escape(title).trim();
const setAuthor = (author) => _.escape(author).trim();

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
        type: Array,
        required: false,
        trim: true,
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
        type: Array,
        required: true,
        default: undefined,
        trim: true,
    },
    equipment: {
        type: Array,
        required: true,
        default: undefined,
        trim: true,
    },
    instructions: {
        type: Array,
        required: true,
        default: undefined,
        trim: true,
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