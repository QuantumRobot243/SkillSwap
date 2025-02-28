const Feedback = require("../models/Feedback");

exports.submitFeedback = async (req, res) => {
  const { userId, message } = req.body;
  try {
    await Feedback.createFeedback(userId, message);
    res.status(201).json({ message: "Feedback submitted successfully!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
