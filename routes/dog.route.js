// Routers <-> Controllers <-> Services <-> Models
// Routers are url routing

const bodyParser = require('koa-bodyparser')
const Router = require('koa-router')
const upload = require('../upload.js')
const { isAuth, isAdmin, generateToken } = require('../utils.js')
const { getAllDog, addNewDog, getDogById, updateDogById, search, deleteDogById, filter, uploadimg } = require('../controllers/dog.controller.js')

const router = Router({ prefix: '/api/v1/dog' })

router.get('/', getAllDog)
router.get('/filter/:breed([A-Za-z0-9]{1,})', filter)
router.get('/search/:name([A-Za-z0-9]{1,})', search)

router.post('/', bodyParser(), isAuth, isAdmin, addNewDog)
router.post('/upload', upload.single('pic'), uploadimg)
router.post('/delete/:id([A-Za-z0-9]{1,})', bodyParser(), isAuth, isAdmin, deleteDogById)

router.get('/:id([A-Za-z0-9]{1,})', getDogById)
router.post('/:id([A-Za-z0-9]{1,})', bodyParser(), isAuth, isAdmin, updateDogById)

module.exports = router