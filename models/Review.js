const db = require('../db/config');

const addReview = (brewery_id, user_id, rating, description, callback) => {
    db.run(`INSERT INTO reviews (brewery_id, user_id, rating, description) VALUES (?, ?, ?, ?)`,
    [brewery_id, user_id, rating, description], function(err) {
        callback(err, this.lastID);
    });
};

const getReviewsByBrewery = (brewery_id, callback) => {
    db.all(`SELECT * FROM reviews WHERE brewery_id = ?`, [brewery_id], callback);
};

module.exports = { addReview, getReviewsByBrewery };
