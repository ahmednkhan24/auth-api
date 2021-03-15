import mongoose from 'mongoose';

const pointProperties = {
  timestamp: Number,
  coords: {
    latitude: Number,
    longitude: Number,
    altitude: Number,
    accuracy: Number,
    heading: Number,
    speed: Number,
  },
};

const pointSchema = new mongoose.Schema(pointProperties);

const trackProperties = {
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  name: {
    type: String,
    default: '',
  },
  locations: [pointSchema],
};

const trackSchema = new mongoose.Schema(trackProperties);

// compile the schema into a model
const trackModel = mongoose.model('Track', trackSchema);

export default trackModel;
