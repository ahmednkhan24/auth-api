import UserModel from '../databases/models/user';

// import { Document } from 'mongoose';

// declare type Credentials = {
//   email: string;
//   password: string;
// };

// declare type MongoUser = Document<Credentials>;

// declare type RegisteredResponse = {
//   error: boolean;
//   code: number;
//   data?: MongoUser;
// };

// declare type RegisterNewUser = (
//   creds: Credentials
// ) => Promise<RegisteredResponse>;

export const registerNewUser: RegisterNewUser = async ({ email, password }) => {
  try {
    const newUser: Document<Credentials> = await UserModel.create({
      email,
      password,
    });
    return {
      error: false,
      code: 201,
      data: newUser,
    };
  } catch (err) {
    if (err.name === 'MongoError' && err.code === 11000) {
      return {
        error: true,
        code: 409, // duplicate user
      };
    }
    return {
      error: true,
      code: 500, // unknown error
    };
  }
};
