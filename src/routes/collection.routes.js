const express = require('express');
const router = express.Router();

const collections = require('../controllers/collection.controller');

router.get('/:id', collections.getCollectionById);


module.exports = router;