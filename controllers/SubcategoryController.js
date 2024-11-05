// SubcategoryController.js

const Subcategory = require('../models/Subcategory'); // Ensure this model is defined

// Create a new subcategory
exports.createSubcategory = async (req, res) => {
    try {
        const newSubcategory = new Subcategory(req.body);
        await newSubcategory.save();
        res.status(201).json(newSubcategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get subcategory by ID
exports.getSubcategoryById = async (req, res) => {
    try {
        const subcategory = await Subcategory.findById(req.params.subcategoryId);
        if (!subcategory) return res.status(404).json({ message: 'Subcategory not found' });
        res.json(subcategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all subcategories
exports.getAllSubcategories = async (req, res) => {
    try {
        const subcategories = await Subcategory.find();
        res.json(subcategories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get subcategories by category ID
exports.getSubcategoriesByCategoryId = async (req, res) => {
    try {
        const subcategories = await Subcategory.find({ categoryId: req.params.categoryId });
        res.json(subcategories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
