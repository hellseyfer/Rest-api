const express = require('express');
const router = express.Router();

const ordstatus = require('../controllers/ordstatus.controller');

router.get('/', ordstatus.getStatus); // user enters to / then...
router.put('/:status', ordstatus.setStatus);
/* router.get('/:id', genders.getGender); */

module.exports = router;