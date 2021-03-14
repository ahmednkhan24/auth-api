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

declare type AuthUser = (creds: Credentials) => Promise<ApiReturnObject>;

declare type ValidateAndSanitizeBody = (body: any) => ApiReturnObject;
