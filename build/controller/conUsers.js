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
exports.create = void 0;
const config_1 = __importDefault(require("../../src/config"));
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("../models/client");
const authenticate_1 = __importDefault(require("../middlewere/authenticate"));
const userList = new client_1.userlist();
const index = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const getallusers = yield userList.index();
    res.json(getallusers);
});
const userindex = (app) => {
    app.get("/allusers", index);
};
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userList.create(req.body);
        res.json({
            status: "success",
            message: "create data",
            data: Object.assign({}, user)
        });
    }
    catch (error) {
        next(error);
    }
});
exports.create = create;
const routes = express_1.default.Router();
routes.post('/createUsers', exports.create);
const showBYid = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const show = yield userList.show(req.params.id);
        console.log(show);
        res.json({
            status: "success",
            data: show,
            message: "its work "
        });
    }
    catch (error) {
        next(error);
    }
});
const showuser = (app) => {
    app.get("/getuserByid/:id", authenticate_1.default, showBYid);
};
const updateuser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatethisusers = yield userList.update(req.body);
        res.json({
            status: "success",
            data: updatethisusers,
            message: "its work "
        });
    }
    catch (error) {
        next(error);
    }
});
const updatebyId = (app) => {
    app.patch("/updateuser", updateuser);
};
const deleteUSER = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deleteUser = yield userList.deleteByid(req.params.id);
    res.json({
        status: "success",
        data: deleteUser,
        message: "its work "
    });
});
const deleteByid = (app) => {
    app.get("/deleteUserByid/:id", deleteUSER);
};
const sign_in = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_name, password } = req.body;
        const user = yield userList.sign_in(user_name, password);
        const token_pass = jsonwebtoken_1.default.sign({ user }, config_1.default.token_secret);
        // console.log(user)
        if (!user) {
            return res.status(401).json({
                status: "something wrong ",
                message: "user_name or password not correct"
            });
        }
        return res.json({
            status: "succes",
            data: Object.assign(Object.assign({}, user), { token_pass }),
            message: "user sign in succesfully"
        });
    }
    catch (error) {
        return next(error);
    }
});
// const sign_in = async (req: Request, res: Response) => {
//     try {
//         const foundUser = await userList.sign_in(req.body.user_name as string);
//         if (!foundUser) {
//             return res.status(400).send("Username is wrong");
//         }
//         const pepperedPassword = `${req.body.password}${config.crypt_pass}`;
//         const validPassword = bcrypt.compareSync(
//             pepperedPassword,
//             foundUser.password
//         );
//         if (!validPassword) {
//             return res.status(400).send("Password is wrong");
//         }
//         const token = Jwt.sign(
//             { user_name: foundUser.user_name },
//             config.token_secret as string
//         );
//         res.header("auth-token", token).send({ token });
//     } catch (err) {
//         res.status(400);
//         res.json(err);
//     }
// };
const sgin_user = (app) => {
    app.post("/signin", sign_in, authenticate_1.default);
};
exports.default = { userindex, showuser, deleteByid, updatebyId, routes, sgin_user };
