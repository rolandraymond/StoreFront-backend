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
exports.prodactlist = void 0;
const DataBase_1 = __importDefault(require("../DataBase"));
class prodactlist {
    getall() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield DataBase_1.default.connect();
                const sql = 'SELECT * FROM products ';
                const result = yield connect.query(sql);
                connect.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`something wrong ${err}`);
            }
        });
    }
    getprodauctByid(name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield DataBase_1.default.connect();
                const sql = "SELECT * FROM products WHERE name=$1";
                const result = yield connect.query(sql, [name]);
                connect.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`unable to get id ${error}`);
            }
        });
    }
    // create users 
    create(p) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = `INSERT INTO products (name, price, seller) values($1, $2 ,$3 )  RETURNING *`;
                const conn = yield DataBase_1.default.connect();
                const result = yield conn.query(sql, [
                    p.name,
                    p.price,
                    p.seller
                ]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`unable to create  (${p.name}) : ${err.message}`);
            }
        });
    }
    update(p) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield DataBase_1.default.connect();
                const sql = `UPDATE products SET name=$1 , price=$2 , product_id=$3 , seller=$4 `;
                const result = yield connect.query(sql, [
                    p.name,
                    p.price,
                    p.product_id,
                    p.seller
                ]);
                connect.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`unable to update : ${err}`);
            }
        });
    }
    deleteByid(name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield DataBase_1.default.connect();
                const sql = `DELETE FROM products WHERE id=$1 RETURNING name `;
                const result = yield connect.query(sql, [name]);
                connect.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`unable to delete by id   : ${err}`);
            }
        });
    }
}
exports.prodactlist = prodactlist;
