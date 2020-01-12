const express = require('express');
const router = express.Router();

const genders = require('../controllers/gender.controller');

router.get('/', genders.getGenders); // user enters to / then...
/* router.get('/:id', genders.getGender); */

module.exports = router;