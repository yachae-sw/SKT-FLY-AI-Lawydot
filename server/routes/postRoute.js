const { getAllPost, getAllPost_one } = require('../controllers/postController');

const router = require('express').Router();

router.post('/getAllPost/', getAllPost);
router.post('/getonePost/', getAllPost_one);

module.exports = router;
