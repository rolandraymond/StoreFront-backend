"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductByid = exports.updatebyId = exports.showproduct = exports.prodcutindex = exports.createproduct = exports.create = void 0;
const orders_products_1 = require("../modeles/orders-products");
const authenticate_1 = __importDefault(require("../middlewere/authenticate"));
const listofOrdersProducts = new orders_products_1.OrdersProductsList();
const create = async (req, res, next) => {
    try {
        const prodact = await listofOrdersProducts.create(req.body);
        res.json({
            status: 'success',
            message: 'create data',
            data: Object.assign({}, prodact),
        });
    }
    catch (error) {
        next(error);
    }
};
exports.create = create;
// create product http://localhost:3000/createOrdersProducts
const createproduct = (app) => {
    app.post('/createOrdersProducts', authenticate_1.default, exports.create);
};
exports.createproduct = createproduct;
// get all prouducts by index routes
const index = async (_req, res, next) => {
    try {
        const getall = await listofOrdersProducts.index();
        res.json(getall);
    }
    catch (error) {
        next(error);
    }
};
// http://localhost:3000/allproducts
const prodcutindex = (app) => {
    app.get('/allOrdersProducts', authenticate_1.default, index);
};
exports.prodcutindex = prodcutindex;
//  get products by name
const showBYID = async (req, res, next) => {
    try {
        const show = await listofOrdersProducts.show(req.params.name);
        console.log(req.params.name);
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
// http://localhost:3000/getOrdersProducts/:id
const showproduct = (app) => {
    app.get('/getOrdersProducts/:id', authenticate_1.default, showBYID);
};
exports.showproduct = showproduct;
// update OrdersProducts by ID
const updateOrdersProducts = async (req, res, next) => {
    try {
        const updatethisproduct = await listofOrdersProducts.update(req.body);
        res.json({
            status: 'success',
            data: updatethisproduct,
            message: 'its work ',
        });
    }
    catch (error) {
        next(error);
    }
};
// http://localhost:3000/updateOrdersProducts
const updatebyId = (app) => {
    app.patch('/updateOrdersProducts', authenticate_1.default, updateOrdersProducts);
};
exports.updatebyId = updatebyId;
// delete products by id
const deleteOrdersProducts = async (req, res, next) => {
    try {
        const deleteproductdata = await listofOrdersProducts.deleteByid(req.params.name);
        res.json({
            status: 'success',
            data: deleteproductdata,
            message: 'its work ',
        });
    }
    catch (error) {
        next(error);
    }
};
// http://localhost:3000/deleteOrdersProductsByid/:id
const deleteProductByid = (app) => {
    app.get('/deleteOrdersProductsByid/:id', deleteOrdersProducts);
};
exports.deleteProductByid = deleteProductByid;
