"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const menu_controller_1 = require("../controllers/menu.controller");
const router = express_1.default.Router();
router.post('/', menu_controller_1.createMenuItem);
router.get('/', menu_controller_1.getAllMenuItems);
router.get('/:id', menu_controller_1.getMenuItemById);
router.put('/:id', menu_controller_1.updateMenuItem);
router.delete('/:id', menu_controller_1.deleteMenuItem);
exports.default = router;
