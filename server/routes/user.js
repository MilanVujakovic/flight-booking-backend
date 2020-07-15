import express from 'express';
import * as user from '../controllers/user.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/me', auth, user.me);
router.get('/:userId', user.get);
router.post('/signup', user.signup);
router.post('/login', user.login);
router.post('/logout', auth, user.logout);


export default router;
