const mongoose = require('mongoose');
const Category = require('./models/Category');
const Subcategory = require('./models/Subcategory');
const Product = require('./models/Product');

mongoose.connect('mongodb+srv://omorfia:mongodbadmin2024@clusterinventory.c8dcx.mongodb.net', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        console.log('MongoDB connected');

        // Fetch existing categories
        const categories = await Category.find();
        
        // Loop through categories and create subcategories
        for (const category of categories) {
            const subcategory = new Subcategory({
                name: `${category.name} Subcategory`, // Customize as needed
                categoryId: category._id
            });
            await subcategory.save();

            // Update existing products to reference the new subcategory
            await Product.updateMany(
                { /* condition to find products belonging to this category */ },
                { $set: { subcategory: subcategory._id } } // Set the new subcategory ID
            );
        }

        console.log('Data migration completed.');
    })
    .catch(err => console.error('MongoDB connection error:', err))
    .finally(() => mongoose.disconnect());
