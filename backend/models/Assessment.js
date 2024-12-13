const mongoose = require('mongoose');
// Define the schema for the assessment data
const assessmentSchema = new mongoose.Schema({
  cgpa: {
    type: Number,
    required: true,
    min: 0,
    max: 10
  },
  courseStatus: {
    type: String,
    enum: ['in-progress', 'completed'],
    required: true
  },
  academicAchievement: {
    type: String,
    enum: ['high', 'medium', 'low'],
    required: true
  },
  personalInterest: {
    type: String,
    enum: [
      'Travelling', 
      'Coding', 
      'Gaming', 
      'Reading', 
      'Sports', 
      'Music'
    ],
    required: true
  },
  internship: {
    type: String,
    enum: ['yes', 'no'],
    required: true
  },
  certificates: {
    type: String,
    enum: ['yes', 'no'],
    required: true
  },
  leadership: {
    type: String,
    enum: ['yes', 'no'],
    required: true
  },
  softSkills: {
    communication: {
      type: Number,
      min: 0,
      max: 10
    },
    problemSolving: {
      type: Number,
      min: 0,
      max: 10
    },
    teamwork: {
      type: Number,
      min: 0,
      max: 10
    },
    timeManagement: {
      type: Number,
      min: 0,
      max: 10
    },
    adaptability: {
      type: Number,
      min: 0,
      max: 10
    }
  },
  technicalSkills: {
    python: {
      type: Number,
      min: 0,
      max: 10
    },
    java: {
      type: Number,
      min: 0,
      max: 10
    },
    cpp: {
      type: Number,
      min: 0,
      max: 10
    },
    javascript: {
      type: Number,
      min: 0,
      max: 10
    },
    csharp: {
      type: Number,
      min: 0,
      max: 10
    },
    php: {
      type: Number,
      min: 0,
      max: 10
    },
    ruby: {
      type: Number,
      min: 0,
      max: 10
    },
    swift: {
      type: Number,
      min: 0,
      max: 10
    },
    go: {
      type: Number,
      min: 0,
      max: 10
    },
    rust: {
      type: Number,
      min: 0,
      max: 10
    },
    others: {
      type: Number,
      min: 0,
      max: 10
    },
    interestInSoftwareDev: {
      type: Number,
      min: 0,
      max: 10
    },
    interestInDatabaseManagement: {
      type: Number,
      min: 0,
      max: 10
    },
    interestInNetworkingSkills: {
      type: Number,
      min: 0,
      max: 10
    },
    interestInWebDevelopment: {
      type: Number,
      min: 0,
      max: 10
    }
  }
});

// Create a model from the schema
const Assessment = mongoose.model('Assessment', assessmentSchema);

module.exports = Assessment;
