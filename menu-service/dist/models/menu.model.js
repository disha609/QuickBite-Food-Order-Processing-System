"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const menuSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    image: { type: String },
    category: { type: String, enum: ['veg', 'non-veg', 'dessert'], required: true },
    available: { type: Boolean, default: true },
    ingredients: [{ type: String }],
    prepTime: { type: Number },
    rating: { type: Number, default: 0 },
    tags: [{ type: String }]
}, {
    timestamps: true
});
const Menu = mongoose_1.default.model('Menu', menuSchema);
exports.default = Menu;
