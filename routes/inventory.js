const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/InventoryController');
const authMiddleware = require('../middlewares/authMiddleware'); // Import your middleware

// Protect the routes with the authMiddleware
router.use(authMiddleware); // Apply to all routes

router.post('/', inventoryController.addProduct);
router.get('/', inventoryController.getProducts);
router.get('/search', inventoryController.searchProducts); // Place search route before :id
router.get('/:id', inventoryController.getProductById); // Dynamic ID route goes last
router.put('/:id', inventoryController.updateProduct);
router.delete('/', inventoryController.deleteAllProducts);
router.delete('/:id', inventoryController.deleteProduct);


module.exports = router;