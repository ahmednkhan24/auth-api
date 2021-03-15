import sanitizer from 'sanitizer';
import jwt from 'jsonwebtoken';
import has from 'lodash/fp/has';
import isEmpty from 'lodash/fp/isEmpty';
import isArray from 'lodash/fp/isArray';

/*
 * returns true if all keys are properties within the obj object
 * returns false on first key not found within the obj object
 */
export const hasAllKeys = (obj: object, keys: string[]) =>
  keys.every((key) => has(key, obj));

export const createApiResponse: CreateReturnObject = (
  statusCode,
  error,
  data?
) => ({
  statusCode,
  error,
  data,
});

export const validateAndSanitizeAuthBody: ValidateAndSanitizeBody = (body) => {
  if (isEmpty(body) || !hasAllKeys(body, ['email', 'password'])) {
    return createApiResponse(400, true);
  }

  const email = sanitizer.sanitize(body.email);
  const password = sanitizer.sanitize(body.password);

  if (!email || !password) {
    return createApiResponse(400, true);
  }

  return createApiResponse(0, false, { email, password });
};

export const validateTrackBody: ValidateAndSanitizeBody = (body) => {
  if (
    isEmpty(body) ||
    !hasAllKeys(body, ['name', 'locations']) ||
    !isArray(body.locations)
  ) {
    return createApiResponse(400, true);
  }

  const { name, locations } = body;

  return createApiResponse(0, false, { name, locations });
};

export const generateToken = (id: string) => {
  const key = process.env.JWT_SIGNING_KEY || 'MY-SECRET-KEY';
  const token = jwt.sign({ userId: id }, key);
  return token;
};
