# auth-api

Express API with authentication using JWT tokens.

## How to get started

- Clone this repo and run a `yarn install`
- create a `.env` file located at the root directory of the project, and add the following variables:
  - PORT: a number for the app to listen on
  - DB_URI: a mongo atlas database url
  - JWT_SIGNING_KEY: any string you want to use to sign the JWT tokens
- Run a `yarn start` or any available commands in the `package.json` file
