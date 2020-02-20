import express from 'express';
import * as user from '../controllers/user';

const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/:userId', user.get);
router.post('/register', user.register);
router.post('/login', user.login);

export default router;
