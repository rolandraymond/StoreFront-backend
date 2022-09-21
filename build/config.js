"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { postgres_Host, Convert_DB, Postgres_DB_test, //   test  DataBase
Postgres_DB, //  dev DataBase
POSTGRES_user, POSTGRES_PASSWORD, BCRYPT_pass, round_hash, token_secret, } = process.env;
exports.default = {
    host: postgres_Host,
    database: Convert_DB === 'test' ? Postgres_DB_test : Postgres_DB,
    user: POSTGRES_user,
    password: POSTGRES_PASSWORD,
    crypt_pass: BCRYPT_pass,
    hashround: round_hash,
    token_secret: token_secret,
};
