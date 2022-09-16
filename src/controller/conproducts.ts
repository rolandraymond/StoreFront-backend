import { Request, Response, NextFunction, Application } from 'express';
import { prodactlist } from '../models/products';

const listofproduct = new prodactlist();
export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const prodact = await listofproduct.create(req.body);

    res.json({
      status: 'success',
      message: 'create data',
      data: { ...prodact },
    });
  } catch (error) {
    next(error);
  }
};
export const createproduct = (app: Application) => {
  app.get('/createproduct', create);
};

const index = async (_req: Request, res: Response) => {
  const getallproduct = await listofproduct.getall();
  res.json(getallproduct);
};
export const prodcutindex = (app: Application) => {
  app.get('/allproducts', index);
};

const showBYid = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const show = await listofproduct.getprodauctByid(
      req.params.id as unknown as string
    );
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
export const showproduct = (app: Application) => {
  app.get('/getproductByid/:id', showBYid);
};

const updateproduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updatethisproduct = await listofproduct.update(req.body);
    res.json({
      status: 'success',
      data: updatethisproduct,
      message: 'its work ',
    });
  } catch (error) {
    next(error);
  }
};
export const updatebyId = (app: Application) => {
  app.patch('/updateproduct', updateproduct);
};

const deleteproduct = async (req: Request, res: Response) => {
  const deleteproductdata = await listofproduct.deleteByid(
    req.params.id as unknown as string
  );
  res.json({
    status: 'success',
    data: deleteproductdata,
    message: 'its work ',
  });
};
export const deleteByid = (app: Application) => {
  app.get('/deleteproductByid/:id', deleteproduct);
};
