"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersProductsList = void 0;
const database_1 = __importDefault(require("../database"));
class OrdersProductsList {
    async index() {
        try {
            const connect = await database_1.default.connect();
            const sql = 'SELECT * FROM orders_products ';
            const result = await connect.query(sql);
            connect.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`something wrong ${err}`);
        }
    }
    async show(id) {
        try {
            const sql = 'SELECT * from orders_products where id=($1)';
            const connect = await database_1.default.connect();
            const result = await connect.query(sql, [id]);
            connect.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not find id Error: ${err}`);
        }
    }
    async create(OP) {
        try {
            const sql = `INSERT INTO orders (order_id, product_id , quantity ) values($1, $2 , $3 )  RETURNING *`;
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [
                OP.order_id,
                OP.product_id,
                OP.quantity,
            ]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`unable to create  (${OP.id}) : ${err.message}`);
        }
    }
    async update(OP) {
        try {
            const connect = await database_1.default.connect();
            const sql = `UPDATE OP SET  order_id=$1 , product_id=$2 , quantity=$3 WHERE 
            order_id=$1 RETURNING *`;
            const result = await connect.query(sql, [
                OP.order_id,
                OP.product_id,
                OP.quantity,
            ]);
            connect.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`unable to update : ${err}`);
        }
    }
    async deleteByid(id) {
        try {
            const connect = await database_1.default.connect();
            const sql = `DELETE FROM orders_proudcts WHERE id=$1 RETURNING * `;
            const result = await connect.query(sql, [id]);
            connect.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`unable to delete by id   : ${err}`);
        }
    }
}
exports.OrdersProductsList = OrdersProductsList;
