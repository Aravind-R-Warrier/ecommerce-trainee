import express from 'express';
import {
  addItemCartController,
  deleteItemCartController,
  getTotalCartController,
  syncCartController,
  getAllCartsController,
  getUserCartController
} from '../../controllers/Cart/CartController.js';

const router = express.Router();

// Add item to cart
router.post('/add/:userId', addItemCartController);

// Remove item from cart
router.delete('/remove/:userId/:productId', deleteItemCartController);

// Get total cart price
router.get('/total/:userId', getTotalCartController);

// Sync cart (replace with new list of items)
router.put('/sync/:userId', syncCartController);

// Get all carts (admin route)
router.get('/all', getAllCartsController);

// Get specific user's cart
router.get('/:userId', getUserCartController);

export default router;
