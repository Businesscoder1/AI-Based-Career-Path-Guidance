const mongoose = require('mongoose');
require('dotenv').config();

exports.connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('MongoDB connected');
    }catch(err){    
        console.log(err);
        process.exit(1);
    }
};
