// Routers <-> Controllers <-> Services <-> Models
// Routers are url routing

const Koa = require('koa');
const bodyParser = require('koa-bodyparser')
const Router = require('koa-router');
const router = Router({ prefix: '/api/v1/dog' })
const DogController = require('../controllers/dog.controller');

router.get('/', DogController.getAllDog)
router.post('/', bodyParser(), /*DogController.validateArticle,*/ DogController.addNewDog)
router.get('/:id([0-9]{1,})', DogController.getDogById)
router.post('/:id([0-9]{1,})', bodyParser(), DogController.updateDogById)
router.del('/:id([0-9]{1,})', DogController.deleteDogById)

module.exports = router