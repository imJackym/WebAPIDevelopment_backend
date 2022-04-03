// Routers <-> Controllers <-> Services <-> Models
// Routers are url routing

import { authEmail, generateToken} from '../auth';

const Koa = require('koa');
const Router = require('koa-router');
const router = Router({ prefix: '/api/v1/users' })
const UserController = require('../controllers/user.controller');


router.get('/', UserController.getAllUser)
router.post('/login', UserController.getUserLogin)
router.post('/register', UserController.postUserRegister, generateToken())

// export function authEmail() {
//   return passport.authenticate('email');
// }

/** After autentication using one of the strategies, generate a JWT token */
export function generateToken() {
  return async ctx => {
    console.log('generating token....')
    console.log(ctx.passport)
    const { user } = ctx.passport;
    if (user === false) {
      ctx.status = 401;
    } else {
      const _token = jwt.sign({ id: user }, config.secret);
      const token = `JWT ${_token}`;

      const currentUser = await User.findOne({ _id: user });

      ctx.status = 200;
      ctx.body = {
        token,
        user: currentUser,
      };
    }
  };
}

module.exports = router