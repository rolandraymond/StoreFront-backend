import config from '../config';
import { Request, Response, NextFunction } from 'express';
import Jwt from 'jsonwebtoken';

const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
    const authorizationHeader = req.headers.authorization; // OR req.header("authorization")
    const token = authorizationHeader?.split(' ')[1];

    if (!token) {
        return res.status(401).send('Access denied. Token missing.');
    }

    try {
        Jwt.verify(token, config.token_secret as string);
        next();
    } catch (err) {
        res.status(400).send('Invalid token');
        return;
    }
};

export default verifyAuthToken;
