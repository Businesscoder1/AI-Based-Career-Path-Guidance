const mongoose = require("mongoose");

// Define the Profile schema
const profileSchema = new mongoose.Schema({
	gender: {
		type: String,
        trim: true,
	},
	dateOfBirth: {
		type: String,
        trim: true,
	},
	about: {
		type: String,
		trim: true,
	},
	contactNumber: {
		type: Number,
		trim: true,
	},
    education: {
        type: String,
        trim: true,
    }
});

// Export the Profile model
module.exports = mongoose.model("Profile", profileSchema);
