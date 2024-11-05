const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://omorfia:mongodbadmin2024@clusterinventory.c8dcx.mongodb.net', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(async () => {
    console.log('MongoDB connected');

    // Import the Category model
    const Category = require('./models/Category'); // Adjust the path as necessary

    try {
        // Update all categories to remove the subcategories field
        const result = await Category.updateMany({}, { $unset: { subcategories: "" } });

        // Check if result is not null and has modifiedCount property
        if (result && result.modifiedCount !== undefined) {
            console.log(`Successfully removed subcategories from ${result.modifiedCount} categories.`);
        } else {
            console.log('No categories were modified or an unexpected result was returned.');
        }
    } catch (error) {
        console.error('Error updating categories:', error);
    } finally {
        // Close the database connection
        mongoose.connection.close();
    }
})
.catch(err => console.error('MongoDB connection error:', err));
