"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongo_1 = __importDefault(require("./mongo"));
const menu_routes_1 = __importDefault(require("./routes/menu.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5002;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/menu', menu_routes_1.default); // ✅ You use the router, not controller function
(0, mongo_1.default)();
app.listen(PORT, () => {
    console.log(`🚀 Menu REST server running on port ${PORT}`);
});
