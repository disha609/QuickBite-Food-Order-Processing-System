import express, { Router } from 'express';
import {
  placeOrder,
  cancelOrder,
  getOrderById,
  getOrdersByUser,
  reorder,
  submitFeedback
} from '../controllers/order.controller';

const router = express.Router();

router.post('/', placeOrder);
router.put('/cancel/:id', cancelOrder);
router.get('/:id', getOrderById);
router.get('/user/:userId', getOrdersByUser);
router.post('/reorder/:id', reorder);
router.post('/feedback/:id', submitFeedback);

export default router;
