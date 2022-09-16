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
exports.listorder = void 0;
const DataBase_1 = __importDefault(require("../DataBase"));
class listorder {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield DataBase_1.default.connect();
                const sql = 'SELECT * FROM orders ';
                const result = yield connect.query(sql);
                connect.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`something wrong ${err}`);
            }
        });
    }
    show(order_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'SELECT * from orders where id=($1)';
                const connect = yield DataBase_1.default.connect();
                const result = yield connect.query(sql, [order_id]);
                connect.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not find id Error: ${err}`);
            }
        });
    }
    create(order) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = `INSERT INTO orders (time, users_id, quantity, product_id) values($1, $2 ,$3 , $4)  RETURNING *`;
                const conn = yield DataBase_1.default.connect();
                const result = yield conn.query(sql, [
                    order.time,
                    order.users_id,
                    order.quantity,
                    order.product_id,
                ]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`unable to create  (${order.time}) : ${err.message}`);
            }
        });
    }
}
exports.listorder = listorder;
