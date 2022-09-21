import { Request, Response, NextFunction, Application } from 'express';
import { OrdersProductsList } from '../models/orders-products';
import checktoken from '../middlewere/authenticate';
const listofOrdersProducts = new OrdersProductsList();
export const create = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const prodact = await listofOrdersProducts.create(req.body);

        res.json({
            status: 'success',
            message: 'create data',
            data: { ...prodact },
        });
    } catch (error) {
        next(error);
    }
};
// create product http://localhost:3000/createOrdersProducts
export const createproduct = (app: Application) => {
    app.post('/createOrdersProducts', checktoken, create);
};
// get all prouducts by index routes
const index = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const getall = await listofOrdersProducts.index();
        res.json(getall);
    } catch (error) {
        next(error);
    }
};
// http://localhost:3000/allproducts
export const prodcutindex = (app: Application) => {
    app.get('/allOrdersProducts', checktoken, index);
};
//  get products by name
const showBYID = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const show = await listofOrdersProducts.show(
            req.params.name as unknown as string
        );
        console.log(req.params.name);
        res.json({
            status: 'success',
            data: show,
            message: 'its work ',
        });
    } catch (error) {
        next(error);
    }
};

// http://localhost:3000/getOrdersProducts/:id
export const showproduct = (app: Application) => {
    app.get('/getOrdersProducts/:id', checktoken, showBYID);
};
// update OrdersProducts by ID
const updateOrdersProducts = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const updatethisproduct = await listofOrdersProducts.update(req.body);
        res.json({
            status: 'success',
            data: updatethisproduct,
            message: 'its work ',
        });
    } catch (error) {
        next(error);
    }
};
// http://localhost:3000/updateOrdersProducts
export const updatebyId = (app: Application) => {
    app.patch('/updateOrdersProducts', checktoken, updateOrdersProducts);
};
// delete products by id
const deleteOrdersProducts = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const deleteproductdata = await listofOrdersProducts.deleteByid(
            req.params.name as unknown as string
        );
        res.json({
            status: 'success',
            data: deleteproductdata,
            message: 'its work ',
        });
    } catch (error) {
        next(error);
    }
};

// http://localhost:3000/deleteOrdersProductsByid/:id
export const deleteProductByid = (app: Application) => {
    app.get('/deleteOrdersProductsByid/:id', checktoken, deleteOrdersProducts);
};
