const mongoose = require('mongoose');

const domainSchema = new mongoose.Schema({
  domain: {
    type: String,
    required: true,
    unique: true // This ensures no duplicate domains
  },
  subdomains: {
    type: [String], // Array of strings for subdomains
    required: true
  }
});

module.exports = mongoose.model('Domain', domainSchema);
