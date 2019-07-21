const express = require('express');
const router = express.Router();

const product = require('../controllers/product.controller');

router.get('/', product.getProducts); // user enters to / then...
router.post('/', product.createProduct);
router.get('/:id', product.getProduct);
router.put('/:id', product.editProduct);
router.delete('/:id', product.deleteProduct);

module.exports = router;