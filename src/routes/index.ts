import express from 'express';
import { root } from '../controllers';
import { signUp, signIn } from '../controllers/auth';
import requireAuth from '../middlewares/requireAuth';

const router = express.Router();

router.route('/').get(requireAuth, root);

router.route('/signup').post(signUp);

router.route('/signin').post(signIn);

// router.route('/user').get(getUser).post(postUser);

router.get('*', (req, res) => {
  res.send({ 404: 'Not Found' });
});

export default router;
