"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyAuthToken = (req, res, next) => {
    const authorizationHeader = req.headers.authorization; // OR req.header("authorization")
    const token = authorizationHeader === null || authorizationHeader === void 0 ? void 0 : authorizationHeader.split(' ')[1];
    if (!token) {
        return res.status(401).send('Access denied. Token missing.');
    }
    try {
        jsonwebtoken_1.default.verify(token, config_1.default.token_secret);
        next();
    }
    catch (err) {
        res.status(400).send('Invalid token');
        return;
    }
};
exports.default = verifyAuthToken;
