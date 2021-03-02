import mongoose from 'mongoose';

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

// compile the schema into a model
const userModel = mongoose.model<IUser>('User', userSchema);

export default userModel;
