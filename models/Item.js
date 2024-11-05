const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 0
    },
    condition: {
        type: String, // e.g., 'new', 'used'
        enum: ['new', 'used'],
        required: true
    },
    location: {
        type: String // Optional, for storage location
    },
    status: {
        type: String, // e.g., 'available', 'sold', 'damaged'
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Item', ItemSchema);