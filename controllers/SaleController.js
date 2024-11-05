const Sale = require('../models/Sale');
const Category = require('../models/Category');

// Create a new sale
exports.createSale = async (req, res) => {
    try {
        const { products, customer, supplier } = req.body; // Changed supplierId to supplier

        // Calculate the total amount dynamically
        const totalAmount = products.reduce((total, product) => {
            return total + (product.price * product.quantity);
        }, 0).toFixed(2);
        
        // Create a new sale instance
        const newSale = new Sale({
            products,
            customer,
            supplier,  // Use supplier directly here
            totalAmount: parseFloat(totalAmount)
        });

        // Save the new sale to the database
        const savedSale = await newSale.save();

        // Format total amount with peso sign for the response

        return res.status(201).json({
            message: 'Sale created successfully!',
            sale: savedSale
        });
    } catch (error) {
        return res.status(400).json({
            message: 'Sale validation failed',
            error: error.message
        });
    }
};

// Get all sales
exports.getSales = async (req, res) => {
    try {
        const sales = await Sale.find()
            .populate({
                path: 'products.productId',
                populate: {
                    path: 'category', // Populates category of each product
                    model: 'Category'
                }
            })
            .populate('customer')
            .populate('supplier');
        
        res.status(200).json(sales);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
