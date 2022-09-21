import { Request, Response, NextFunction, Application } from 'express';
import { prodactlist } from '../modeles/products';
import checktoken from '../middlewere/authenticate';
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
// create product http://localhost:3000/createproduct
export const createproduct = (app: Application) => {
  app.post('/createproduct', checktoken, create);
};
// get all prouducts by index routes
const index = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const getallproduct = await listofproduct.getall();
    res.json(getallproduct);
  } catch (err) {
    next(err);
  }
};
// http://localhost:3000/allproducts
export const prodcutindex = (app: Application) => {
  app.get('/allproducts', checktoken, index);
};
//  get products by name
const showBYname = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const show = await listofproduct.getprodauctByname(
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

// http://localhost:3000/getproductByname/:name
export const showproduct = (app: Application) => {
  app.get('/getproductByname/:name', checktoken, showBYname);
};
// update product by id
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
// http://localhost:3000/updateproduct
export const updatebyId = (app: Application) => {
  app.patch('/updateproduct', checktoken, updateproduct);
};
// delete products by name
const deleteproduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const deleteproductdata = await listofproduct.deleteByname(
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
// http://localhost:3000/deleteproductByname/:name
export const deleteProductByname = (app: Application) => {
  app.get('/deleteproductByname/:name', deleteproduct);
};
