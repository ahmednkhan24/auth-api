import { Document } from 'mongoose';

declare type Credentials = {
  email: string;
  password: string;
};

declare type MongoUser = Document<Credentials>;

declare type RegisteredResponse = {
  error: boolean;
  code: number;
  data?: MongoUser;
};

declare type RegisterNewUser = (
  creds: Credentials
) => Promise<RegisteredResponse>;
