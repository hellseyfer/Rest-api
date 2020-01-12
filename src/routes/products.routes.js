const express = require('express');
const router = express.Router();

const product = require('../controllers/product.controller');

router.get('/', product.getProducts);
router.get('/:gender', product.getProductsByGender);
router.get('/:gender/:collection', product.getProductsByCollection);

module.exports = router;