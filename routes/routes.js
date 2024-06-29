const express = require('express');
const { register, login, addReviewController, getReviewsController } = require('../controllers/Controllers');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/reviews', authMiddleware, addReviewController);
router.get('/reviews/:brewery_id', getReviewsController);

module.exports = router;
