"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteByid = exports.updatebyId = exports.showproduct = exports.prodcutindex = exports.createproduct = exports.create = void 0;
const products_1 = require("../models/products");
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
const createproduct = (app) => {
    app.get('/createproduct', exports.create);
};
exports.createproduct = createproduct;
const index = async (_req, res) => {
    const getallproduct = await listofproduct.getall();
    res.json(getallproduct);
};
const prodcutindex = (app) => {
    app.get('/allproducts', index);
};
exports.prodcutindex = prodcutindex;
const showBYid = async (req, res, next) => {
    try {
        const show = await listofproduct.getprodauctByname(req.params.id);
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
const showproduct = (app) => {
    app.get('/getproductByid/:id', showBYid);
};
exports.showproduct = showproduct;
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
const updatebyId = (app) => {
    app.patch('/updateproduct', updateproduct);
};
exports.updatebyId = updatebyId;
const deleteproduct = async (req, res) => {
    const deleteproductdata = await listofproduct.deleteByname(req.params.id);
    res.json({
        status: 'success',
        data: deleteproductdata,
        message: 'its work ',
    });
};
const deleteByid = (app) => {
    app.get('/deleteproductByid/:id', deleteproduct);
};
exports.deleteByid = deleteByid;
