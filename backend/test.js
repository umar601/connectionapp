console.log('1️⃣ Script started');
require('dotenv').config();
console.log('2️⃣ Dotenv loaded');

const mongoose = require('mongoose');
console.log('3️⃣ Mongoose imported');

console.log('4️⃣ Attempting to connect...');

// Add timeout to see if it fails faster
const connectWithTimeout = async () => {
    try {
        // Set a 10 second timeout
        await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 10000,
            connectTimeoutMS: 10000,
        });
        console.log('5️⃣ ✅ CONNECTED!');
        console.log('6️⃣ Database:', mongoose.connection.name);
        process.exit(0);
    } catch (err) {
        console.log('5️⃣ ❌ FAILED!');
        console.log('6️⃣ Error:', err.message);
        process.exit(1);
    }
};

connectWithTimeout();