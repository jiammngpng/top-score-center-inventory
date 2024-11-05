const mongoose = require('mongoose');
const fs = require('fs');

// Function to back up the database
async function backupDatabase() {
    try {
        // List all collections in the database
        const collections = await mongoose.connection.db.listCollections().toArray();

        for (const collection of collections) {
            const data = await mongoose.connection.db.collection(collection.name).find({}).toArray();
            fs.writeFileSync(`${collection.name}.json`, JSON.stringify(data, null, 2));
            console.log(`Backed up ${collection.name}`);
        }
    } catch (error) {
        console.error('Error during backup:', error);
    } finally {
        mongoose.disconnect(); // Disconnect after the backup
    }
}

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://omorfia:mongodbadmin2024@clusterinventory.c8dcx.mongodb.net', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => {
    console.log('MongoDB connected');
    backupDatabase(); // Call the backup function
})
.catch(err => console.error('MongoDB connection error:', err));
