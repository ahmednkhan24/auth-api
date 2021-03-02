import UserModel, { IUser } from '../databases/models/user';
import { createApiResponse } from '../utils';

export const registerNewUser: RegisterNewUser = async ({ email, password }) => {
  try {
    const newUser: IUser = await UserModel.create({
      email,
      password,
    });
    return createApiResponse(201, false, newUser);
  } catch (err) {
    if (err.name === 'MongoError' && err.code === 11000) {
      // duplicate user
      return createApiResponse(409, true);
    }
    // unknown error
    return createApiResponse(500, true);
  }
};
