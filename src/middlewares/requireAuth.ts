import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import UserModel from '../databases/models/user';
import { createApiResponse } from '../utils';

export default (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    const responseObj = createApiResponse(401, true, 'unauthorized');
    return res.status(responseObj.statusCode).json(responseObj);
  }

  const key = process.env.JWT_SIGNING_KEY || 'MY-SECRET-KEY';
  const token = authorization.split(' ')[1];

  jwt.verify(token, key, async (err, payload) => {
    if (err || !payload) {
      const responseObj = createApiResponse(401, true, 'unauthorized');
      return res.status(responseObj.statusCode).json(responseObj);
    }

    const { userId } = payload as any;
    const user = await UserModel.findById(userId);

    (req as any).user = user;
    next();
  });
};
