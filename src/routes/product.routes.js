const express = require('express');
const router = express.Router();

const product = require('../controllers/product.controller');

router.get('/:id', product.getProduct);
// router.get('/:id/:varia', product.getProduct2);
router.put('/:id', product.editProduct);
router.put('/delete/:id', product.deleteProduct);
router.put('/pause/:id', product.pauseProduct);
router.put('/active/:id', product.activeProduct);
router.put('/updatestock/:id/:varia/:size/:newqty', product.updateStockProduct);
router.post('/:uid', product.postProduct);


module.exports = router;