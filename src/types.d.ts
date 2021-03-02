// object declarations
declare type Credentials = {
  email: string;
  password: string;
};

declare type ApiReturnObject = {
  statusCode: number;
  error: boolean;
  data?: any;
};

// function declarations
declare type CreateReturnObject = (
  statusCode: number,
  error: boolean,
  data?: any
) => ApiReturnObject;

declare type RegisterNewUser = (creds: Credentials) => Promise<ApiReturnObject>;
