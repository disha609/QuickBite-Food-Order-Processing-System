"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMenuItem = exports.updateMenuItem = exports.getMenuItemById = exports.getAllMenuItems = exports.createMenuItem = void 0;
const menu_model_1 = __importDefault(require("../models/menu.model"));
// Create Menu Item
const createMenuItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newItem = new menu_model_1.default(req.body);
        const saved = yield newItem.save();
        return res.status(201).json(saved);
    }
    catch (err) {
        const error = err;
        return res.status(400).json({ error: error.message });
    }
});
exports.createMenuItem = createMenuItem;
// Get All Menu Items
const getAllMenuItems = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const items = yield menu_model_1.default.find();
        return res.status(200).json(items);
    }
    catch (err) {
        const error = err;
        return res.status(500).json({ error: error.message });
    }
});
exports.getAllMenuItems = getAllMenuItems;
// Get Item by ID
const getMenuItemById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const item = yield menu_model_1.default.findById(req.params.id);
        if (!item)
            return res.status(404).json({ error: 'Not found' });
        return res.json(item);
    }
    catch (err) {
        const error = err;
        return res.status(500).json({ error: error.message });
    }
});
exports.getMenuItemById = getMenuItemById;
// Update Item
const updateMenuItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updated = yield menu_model_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated)
            return res.status(404).json({ error: 'Not found' });
        return res.json(updated);
    }
    catch (err) {
        const error = err;
        return res.status(400).json({ error: error.message });
    }
});
exports.updateMenuItem = updateMenuItem;
// Delete Item
const deleteMenuItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield menu_model_1.default.findByIdAndDelete(req.params.id);
        if (!deleted)
            return res.status(404).json({ error: 'Not found' });
        return res.json({ message: 'Deleted successfully' });
    }
    catch (err) {
        const error = err;
        return res.status(500).json({ error: error.message });
    }
});
exports.deleteMenuItem = deleteMenuItem;
