const express = require('express');
const router = express.Router();

const collections = require('../controllers/collection.controller');

router.get('/', collections.getCollections); // user enters to / then...
// router.get('/:id', collections.getCollection);
//router.get('/:id', collections.getCollectionById);
router.get('/:gender', collections.getCollectionByGender);
router.delete('/:id', collections.deleteCollection);
router.post('/', collections.postCollection);
router.put('/:id', collections.editCollection);

module.exports = router;