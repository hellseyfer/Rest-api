const express = require('express');
const router = express.Router();

const materials = require('../controllers/material.controller');

router.get('/', materials.getMaterials); // user enters to / then...
router.delete('/:id', materials.deleteMaterial);
router.post('/', materials.postMaterial);
router.put('/:id', materials.editMaterial);

module.exports = router;