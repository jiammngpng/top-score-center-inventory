const Category = require('../models/Category'); // Adjust the path as necessary
const Subcategory = require('../models/Subcategory');

// Create a new category
exports.createCategory = async (req, res) => {
    try {
        const { name, description, subcategories } = req.body;

        // Check if a category with the same name already exists
        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            return res.status(400).json({ message: 'Category already exists' });
        }

        // Create the new category
        const newCategory = new Category({ name, description });
        const savedCategory = await newCategory.save();

        // Link subcategories to the new category
        if (subcategories && subcategories.length > 0) {
            const subcategoriesWithCategoryId = subcategories.map(sub => ({
                ...sub,
                categoryId: savedCategory._id // Link subcategory to the new category
            }));

            // Update the saved category with subcategories
            savedCategory.subcategories = subcategoriesWithCategoryId;
            await savedCategory.save(); // Save the updated category
        }

        return res.status(201).json(savedCategory);
    } catch (error) {
        return res.status(400).json({ message: 'Category creation failed', error: error.message });
    }
};

// Retrieve all categories
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        return res.status(200).json(categories);
    } catch (error) {
        return res.status(400).json({ message: 'Error retrieving categories', error: error.message });
    }
};

// Retrieve a single category by ID
exports.getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        return res.status(200).json(category);
    } catch (error) {
        return res.status(400).json({ message: 'Error retrieving category', error: error.message });
    }
};

// Update a category by ID
exports.updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedCategory = await Category.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }
        return res.status(200).json(updatedCategory);
    } catch (error) {
        return res.status(400).json({ message: 'Error updating category', error: error.message });
    }
};

// Fetch subcategories by category ID
exports.getSubcategoriesByCategoryId = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const subcategories = await Subcategory.find({ categoryId: categoryId });
        
        if (!subcategories.length) {
            return res.status(404).json({ message: 'No subcategories found for this category.' });
        }

        res.status(200).json(subcategories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};



// Delete a category by ID
exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCategory = await Category.findByIdAndDelete(id);
        if (!deletedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }
        return res.status(204).json(); // No content
    } catch (error) {
        return res.status(400).json({ message: 'Error deleting category', error: error.message });
    }
};


// Delete all categories
exports.deleteAllCategories = async (req, res) => {
    try {
        await Category.deleteMany({}); // Deletes all documents in the Category collection
        res.status(200).json({ message: 'All categories deleted successfully.' });
    } catch (error) {
        console.error('Error deleting categories:', error);
        res.status(500).json({ message: 'Failed to delete categories.', error });
    }
};
