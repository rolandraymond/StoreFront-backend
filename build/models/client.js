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
exports.userlist = void 0;
const DataBase_1 = __importDefault(require("../DataBase"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../config"));
const hashPassword = (password) => {
    const hashround = parseInt(config_1.default.hashround);
    return bcrypt_1.default.hashSync(`${password}${config_1.default.crypt_pass}`, hashround);
};
// select users
class userlist {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield DataBase_1.default.connect();
                const sql = 'SELECT * FROM users ';
                const result = yield connect.query(sql);
                connect.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`something wrong ${err}`);
            }
        });
    }
    // select id users
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'SELECT * from users where id=$1';
                const connect = yield DataBase_1.default.connect();
                const result = yield connect.query(sql, [id]);
                connect.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not find id Error: ${err}`);
            }
        });
    }
    // create users 
    create(users) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = `INSERT INTO users (email, user_name, last_name, first_name, password) values($1, $2 ,$3 , $4, $5)  RETURNING *`;
                const conn = yield DataBase_1.default.connect();
                const result = yield conn.query(sql, [
                    users.email,
                    users.user_name,
                    users.last_name,
                    users.first_name,
                    hashPassword(users.password)
                ]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`unable to create  (${users.first_name}) : ${err.message}`);
            }
        });
    }
    update(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield DataBase_1.default.connect();
                const sql = `UPDATE users SET email=$1 , first_name=$2 , last_name=$3, user_name=$4 password=$5 WHERE 
             id=$6 RETURNING email , user_name , first_name ,last_name ,id `;
                const result = yield connect.query(sql, [
                    user.email,
                    user.first_name,
                    user.last_name,
                    user.user_name,
                    hashPassword(user.password),
                    user.id
                ]);
                connect.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`unable to update : ${err}`);
            }
        });
    }
    sign_in(user_name, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield DataBase_1.default.connect();
                const sql = `SELECT password FROM users WHERE user_name=$1`;
                const result = yield conn.query(sql, [user_name]);
                if (result.rows.length) {
                    const { password: hashPassword } = result.rows[0];
                    console.log(`${password}${config_1.default.crypt_pass}`);
                    const checkpassword = bcrypt_1.default.compareSync(`${password}${config_1.default.crypt_pass}`, hashPassword);
                    console.log(checkpassword);
                    if (checkpassword) {
                        const sqluserdata = "SELECT id , user_name ,email , password , first_name , last_name FROM users WHERE user_name=$1";
                        const userdata = yield conn.query(sqluserdata, [user_name]);
                        return userdata.rows[0];
                    }
                }
                // console.log(result)
                conn.release();
                return null;
            }
            catch (err) {
                throw new Error(`unable to sgin in check user_name: ${err}`);
            }
        });
    }
    deleteByid(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield DataBase_1.default.connect();
                const sql = `DELETE FROM users WHERE id=$1 RETURNING user_name `;
                const result = yield connect.query(sql, [id]);
                connect.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`unable to delete by id   : ${err}`);
            }
        });
    }
}
exports.userlist = userlist;
