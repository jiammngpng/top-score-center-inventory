const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://omorfia:mongodbadmin2024@clusterinventory.c8dcx.mongodb.net', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB connected');
        dropDatabase();
    })
    .catch(err => console.error('MongoDB connection error:', err));

async function dropDatabase() {
    try {
        const db = mongoose.connection.db;
        await db.dropDatabase();
        console.log('Database dropped successfully.');
    } catch (error) {
        console.error('Error dropping database:', error);
    } finally {
        mongoose.connection.close();
    }
}
