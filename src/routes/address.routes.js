const express = require('express');
const router = express.Router();

const address = require('../controllers/address.controller');

router.get('/:uid', address.getAddressesById); // user enters to / then...
router.post('/:uid', address.postAddress);
router.put('/:uid', address.editAddress);
/* router.delete('/:id', brands.deleteBrand);
router.post('/', brands.postBrand);

 */
module.exports = router;