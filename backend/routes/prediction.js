const express = require("express")
const router = express.Router()

const { auth } = require("../middlewares/auth");
const { predict } = require("../controllers/PredicationController");

router.post("/predict", predict);

module.exports = router;