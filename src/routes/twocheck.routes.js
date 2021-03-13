const express = require('express');
const router = express.Router();

const twocheck = require('../controllers/twocheck.controller');

router.get('/', twocheck.getNotifications); // user enters to / then...

module.exports = router;