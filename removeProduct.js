const mongoose = require('mongoose');
const Product = require('./models/Product'); // Adjust the path as necessary

// Connect to MongoDB
mongoose.connect('mongodb+srv://omorfia:mongodbadmin2024@clusterinventory.c8dcx.mongodb.net', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB connected');
        dropProductCollection();
    })
    .catch(err => console.error('MongoDB connection error:', err));

async function dropProductCollection() {
    try {
        // Drop the entire Product collection
        await Product.collection.drop(); 
        console.log('Product collection dropped successfully.');
    } catch (error) {
        console.error('Failed to drop Product collection:', error.message);
    } finally {
        mongoose.connection.close(); // Close the connection after the operation
    }
}