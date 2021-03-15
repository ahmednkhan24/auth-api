import express from 'express';
import { root } from '../controllers';
import { signUp, signIn } from '../controllers/auth';
import { getTracks, postTracks } from '../controllers/tracks';
import requireAuth from '../middlewares/requireAuth';

const router = express.Router();

// public routes
router.route('/').get(root);
router.route('/signup').post(signUp);
router.route('/signin').post(signIn);

// private routes
router
  .route('/tracks')
  .get(requireAuth, getTracks)
  .post(requireAuth, postTracks);

router.get('*', (req, res) => {
  res.send({ 404: 'Not Found' });
});

export default router;
