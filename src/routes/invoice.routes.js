const express = require('express');
const router = express.Router();

const invoice = require('../controllers/invoice.controller');
 
router.get('/', invoice.getInvoices); // user enters to / then...
router.get('/:uid', invoice.getInvoice); 
router.post('/:uid', invoice.postInvoice);
/* router.delete('/:id', materials.deleteMaterial);
router.post('/', materials.postMaterial);
router.put('/:id', materials.editMaterial); */

module.exports = router;