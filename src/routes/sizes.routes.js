const express = require('express');
const router = express.Router();

const sizes = require('../controllers/size.controller');

router.get('/', sizes.getSizes); // user enters to / then...
router.get('/:id', sizes.getSize);
router.post('/', sizes.postSizes);
router.put('/:id', sizes.editSizes);
router.delete('/:id', sizes.deleteSizes); 

module.exports = router;