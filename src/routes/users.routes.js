const express = require('express');
const router = express.Router();

const user = require('../controllers/user.controller');

router.get('/', user.getUsers); // user enters to / then...
router.get('/:uid', user.getUser);
/* router.delete('/:id', materials.deleteMaterial);
router.post('/', materials.postMaterial);
router.put('/:id', materials.editMaterial); */

module.exports = router;