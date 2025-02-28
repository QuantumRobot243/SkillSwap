const db = require("../config/db");

class Feedback {
  static async createFeedback(userId, message) {
    const query = `INSERT INTO Feedback (user_id, message) VALUES (?, ?)`;
    return new Promise((resolve, reject) => {
      db.query(query, [userId, message], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }
}

module.exports = Feedback;
