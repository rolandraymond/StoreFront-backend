"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteByid = exports.updatebyId = exports.showorder = exports.orderindex = exports.routes = exports.create = void 0;
const express_1 = __importDefault(require("express"));
const orders_1 = require("../models/orders");
const authenticate_1 = __importDefault(require("../middlewere/authenticate"));
//create orders by router express
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
//  http://localhost:3000/createOrders
exports.routes = express_1.default.Router();
exports.routes.post('/createOrder', authenticate_1.default, exports.create);
// get all  orders by index modles
const index = async (_req, res) => {
    const getallorders = await orderlist.index();
    res.json(getallorders);
};
//  http://localhost:3000/allorders
const orderindex = (app) => {
    app.get('/allorders', authenticate_1.default, index);
};
exports.orderindex = orderindex;
// get order by id useing showByid
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
//  http://localhost:3000/getorderByid/:id
const showorder = (app) => {
    app.get('/getorderByid/:id', authenticate_1.default, showBYid);
};
exports.showorder = showorder;
// update order by useing updateorder
const updateorder = async (req, res, next) => {
    try {
        const updatethisorder = await orderlist.update(req.body);
        res.json({
            status: 'success',
            data: updatethisorder,
            message: 'its work ',
        });
    }
    catch (error) {
        next(error);
    }
};
//  http://localhost:3000/updateorder
const updatebyId = (app) => {
    app.patch('/updateorder', authenticate_1.default, updateorder);
};
exports.updatebyId = updatebyId;
// delete order by id
const deleteorder = async (req, res, next) => {
    try {
        const orderdelete = await orderlist.deleteByid(req.params.id);
        res.json({
            status: 'success',
            data: orderdelete,
            message: 'its work ',
        });
    }
    catch (error) {
        next(error);
    }
};
//  http://localhost:3000/deleteorderByid/:id
const deleteByid = (app) => {
    app.get('/deleteorderByid/:id', authenticate_1.default, deleteorder);
};
exports.deleteByid = deleteByid;
