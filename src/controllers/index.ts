import { Request, Response } from 'express';

export const root = async (req: Request, res: Response) => {
  return res.send({ hello: 'world' });
};
