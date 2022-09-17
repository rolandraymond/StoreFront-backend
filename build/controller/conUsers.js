"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
const config_1 = __importDefault(require("../config"));
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("../models/client");
const authenticate_1 = __importDefault(require("../middlewere/authenticate"));
const userList = new client_1.userlist();
const index = async (_req, res) => {
    const getallusers = await userList.index();
    res.json(getallusers);
};
const userindex = (app) => {
    app.get('/allusers', index);
};
const create = async (req, res, next) => {
    try {
        const user = await userList.create(req.body);
        res.json({
            status: 'success',
            message: 'create data',
            data: Object.assign({}, user),
        });
    }
    catch (error) {
        next(error);
    }
};
exports.create = create;
const routes = express_1.default.Router();
routes.post('/createUsers', exports.create);
const showBYid = async (req, res, next) => {
    try {
        const show = await userList.show(req.params.id);
        console.log(show);
        res.json({
            status: 'success',
            data: show,
            message: 'its work ',
        });
    }
    catch (error) {
        next(error);
    }
};
const showuser = (app) => {
    app.get('/getuserByid/:id', authenticate_1.default, showBYid);
};
const updateuser = async (req, res, next) => {
    try {
        const updatethisusers = await userList.update(req.body);
        res.json({
            status: 'success',
            data: updatethisusers,
            message: 'its work ',
        });
    }
    catch (error) {
        next(error);
    }
};
const updatebyId = (app) => {
    app.patch('/updateuser', updateuser);
};
const deleteUSER = async (req, res) => {
    const deleteUser = await userList.deleteByid(req.params.id);
    res.json({
        status: 'success',
        data: deleteUser,
        message: 'its work ',
    });
};
const deleteByid = (app) => {
    app.get('/deleteUserByid/:id', deleteUSER);
};
const sign_in = async (req, res, next) => {
    try {
        const { user_name, password } = req.body;
        const user = await userList.sign_in(user_name, password);
        const token_pass = jsonwebtoken_1.default.sign({ user }, config_1.default.token_secret);
        // console.log(user)
        if (!user) {
            return res.status(401).json({
                status: 'something wrong ',
                message: 'user_name or password not correct',
            });
        }
        return res.json({
            status: 'succes',
            data: Object.assign(Object.assign({}, user), { token_pass }),
            message: 'user sign in succesfully',
        });
    }
    catch (error) {
        return next(error);
    }
};
const sgin_user = (app) => {
    app.post('/signin', sign_in, authenticate_1.default);
};
exports.default = {
    userindex,
    showuser,
    deleteByid,
    updatebyId,
    routes,
    sgin_user,
};
