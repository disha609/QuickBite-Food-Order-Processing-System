import { RequestHandler } from 'express';
import Menu from '../models/menu.model';

// List menu items where available = true
export const listMenu: RequestHandler = async (req, res) => {
  try {
    const items = await Menu.find({ available: true });
    res.json(items);
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
};

// Create Menu Item
export const createMenuItem: RequestHandler = async (req, res) => {
  try {
    const newItem = new Menu(req.body);
    const saved = await newItem.save();
    res.status(201).json(saved);
  } catch (err) {
    const error = err as Error;
    res.status(400).json({ error: error.message });
  }
};

// Get All Menu Items
export const getAllMenuItems: RequestHandler = async (_, res) => {
  try {
    const items = await Menu.find();
    res.status(200).json(items);
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
};

// Get Item by ID
export const getMenuItemById: RequestHandler = async (req, res) => {
  try {
    const item = await Menu.findById(req.params.id);
    if (!item) {
      res.status(404).json({ error: 'Not found' });
      return;
    }
    res.json(item);
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
};

// Update Item
export const updateMenuItem: RequestHandler = async (req, res) => {
  try {
    const updated = await Menu.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      res.status(404).json({ error: 'Not found' });
      return;
    }
    res.json(updated);
  } catch (err) {
    const error = err as Error;
    res.status(400).json({ error: error.message });
  }
};

// Delete Item
export const deleteMenuItem: RequestHandler = async (req, res) => {
  try {
    const deleted = await Menu.findByIdAndDelete(req.params.id);
    if (!deleted) {
      res.status(404).json({ error: 'Not found' });
      return;
    }
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
};
