import express, { Request, Response, NextFunction, Application } from 'express';
import { listorder } from '../models/orders';

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
const routes = express.Router();

routes.post('/createOrder', create);

const index = async (_req: Request, res: Response) => {
  const getallusers = await orderlist.index();
  res.json(getallusers);
};
export const userindex = (app: Application) => {
  app.get('/allorders', index);
};

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
export const showorder = (app: Application) => {
  app.get('/getorderByid/:id', showBYid);
};

const updateorder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatethisusers = await orderlist.update(req.body);
    res.json({
      status: 'success',
      data: updatethisusers,
      message: 'its work ',
    });
  } catch (error) {
    next(error);
  }
};
export const updatebyId = (app: Application) => {
  app.patch('/updateorder', updateorder);
};

const deleteorder = async (req: Request, res: Response) => {
  const deleteUser = await orderlist.deleteByid(
    req.params.id as unknown as string
  );
  res.json({
    status: 'success',
    data: deleteUser,
    message: 'its work ',
  });
};
export const deleteByid = (app: Application) => {
  app.get('/deleteorderByid/:id', deleteorder);
};

export default routes;
