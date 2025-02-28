const db = require("../config/db");

class User {
  static async createUser(name, email, password) {
    const query = `INSERT INTO Userdata (name, email, password_hash) VALUES (?, ?, ?)`;
    return new Promise((resolve, reject) => {
      db.query(query, [name, email, password], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }
}

module.exports = User;
