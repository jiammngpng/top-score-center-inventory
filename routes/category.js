const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/CategoryController');
const SubcategoryController = require('../controllers/SubcategoryController');

// Create a new category
router.post('/', categoryController.createCategory);

// Get all categories
router.get('/', categoryController.getAllCategories);

// Route to delete all categories
router.delete('/', categoryController.deleteAllCategories);

// Get a category by ID
router.get('/:id', categoryController.getCategoryById);

// Update a category
router.put('/:id', categoryController.updateCategory);

// Delete a category
router.delete('/:id', categoryController.deleteCategory);

// Subcategory routes
// Create a new subcategory
router.post('/subcategories', SubcategoryController.createSubcategory);

// Get all subcategories for a specific category
router.get('/subcategories/:subcategoryId', SubcategoryController.getSubcategoryById);

// Get all subcategories
router.get('/subcategories', SubcategoryController.getAllSubcategories);

// Get subcategories by category ID
router.get('/:categoryId/subcategories', SubcategoryController.getSubcategoriesByCategoryId);

module.exports = router;
