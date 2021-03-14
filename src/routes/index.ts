import express from 'express';
import { root } from '../controllers';
import { signUp } from '../controllers/auth';
import requireAuth from '../middlewares/requireAuth';

const router = express.Router();

router.route('/').get(requireAuth, root);

router.route('/signup').post(signUp);

// router.route('/user').get(getUser).post(postUser);

router.get('*', (req, res) => {
  res.send({ 404: 'Not Found' });
});

export default router;
