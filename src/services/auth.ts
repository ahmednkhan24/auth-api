import UserModel, { IUser } from '../databases/models/User';
import { createApiResponse, generateToken } from '../utils';

export const registerNewUser: AuthUser = async ({ email, password }) => {
  try {
    const newUser: IUser = await UserModel.create({
      email,
      password,
    });

    const token = generateToken(newUser._id);

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

export const authenticateUser: AuthUser = async ({ email, password }) => {
  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return createApiResponse(401, true, 'Invalid email or password');
    }

    await user.validatePassword(password);
    const token = generateToken(user._id);

    return createApiResponse(200, false, token);
  } catch (err) {
    // unknown error
    return createApiResponse(401, true, 'Invalid email or password');
  }
};
