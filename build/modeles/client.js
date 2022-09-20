"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userlist = exports.hashPassword = void 0;
const DataBase_1 = __importDefault(require("../DataBase"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../config"));
const hashPassword = (password) => {
    const hashround = parseInt(config_1.default.hashround);
    return bcrypt_1.default.hashSync(`${password}${config_1.default.crypt_pass}`, hashround);
};
exports.hashPassword = hashPassword;
// select users
class userlist {
    async index() {
        try {
            const connect = await DataBase_1.default.connect();
            const sql = 'SELECT * FROM users ';
            const result = await connect.query(sql);
            connect.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`something wrong ${err}`);
        }
    }
    // select id users
    async show(id) {
        try {
            const sql = 'SELECT * from users where id=$1';
            const connect = await DataBase_1.default.connect();
            const result = await connect.query(sql, [id]);
            connect.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not find id Error: ${err}`);
        }
    }
    // create users
    async create(users) {
        try {
            const sql = `INSERT INTO users (email, user_name, last_name, first_name, password) values($1, $2 ,$3 , $4, $5)  RETURNING *`;
            const conn = await DataBase_1.default.connect();
            const result = await conn.query(sql, [
                users.email,
                users.user_name,
                users.last_name,
                users.first_name,
                (0, exports.hashPassword)(users.password),
            ]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`unable to create  (${users.first_name}) : ${err.message}`);
        }
    }
    async update(user) {
        try {
            const connect = await DataBase_1.default.connect();
            const sql = `UPDATE users SET email=$1 , first_name=$2 , last_name=$3, user_name=$4, password=$5 WHERE 
             id=$6 RETURNING email , user_name , first_name ,last_name ,id `;
            const result = await connect.query(sql, [
                user.email,
                user.first_name,
                user.last_name,
                user.user_name,
                (0, exports.hashPassword)(user.password),
                user.id,
            ]);
            connect.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`unable to update : ${err}`);
        }
    }
    async sign_in(user_name, password) {
        try {
            const conn = await DataBase_1.default.connect();
            const sql = `SELECT password FROM users WHERE user_name=$1`;
            const result = await conn.query(sql, [user_name]);
            if (result.rows.length) {
                const { password: hashPassword } = result.rows[0];
                console.log(`${password}${config_1.default.crypt_pass}`);
                const checkpassword = bcrypt_1.default.compareSync(`${password}${config_1.default.crypt_pass}`, hashPassword);
                // console.log(checkpassword);
                if (checkpassword) {
                    const sqluserdata = 'SELECT id , user_name ,email , password , first_name , last_name FROM users WHERE user_name=$1';
                    const userdata = await conn.query(sqluserdata, [user_name]);
                    return userdata.rows[0];
                }
            }
            console.log(result);
            conn.release();
            return null;
        }
        catch (err) {
            throw new Error(`unable to sgin in check user_name: ${err}`);
        }
    }
    async deleteByid(id) {
        try {
            const connect = await DataBase_1.default.connect();
            const sql = `DELETE FROM users WHERE id=$1 RETURNING user_name `;
            const result = await connect.query(sql, [id]);
            connect.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`unable to delete by id   : ${err}`);
        }
    }
}
exports.userlist = userlist;
