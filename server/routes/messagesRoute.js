const { addMessage } = require('../controllers/messageController');
const { geminiall } = require('../controllers/geminiController');
const { cosin } = require('../controllers/cosinController');

const router = require('express').Router();

router.post('/geminiall/', geminiall);
router.post('/addmsg/', addMessage);
router.get('/cosin/', cosin);

module.exports = router;
