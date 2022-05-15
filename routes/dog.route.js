// Routers <-> Controllers <-> Services <-> Models
// Routers are url routing

import bodyParser from 'koa-bodyparser'
import Router from 'koa-router'
import { isAuth, isAdmin, generateToken } from '../utils.js';
import { getAllDog, addNewDog } from '../controllers/dog.controller.js'

const router = Router({ prefix: '/api/v1/dog' })

router.get('/', getAllDog)
router.post('/', bodyParser(), isAuth, addNewDog)
// router.get('/:id([0-9]{1,})', DogController.getDogById)
// router.post('/:id([0-9]{1,})', bodyParser(), DogController.updateDogById)
// router.del('/:id([0-9]{1,})', DogController.deleteDogById)

export default router