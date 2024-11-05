const mongoose = require('mongoose');

// Define the Product Schema
const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true // Ensure product names are unique
    },
    description: {
        type: String,
        required: true // Product description
    },
    price: {
        type: Number,
        required: true // Price of the product
    },
    discountPrice: {
        type: Number,
        default: null // Optional discount price
    },
    subcategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subcategory', // Reference to the Subcategory model
        required: true // Ensure a product has a subcategory
    },
    stockQuantity: {
        type: Number,
        required: true, // Quantity available in stock
        min: 0 // Quantity can't be negative
    },
    sku: {
        type: String,
        required: true, // Stock Keeping Unit
        unique: true // Ensure SKUs are unique
    },
    imageUrl: {
        type: String,
        required: true // URL for the product image
    },
    tags: {
        type: [String], // Array of tags
        default: [] // Default to an empty array
    },
    createdAt: {
        type: Date,
        default: Date.now // Track when the product was created
    },
    updatedAt: {
        type: Date,
        default: Date.now // Track the last update time
    }
});

// Middleware to update the updatedAt field
ProductSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Product', ProductSchema);