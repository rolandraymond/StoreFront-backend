"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductByid = exports.updatebyId = exports.showproduct = exports.prodcutindex = exports.createproduct = exports.create = void 0;
const orders_products_1 = require("../modeles/orders-products");
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
    app.post('/createOrdersProducts', exports.create);
};
exports.createproduct = createproduct;
// get all prouducts by index routes
const index = async (_req, res) => {
    const getall = await listofOrdersProducts.index();
    res.json(getall);
};
// http://localhost:3000/allproducts
const prodcutindex = (app) => {
    app.get('/allOrdersProducts', index);
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
    app.get('/getOrdersProducts/:id', showBYID);
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
    app.patch('/updateOrdersProducts', updateOrdersProducts);
};
exports.updatebyId = updatebyId;
// delete products by id
const deleteOrdersProducts = async (req, res) => {
    const deleteproductdata = await listofOrdersProducts.deleteByid(req.params.name);
    res.json({
        status: 'success',
        data: deleteproductdata,
        message: 'its work ',
    });
};
// http://localhost:3000/deleteOrdersProductsByid/:id
const deleteProductByid = (app) => {
    app.get('/deleteOrdersProductsByid/:id', deleteOrdersProducts);
};
exports.deleteProductByid = deleteProductByid;
