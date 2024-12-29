const mongoose = require('mongoose')

require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log('Database Connected');
    } catch (error) {
        console.log('Database connection error: ', error.message);
    }
}

module.exports = connectDB