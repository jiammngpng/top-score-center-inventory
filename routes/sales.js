const express = require('express');
const router = express.Router();
const saleController = require('../controllers/SaleController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware); // Protect routes

router.post('/', saleController.createSale);
router.get('/', saleController.getSales);

module.exports = router;
