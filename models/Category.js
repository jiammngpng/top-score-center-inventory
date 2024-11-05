// models/Category.js
const mongoose = require('mongoose');

// Main Category Schema
const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true // Ensure category names are unique
    },
    description: {
        type: String // Optional field for a category description
    },
    createdAt: {
        type: Date,
        default: Date.now // Track when the category was created
    },
    updatedAt: {
        type: Date,
        default: Date.now // Track the last update time
    }
});

// Middleware to update the updatedAt field
CategorySchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Category', CategorySchema);
