const mongoose = require('mongoose');

const SaleSchema = new mongoose.Schema({
    products: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true }
    }],
    customer: {
        name: { type: String, required: true },
        contactInfo: { type: String, required: true }
    },
    supplier: { 
        type: mongoose.Schema.Types.ObjectId,  // Reference to the supplier's ObjectId
        ref: 'Supplier',  // Assuming you have a Supplier model
        required: true 
    },
    totalAmount: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Sale', SaleSchema);
