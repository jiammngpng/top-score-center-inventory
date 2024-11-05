const express = require('express');
const router = express.Router();
const itemController = require('../controllers/ItemController');

router.post('/', itemController.createItem); // Create an item
router.get('/', itemController.getItems); // Get all items
router.put('/:itemId', itemController.updateItem); // Update an item
router.delete('/:itemId', itemController.deleteItem); // Delete an item

module.exports = router;
