const express = require('express');

const router = express.Router();
const friendshipController = require('../controllers/friendship');

router.post('/send', friendshipController.send);
router.post('/acceptRequest', friendshipController.acceptRequest);
router.post('/rejectRequest', friendshipController.rejectRequest);

module.exports = router;
