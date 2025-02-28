const express = require("express");
const router = express.Router();

// Corrected path to the feedback controller
const { submitFeedback } = require("../controllers/feedbackController");

router.post("/feedback", submitFeedback);

module.exports = router;
