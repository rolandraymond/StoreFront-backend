import express, { Request, Response, NextFunction, Application } from 'express';
import { listorder } from '../modeles/orders';
import checktoken from '../middlewere/authenticate';
//create orders by router express
const orderlist = new listorder();
export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const order = await orderlist.create(req.body);

    res.json({
      status: 'success',
      message: 'create data',
      data: { ...order },
    });
  } catch (error) {
    next(error);
  }
};
//  http://localhost:3000/createOrders
export const routes = express.Router();

routes.post('/createOrder', checktoken, create);

// get all  orders by index modles
const index = async (_req: Request, res: Response) => {
  const getallorders = await orderlist.index();
  res.json(getallorders);
};
//  http://localhost:3000/allorders
export const orderindex = (app: Application) => {
  app.get('/allorders', index);
};
// get order by id useing showByid
const showBYid = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const show = await orderlist.show(req.params.id as unknown as string);
    console.log(show);
    res.json({
      status: 'success',
      data: show,
      message: 'its work ',
    });
  } catch (error) {
    next(error);
  }
};
//  http://localhost:3000/getorderByid/:id
export const showorder = (app: Application) => {
  app.get('/getorderByid/:id', checktoken, showBYid);
};

// update order by useing updateorder
const updateorder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatethisorder = await orderlist.update(req.body);
    res.json({
      status: 'success',
      data: updatethisorder,
      message: 'its work ',
    });
  } catch (error) {
    next(error);
  }
};

//  http://localhost:3000/updateorder
export const updatebyId = (app: Application) => {
  app.patch('/updateorder', checktoken, updateorder);
};

// delete order by id
const deleteorder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orderdelete = await orderlist.deleteByid(
      req.params.id as unknown as string
    );
    res.json({
      status: 'success',
      data: orderdelete,
      message: 'its work ',
    });
  } catch (error) {
    next(error);
  }
};
//  http://localhost:3000/deleteorderByid/:id
export const deleteByid = (app: Application) => {
  app.get('/deleteorderByid/:id', deleteorder);
};
