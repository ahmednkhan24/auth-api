import TrackModel from '../databases/models/Track';
import { createApiResponse } from '../utils';

export const getTracksByUserId = async (userId: string) => {
  try {
    const tracks = await TrackModel.find({ userId });
    return createApiResponse(200, false, tracks);
  } catch (err) {
    return createApiResponse(500, true);
  }
};

export const postTracksByUserId = async (
  userId: string,
  name: string,
  locations: Array<Object>
) => {
  try {
    const newTrack = await TrackModel.create({ userId, name, locations });
    return createApiResponse(201, false, newTrack);
  } catch (err) {
    console.log(err);
    return createApiResponse(500, true);
  }
};
