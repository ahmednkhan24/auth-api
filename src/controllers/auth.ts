import { Request, Response } from 'express';
import sanitizer from 'sanitizer';
import isEmpty from 'lodash/isEmpty';
import { registerNewUser } from '../services/auth';
import { hasAllKeys } from '../utils';

export const signUp = async (req: Request, res: Response) => {
  if (isEmpty(req.body) || !hasAllKeys(req.body, ['email', 'password'])) {
    return res.send({
      error: 'must provide email and password in body of request',
    });
  }
  const email = sanitizer.sanitize(req.body.email);
  const password = sanitizer.sanitize(req.body.password);
  const user = await registerNewUser({ email, password });
  return res.status(user.code).send(user);
};
