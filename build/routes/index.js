"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orders_routers_1 = __importDefault(require("./api/orders_routers"));
const routes = express_1.default.Router();
routes.use("/orders", orders_routers_1.default);
exports.default = routes;
