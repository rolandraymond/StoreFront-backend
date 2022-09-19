"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prodactlist = void 0;
const DataBase_1 = __importDefault(require("../DataBase"));
class prodactlist {
    // get all product 
    async getall() {
        try {
            const connect = await DataBase_1.default.connect();
            const sql = 'SELECT * FROM products ';
            const result = await connect.query(sql);
            connect.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`something wrong ${err}`);
        }
    }
    // get prorduct by name 
    async getprodauctByname(name) {
        try {
            const connect = await DataBase_1.default.connect();
            const sql = `SELECT * FROM products WHERE name= $1 `;
            const result = await connect.query(sql, [name]);
            connect.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`unable to get name ${error}`);
        }
    }
    // create users
    async create(p) {
        try {
            const sql = `INSERT INTO products (name, price, seller) values($1, $2 ,$3 )  RETURNING *`;
            const conn = await DataBase_1.default.connect();
            const result = await conn.query(sql, [p.name, p.price, p.seller]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`unable to create  (${p.name}) : ${err.message}`);
        }
    }
    // update  data of product
    async update(p) {
        try {
            const connect = await DataBase_1.default.connect();
            const sql = `UPDATE products SET name=$1 , price=$2 , product_id=$3 , seller=$4 WHERE  product_id=$3   RETURNING * `;
            const result = await connect.query(sql, [
                p.name,
                p.price,
                p.product_id,
                p.seller,
            ]);
            connect.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`unable to update : ${err}`);
        }
    }
    // delete products by name 
    async deleteByname(name) {
        try {
            const connect = await DataBase_1.default.connect();
            const sql = `DELETE FROM products WHERE name=$1 RETURNING name `;
            const result = await connect.query(sql, [name]);
            connect.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`unable to delete by name  : ${err}`);
        }
    }
}
exports.prodactlist = prodactlist;
