import express from 'express';
import * as user from '../controllers/user';
import auth from '../middleware/auth';

const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/:userId', user.get);
router.get('/me', user.me);
router.post('/register', user.register);
router.post('/login', auth, user.login);
router.post('me/logout', auth, user.logout);


export default router;
