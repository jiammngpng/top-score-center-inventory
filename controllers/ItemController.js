const Item = require('../models/Item');

// Create a new item
exports.createItem = async (req, res) => {
    try {
        const { productId, quantity, condition, location, status } = req.body;

        const newItem = new Item({
            productId,
            quantity,
            condition,
            location,
            status
        });

        const savedItem = await newItem.save();

        return res.status(201).json({
            message: 'Item created successfully!',
            item: savedItem
        });
    } catch (error) {
        return res.status(400).json({
            message: 'Item validation failed',
            error: error.message
        });
    }
};

// Get all items
exports.getItems = async (req, res) => {
    try {
        const items = await Item.find().populate('productId');
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an item
exports.updateItem = async (req, res) => {
    try {
        const { itemId } = req.params;
        const updatedItem = await Item.findByIdAndUpdate(itemId, req.body, { new: true });
        if (!updatedItem) return res.status(404).json({ message: 'Item not found' });

        return res.status(200).json({
            message: 'Item updated successfully!',
            item: updatedItem
        });
    } catch (error) {
        return res.status(400).json({
            message: 'Item update failed',
            error: error.message
        });
    }
};

// Delete an item
exports.deleteItem = async (req, res) => {
    try {
        const { itemId } = req.params;
        const deletedItem = await Item.findByIdAndDelete(itemId);
        if (!deletedItem) return res.status(404).json({ message: 'Item not found' });

        return res.status(200).json({ message: 'Item deleted successfully!' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
