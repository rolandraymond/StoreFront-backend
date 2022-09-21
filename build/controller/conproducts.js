"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductByname = exports.updatebyId = exports.showproduct = exports.prodcutindex = exports.createproduct = exports.create = void 0;
const products_1 = require("../modeles/products");
const authenticate_1 = __importDefault(require("../middlewere/authenticate"));
const listofproduct = new products_1.prodactlist();
const create = async (req, res, next) => {
    try {
        const prodact = await listofproduct.create(req.body);
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
// create product http://localhost:3000/createproduct
const createproduct = (app) => {
    app.post('/createproduct', authenticate_1.default, exports.create);
};
exports.createproduct = createproduct;
// get all prouducts by index routes
const index = async (_req, res, next) => {
    try {
        const getallproduct = await listofproduct.getall();
        res.json(getallproduct);
    }
    catch (err) {
        next(err);
    }
};
// http://localhost:3000/allproducts
const prodcutindex = (app) => {
    app.get('/allproducts', authenticate_1.default, index);
};
exports.prodcutindex = prodcutindex;
//  get products by name
const showBYname = async (req, res, next) => {
    try {
        const show = await listofproduct.getprodauctByname(req.params.name);
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
// http://localhost:3000/getproductByname/:name
const showproduct = (app) => {
    app.get('/getproductByname/:name', authenticate_1.default, showBYname);
};
exports.showproduct = showproduct;
// update product by id
const updateproduct = async (req, res, next) => {
    try {
        const updatethisproduct = await listofproduct.update(req.body);
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
// http://localhost:3000/updateproduct
const updatebyId = (app) => {
    app.patch('/updateproduct', authenticate_1.default, updateproduct);
};
exports.updatebyId = updatebyId;
// delete products by name
const deleteproduct = async (req, res, next) => {
    try {
        const deleteproductdata = await listofproduct.deleteByname(req.params.name);
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
// http://localhost:3000/deleteproductByname/:name
const deleteProductByname = (app) => {
    app.get('/deleteproductByname/:name', deleteproduct);
};
exports.deleteProductByname = deleteProductByname;
