const db = require('../db/config');

const createUser = (email, password, callback) => {
    db.run(`INSERT INTO users (email, password) VALUES (?, ?)`, [email, password], function(err) {
        callback(err, this.lastID);
    });
};

const findUserByEmail = (email, callback) => {
    db.get(`SELECT * FROM users WHERE email = ?`, [email], callback);
};

module.exports = { createUser, findUserByEmail };
