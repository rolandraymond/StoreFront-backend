"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteByid = exports.updatebyId = exports.showorder = exports.userindex = exports.create = void 0;
const express_1 = __importDefault(require("express"));
const orders_1 = require("../models/orders");
const orderlist = new orders_1.listorder();
const create = async (req, res, next) => {
    try {
        const order = await orderlist.create(req.body);
        res.json({
            status: 'success',
            message: 'create data',
            data: Object.assign({}, order),
        });
    }
    catch (error) {
        next(error);
    }
};
exports.create = create;
const routes = express_1.default.Router();
routes.post('/createOrder', exports.create);
const index = async (_req, res) => {
    const getallusers = await orderlist.index();
    res.json(getallusers);
};
const userindex = (app) => {
    app.get('/allorders', index);
};
exports.userindex = userindex;
const showBYid = async (req, res, next) => {
    try {
        const show = await orderlist.show(req.params.id);
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
const showorder = (app) => {
    app.get('/getorderByid/:id', showBYid);
};
exports.showorder = showorder;
const updateorder = async (req, res, next) => {
    try {
        const updatethisusers = await orderlist.update(req.body);
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
    app.patch('/updateorder', updateorder);
};
exports.updatebyId = updatebyId;
const deleteorder = async (req, res) => {
    const deleteUser = await orderlist.deleteByid(req.params.id);
    res.json({
        status: 'success',
        data: deleteUser,
        message: 'its work ',
    });
};
const deleteByid = (app) => {
    app.get('/deleteorderByid/name', deleteorder);
};
exports.deleteByid = deleteByid;
exports.default = routes;
