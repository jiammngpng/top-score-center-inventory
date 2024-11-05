const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Route Imports
const inventoryRoutes = require('./routes/inventory');
const authRoutes = require('./routes/auth');
const supplierRoutes = require('./routes/supplier');
const salesRoutes = require('./routes/sales');
const categoryRoutes = require('./routes/category');
const itemRoutes = require('./routes/item');

dotenv.config();

// Check for required environment variables
if (!process.env.MONGO_URI) {
    console.error("Error: MONGO_URI is not set in .env file");
    process.exit(1);
}

const app = express();

// Middleware
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000' })); // Use FRONTEND_URL from .env if available
app.use(express.json());

// Routes
app.use('/api/inventory', inventoryRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/supplier', supplierRoutes);
app.use('/api/sales', salesRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/items', itemRoutes);

// Simple route to test server
app.get('/', (req, res) => {
    res.send('Welcome to Top Score Center Inventory System');
});

// Catch-all handler for unknown routes
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// Global error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected");

        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
        process.exit(1);
    });


// Optional: Global error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});
