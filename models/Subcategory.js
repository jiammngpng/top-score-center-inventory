const mongoose = require('mongoose');

// Define the Subcategory Schema
const SubcategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true // Ensure subcategory names are unique
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category', // Reference to the Category model
        required: true // Ensure this field is always filled
    },
    items: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product' // Reference to Product model
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now // Track when the subcategory was created
    },
    updatedAt: {
        type: Date,
        default: Date.now // Track the last update time
    }
});

// Middleware to update the updatedAt field
SubcategorySchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Subcategory', SubcategorySchema);