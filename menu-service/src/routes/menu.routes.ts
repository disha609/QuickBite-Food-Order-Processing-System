import express, { Router } from 'express';
import {
  createMenuItem,
  getAllMenuItems,
  getMenuItemById,
  updateMenuItem,
  deleteMenuItem
} from '../controllers/menu.controller';

const router: Router = express.Router();

router.post('/', createMenuItem);
router.get('/', getAllMenuItems);
router.get('/:id', getMenuItemById);
router.put('/:id', updateMenuItem);
router.delete('/:id', deleteMenuItem);

export default router;
