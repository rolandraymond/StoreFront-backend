import config from '../../src/config';
import express, { Request, Response, NextFunction, Application } from 'express';
import Jwt from 'jsonwebtoken';
import { userlist } from '../models/client';
import checktoken from '../middlewere/authenticate';

const userList = new userlist();
const index = async (_req: Request, res: Response) => {
  const getallusers = await userList.index();
  res.json(getallusers);
};
const userindex = (app: express.Application) => {
  app.get('/allusers', index);
};

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userList.create(req.body);

    res.json({
      status: 'success',
      message: 'create data',
      data: { ...user },
    });
  } catch (error) {
    next(error);
  }
};

const routes = express.Router();

routes.post('/createUsers', create);

const showBYid = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const show = await userList.show(req.params.id as unknown as string);
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
const showuser = (app: express.Application) => {
  app.get('/getuserByid/:id', checktoken, showBYid);
};

const updateuser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatethisusers = await userList.update(req.body);
    res.json({
      status: 'success',
      data: updatethisusers,
      message: 'its work ',
    });
  } catch (error) {
    next(error);
  }
};
const updatebyId = (app: Application) => {
  app.patch('/updateuser', updateuser);
};

const deleteUSER = async (req: Request, res: Response) => {
  const deleteUser = await userList.deleteByid(
    req.params.id as unknown as string
  );
  res.json({
    status: 'success',
    data: deleteUser,
    message: 'its work ',
  });
};
const deleteByid = (app: express.Application) => {
  app.get('/deleteUserByid/:id', deleteUSER);
};

const sign_in = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user_name, password } = req.body;
    const user = await userList.sign_in(user_name, password);
    const token_pass = Jwt.sign(
      { user },
      config.token_secret as unknown as string
    );
    // console.log(user)

    if (!user) {
      return res.status(401).json({
        status: 'something wrong ',
        message: 'user_name or password not correct',
      });
    }
    return res.json({
      status: 'succes',
      data: { ...user, token_pass },
      message: 'user sign in succesfully',
    });
  } catch (error) {
    return next(error);
  }
};

const sgin_user = (app: express.Application) => {
  app.post('/signin', sign_in, checktoken);
};

export default {
  userindex,
  showuser,
  deleteByid,
  updatebyId,
  routes,
  sgin_user,
};
