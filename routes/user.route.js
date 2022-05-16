// Routers <-> Controllers <-> Services <-> Models
// Routers are url routing

import Router from 'koa-router';
import bodyParser from 'koa-bodyparser'
import { login, register } from '../controllers/user.controller.js';

const router = Router({ prefix: '/api/v1/user' })

router.post('/login', bodyParser(), login)
router.post('/register', bodyParser(), register)

export default router