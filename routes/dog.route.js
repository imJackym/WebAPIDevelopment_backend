// Routers <-> Controllers <-> Services <-> Models
// Routers are url routing

import bodyParser from 'koa-bodyparser'
import Router from 'koa-router'
import { isAuth, isAdmin, generateToken } from '../utils.js';
import { getAllDog, addNewDog, getDogById, updateDogById, search, deleteDogById, filter } from '../controllers/dog.controller.js'

const router = Router({ prefix: '/api/v1/dog' })

router.get('/filter/:breed', filter)
router.get('/', getAllDog)
router.post('/', bodyParser(), isAuth, addNewDog)
router.get('/:id([A-Za-z0-9]{1,})', getDogById)
router.post('/:id([0-9]{1,})', bodyParser(), isAuth, isAdmin, updateDogById)
router.get('/search/:name', search)
router.post('/delete/:id([0-9]{1,})', bodyParser(), isAuth, isAdmin, deleteDogById)

export default router