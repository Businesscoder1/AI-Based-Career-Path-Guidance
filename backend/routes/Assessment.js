const express = require('express');
const router = express.Router();

const { auth } = require('../middlewares/auth');
const {
    addAssessment,
    editAssessment,
  } = require("../controllers/Assessment");
  
  // ********************************************************************************************************
  //                                      Assessment routes
  // ********************************************************************************************************
  // Delet User Account
    router.post("/addAssessment", auth, addAssessment)
    router.put("/editAssessment", auth, editAssessment)
  module.exports = router