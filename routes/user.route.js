// Routers <-> Controllers <-> Services <-> Models
// Routers are url routing

import Router from 'koa-router';
import bodyParser from 'koa-bodyparser'
import { login, register, favlist, refavlist } from '../controllers/user.controller.js';
import { isAuth, isAdmin, generateToken } from '../utils.js';

const router = Router({ prefix: '/api/v1/user' })

router.post('/login', bodyParser(), login)
router.post('/register', bodyParser(), register)
router.post('/fav/:id', bodyParser(), isAuth, isAdmin, favlist)
router.post('/refav/:id', bodyParser(), isAuth, isAdmin, refavlist)

export default router