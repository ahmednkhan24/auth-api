import { Request, Response } from 'express';
import { registerNewUser, authenticateUser } from '../services/auth';
import { validateAndSanitizeBody } from '../utils';

export type AuthCallback = (
  req: Request,
  res: Response,
  callback: AuthUser
) => Promise<Response>;

const authCallback: AuthCallback = async (req, res, callback) => {
  const validatedObj = validateAndSanitizeBody(req.body);

  if (validatedObj.error) {
    return res.status(validatedObj.statusCode).json(validatedObj);
  }

  const {
    data: { email, password },
  } = validatedObj;

  const responseObj = await callback({ email, password });
  return res.status(responseObj.statusCode).json(responseObj);
};

export const signUp = async (req: Request, res: Response) => {
  return authCallback(req, res, registerNewUser);
};

export const signIn = async (req: Request, res: Response) => {
  return authCallback(req, res, authenticateUser);
};
