const express = require('express');
const router = express.Router();

const brands = require('../controllers/brand.controller');

router.get('/', brands.getBrands); // user enters to / then...
router.delete('/:id', brands.deleteBrand);
router.post('/', brands.postBrand);
router.put('/:id', brands.editBrand);

module.exports = router;