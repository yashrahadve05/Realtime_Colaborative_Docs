const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://yashrahadve:89LRtFhRcZuNN1dt@cluster0.i08s4.mongodb.net/Realtime_Colaborative_Docs')
        console.log('Database Connected');
    } catch (error) {
        console.log('Database connection error: ', error.message);
    }
}

module.exports = connectDB