import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends mongoose.Document {
  email: string;
  password: string;
}

const fields = {
  email: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
};

// create a schema using predefined fields
const userSchema = new mongoose.Schema(fields);

/*
 * Hash and Salt password before saving to database
 *
 * Using 'function' keyword instead of arrow function in order to access 'this' keyword
 * The user data to save is available using 'this' keyword with 'function' keyword
 * 'this' keyword with arrow function is the context of this file
 */
userSchema.pre('save', function (next) {
  const user = this as IUser;

  if (!user.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(10, (saltErr, salt) => {
    if (saltErr) {
      return next(saltErr);
    }

    bcrypt.hash(user.password, salt, (hashErr, hash) => {
      if (hashErr) {
        return next(hashErr);
      }

      user.password = hash;

      next();
    });
  });
});

// custom function to compare passwords on a login attempt
userSchema.methods.validatePassword = function (attemptedPassword) {
  const user = this as IUser;

  return new Promise((resolve, reject) => {
    bcrypt.compare(attemptedPassword, user.password, (err, isMatch) => {
      return err ? reject(err) : !isMatch ? reject(false) : resolve(true);
    });
  });
};

// compile the schema into a model
const userModel = mongoose.model<IUser>('User', userSchema);

export default userModel;
