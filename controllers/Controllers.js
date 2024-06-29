const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createUser, findUserByEmail } = require('../models/User');
const { addReview, getReviewsByBrewery } = require('../models/Review');
const SECRET_KEY = process.env.SECRET_KEY;

const register = (req, res) => {
    const { email, password } = req.body;
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) return res.status(500).send(err);
        createUser(email, hash, (err, userId) => {
            if (err) return res.status(500).send(err);
            res.status(201).send({ userId });
        });
    });
};

const login = (req, res) => {
    const { email, password } = req.body;
    findUserByEmail(email, (err, user) => {
        if (err || !user) return res.status(401).send('Invalid email or password');
        bcrypt.compare(password, user.password, (err, result) => {
            if (err || !result) return res.status(401).send('Invalid email or password');
            const token = jwt.sign({ userId: user.id }, SECRET_KEY);
            res.send({ token });
        });
    });
};

const addReviewController = (req, res) => {
    const { brewery_id, rating, description } = req.body;
    const userId = req.user.userId;
    addReview(brewery_id, userId, rating, description, (err, reviewId) => {
        if (err) return res.status(500).send(err);
        res.status(201).send({ reviewId });
    });
};

const getReviewsController = (req, res) => {
    const { brewery_id } = req.params;
    getReviewsByBrewery(brewery_id, (err, reviews) => {
        if (err) return res.status(500).send(err);
        res.send(reviews);
    });
};

module.exports = { register, login, addReviewController, getReviewsController };
