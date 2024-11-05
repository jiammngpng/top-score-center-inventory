const Product = require('../models/Product');
const Category = require('../models/Category'); // Import the Category model

// Add a new product
exports.addProduct = async (req, res) => {
    try {
        const { name, description, price, discountPrice, subcategory, stockQuantity, sku, imageUrl, tags } = req.body;

        // Validate that the subcategory belongs to an existing category
        const existingSubcategory = await Category.findOne({ "subcategories._id": subcategory });
        if (!existingSubcategory) {
            return res.status(400).json({ message: 'Invalid subcategory ID' });
        }

        // Create new product instance
        const product = new Product({
            name,
            description,
            price,
            discountPrice,
            subcategory, // Directly assign subcategory ID
            stockQuantity,
            sku,
            imageUrl,
            tags,
        });

        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all products
exports.getProducts = async (req, res) => {
    const { page = 1, limit = 10, sortBy = 'createdAt', order = 'asc' } = req.query;

    try {
        const products = await Product.find()
            .populate('subcategory', 'name') // Populate subcategory with only the name
            .sort({ [sortBy]: order === 'asc' ? 1 : -1 })  // Sorting by specified field
            .limit(parseInt(limit))  // Limit number of results per page
            .skip((parseInt(page) - 1) * parseInt(limit)); // Skip to the correct page

        const totalProducts = await Product.countDocuments();
        res.status(200).json({
            totalProducts,
            totalPages: Math.ceil(totalProducts / limit),
            currentPage: parseInt(page),
            products
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a product by ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Search products
exports.searchProducts = async (req, res) => {
    const { name, category, supplier } = req.query;
    const query = {};

    console.log("Search Parameters:", req.query);

    if (name) {
        query.name = { $regex: name, $options: 'i' }; // Case-insensitive search
    }
    if (category) {
        query.category = category;
    }
    if (supplier) {
        // First, find the supplier by name
        const supplierDoc = await Supplier.findOne({ name: { $regex: supplier, $options: 'i' } });
        if (supplierDoc) {
            query.supplier = supplierDoc._id; // Use the found supplier's ID
        }
    }

    try {
        const products = await Product.find(query).populate('supplier');
        res.json(products);
    } catch (error) {
        console.error("Search Error:", error); // Log the error
        res.status(400).json({ message: error.message });
    }
};

// Update a product
exports.updateProduct = async (req, res) => {
    try {
        const { category, subcategory } = req.body;

        // Validate category existence
        if (category) {
            const existingCategory = await Category.findById(category);
            if (!existingCategory) {
                return res.status(400).json({ message: 'Invalid category ID' });
            }
        }

        // Validate subcategory
        if (subcategory && category) {
            const existingCategory = await Category.findById(category);
            const validSubcategory = existingCategory.subcategories.find(sub => sub.name === subcategory);
            if (!validSubcategory) {
                return res.status(400).json({ message: 'Invalid subcategory for the specified category' });
            }
        }

        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.status(204).json();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete all products
exports.deleteAllProducts = async (req, res) => {
    try {
        await Product.deleteMany({}); // Deletes all documents in the Product collection
        res.status(200).json({ message: 'All products have been deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
