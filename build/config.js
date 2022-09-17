"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { postgres_Host, Convert_DB, postgres_DB, postgres_DB_Ecommerce, POSTGRES_USER, POSTGRES_PASSWORD, BCRYPT_pass, round_hash, token_secret, } = process.env;
exports.default = {
    host: postgres_Host,
    database: Convert_DB === 'test' ? postgres_DB : postgres_DB_Ecommerce,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    crypt_pass: BCRYPT_pass,
    hashround: round_hash,
    token_secret: token_secret,
};
