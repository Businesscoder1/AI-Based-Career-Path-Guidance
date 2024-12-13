const Assessment = require("../models/Assessment")
const User = require("../models/User")
const mongoose = require("mongoose")

//method to add the assessement

exports.addAssessment = async (req, res) => {
    try{
        const {
            cgpa,
            courseStatus,
            academicAchievement,
            personalInterest,
            internship,
            certificates,
            leadership,
            softSkills,
            technicalSkills,
          } = req.body;

        const id = req.user.id

        const newAssessment = await Assessment.create({
            cgpa,
            courseStatus,
            academicAchievement,
            personalInterest,
            internship,
            certificates,
            leadership,
            softSkills,
            technicalSkills,
          });

              // Find user by ID and update the assessment reference
        const user = await User.findByIdAndUpdate(
            id,
            { assessmentDetails : newAssessment._id },
            { new: true } // Returns the updated document
        );
    
        if (!user) {
            return res.status(404).json({
            success: false,
            message: "User not found",
            });
        }
    
        return res.json({
            success: true,
            message: "assessment completed successfully",
            newAssessment,
        });

    }catch(error){
        console.log(error)
        return res.status(500).json({
            success: false,
            error: error.message,
        })
    }
};

exports.editAssessment = async (req, res) => {
    try {
      const {
        cgpa,
        courseStatus,
        academicAchievement,
        personalInterest,
        internship,
        certificates,
        leadership,
        softSkills,
        technicalSkills,
      } = req.body;
  
      const userId = req.user.id;
  
      // Find the user by ID and check if the user has an assessment
      const user = await User.findById(userId);
  
      if (!user || !user.assessmentDetails) {
        return res.status(404).json({
          success: false,
          message: "User or assessment not found",
        });
      }
  
      // Find the assessment by its ID and update it with new data
      const updatedAssessment = await Assessment.findByIdAndUpdate(
        user.assessmentDetails, // This is the assessment ID from the user's profile
        {
          cgpa,
          courseStatus,
          academicAchievement,
          personalInterest,
          internship,
          certificates,
          leadership,
          softSkills,
          technicalSkills,
        },
        { new: true } // Returns the updated document
      );
  
      if (!updatedAssessment) {
        return res.status(404).json({
          success: false,
          message: "Assessment not found",
        });
      }
  
      return res.json({
        success: true,
        message: "Assessment updated successfully",
        updatedAssessment,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  };