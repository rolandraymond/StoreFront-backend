"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductByname = exports.updatebyname = exports.showproduct = exports.prodcutindex = exports.createproduct = exports.create = void 0;
const products_1 = require("../modeles/products");
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
    app.post('/createproduct', exports.create);
};
exports.createproduct = createproduct;
// get all prouducts by index routes
const index = async (_req, res) => {
    const getallproduct = await listofproduct.getall();
    res.json(getallproduct);
};
// http://localhost:3000/allproducts
const prodcutindex = (app) => {
    app.get('/allproducts', index);
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
    app.get('/getproductByname/:name', showBYname);
};
exports.showproduct = showproduct;
// update product by name 
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
const updatebyname = (app) => {
    app.patch('/updateproduct', updateproduct);
};
exports.updatebyname = updatebyname;
// delete products by name 
const deleteproduct = async (req, res) => {
    const deleteproductdata = await listofproduct.deleteByname(req.params.name);
    res.json({
        status: 'success',
        data: deleteproductdata,
        message: 'its work ',
    });
};
// // http://localhost:3000/deleteproductByname/:name
const deleteProductByname = (app) => {
    app.get('/deleteproductByname/:name', deleteproduct);
};
exports.deleteProductByname = deleteProductByname;
