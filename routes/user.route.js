// Routers <-> Controllers <-> Services <-> Models
// Routers are url routing

const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const { login, register, getfavlist, favlist, refavlist } = require('../controllers/user.controller.js')
const { isAuth, isAdmin, generateToken } = require('../utils')

const router = Router({ prefix: '/api/v1/user' })

router.post('/login', bodyParser(), login)
router.post('/register', bodyParser(), register)
router.post('/favlist', bodyParser(), getfavlist)
router.post('/fav/:id', bodyParser(), isAuth, favlist)
router.post('/refav/:id', bodyParser(), isAuth, refavlist)

module.exports = router