const express = require('express');
const router = express.Router();

const seller = require('../controllers/seller.controller');

router.get('/', seller.getSellers); // user enters to / then...
router.get('/:id', seller.getSeller);
router.post('/:uid', seller.postSeller);
router.put('/revoke/:uid', seller.revokeSeller);
/*router.post('/', sizes.postSizes);
router.put('/:id', sizes.editSizes);
router.delete('/:id', sizes.deleteSizes);  */

module.exports = router;