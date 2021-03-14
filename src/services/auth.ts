import jwt from 'jsonwebtoken';
import UserModel, { IUser } from '../databases/models/user';
import { createApiResponse } from '../utils';

export const registerNewUser: RegisterNewUser = async ({ email, password }) => {
  try {
    const newUser: IUser = await UserModel.create({
      email,
      password,
    });

    const key = process.env.JWT_SIGNING_KEY || 'MY-SECRET-KEY';
    const token = jwt.sign({ userId: newUser._id }, key);

    return createApiResponse(201, false, token);
  } catch (err) {
    if (err.name === 'MongoError' && err.code === 11000) {
      // duplicate user
      return createApiResponse(409, true);
    }
    // unknown error
    return createApiResponse(500, true);
  }
};
