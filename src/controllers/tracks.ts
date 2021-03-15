import { Request, Response } from 'express';
import { getTracksByUserId, postTracksByUserId } from '../services/tracks';
import { validateTrackBody } from '../utils';

export const getTracks = async (req: Request, res: Response) => {
  const userId = (req as any).user._id;
  const responseObj = await getTracksByUserId(userId);
  return res.status(responseObj.statusCode).json(responseObj);
};

export const postTracks = async (req: Request, res: Response) => {
  const validatedObj = validateTrackBody(req.body);
  if (validatedObj.error) {
    return res.status(validatedObj.statusCode).json(validatedObj);
  }

  const userId = (req as any).user._id;
  const {
    data: { name, locations },
  } = validatedObj;

  const responseObj = await postTracksByUserId(userId, name, locations);
  return res.status(responseObj.statusCode).json(responseObj);
};
