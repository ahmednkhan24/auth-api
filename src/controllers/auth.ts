import { Request, Response } from 'express';
import sanitizer from 'sanitizer';
import isEmpty from 'lodash/isEmpty';
import { registerNewUser } from '../services/auth';
import { hasAllKeys, createApiResponse } from '../utils';

export const signUp = async (req: Request, res: Response) => {
  if (isEmpty(req.body) || !hasAllKeys(req.body, ['email', 'password'])) {
    const responseObj = createApiResponse(400, true);
    return res.status(responseObj.statusCode).json(responseObj);
  }

  const email = sanitizer.sanitize(req.body.email);
  const password = sanitizer.sanitize(req.body.password);

  if (!email || !password) {
    const responseObj = createApiResponse(400, true);
    return res.status(responseObj.statusCode).json(responseObj);
  }

  const responseObj = await registerNewUser({ email, password });
  return res.status(responseObj.statusCode).json(responseObj);
};
